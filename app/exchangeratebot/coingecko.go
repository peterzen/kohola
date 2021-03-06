package exchangeratebot

import (
	"context"
	"encoding/hex"
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"time"

	"github.com/golang/protobuf/proto"
	coingecko "github.com/superoo7/go-gecko/v3"

	"github.com/peterzen/kohola/walletgui"
	"github.com/peterzen/kohola/webview"
)

var cg *coingecko.Client

func initializeCgClient() *coingecko.Client {
	transport := &http.Transport{
		Proxy: http.ProxyFromEnvironment,
		DialContext: (&net.Dialer{
			Timeout:   30 * time.Second,
			KeepAlive: 30 * time.Second,
			DualStack: true,
		}).DialContext,
		ForceAttemptHTTP2:     true,
		MaxIdleConns:          100,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   10 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
	}

	httpClient := &http.Client{
		Timeout:   time.Second * 10,
		Transport: transport,
	}
	return coingecko.NewClient(httpClient)
}

func fetchCurrentRates(altCurrencies []string) (rates *walletgui.AltCurrencyRates, err error) {

	ids := []string{"decred"}
	sp, err := cg.SimplePrice(ids, altCurrencies)
	if err != nil {
		log.Printf("fetchCurrentRates: %s", err)
		return nil, err
	}
	decred := (*sp)["decred"]

	rates = &walletgui.AltCurrencyRates{
		Rates: make([]*walletgui.AltCurrencyRates_AltCurrencyRate, len(altCurrencies)),
	}
	for i, currency := range altCurrencies {
		r := &walletgui.AltCurrencyRates_AltCurrencyRate{
			CurrencyCode: currency,
			CurrentRate:  decred[currency],
		}
		rates.Rates[i] = r
	}
	return rates, nil
}

func fetchMarketChart(request *walletgui.GetMarketChartRequest) (marketChartData *walletgui.GetMarketChartResponse, err error) {

	if cg == nil {
		return nil, errors.New("fetchMarketChart: not initialized yet")
	}

	response, err := cg.CoinsIDMarketChart("decred", request.CurrencyCode, fmt.Sprint(request.Days))
	if err != nil {
		fmt.Printf("fetchMarketChart: %s", err)
		return nil, err
	}

	marketChartData = &walletgui.GetMarketChartResponse{
		Prices:  make([]*walletgui.GetMarketChartResponse_MarketChartDataPoint, len(*response.Prices)),
		Volumes: make([]*walletgui.GetMarketChartResponse_MarketChartDataPoint, len(*response.TotalVolumes)),
	}

	for i, v := range *response.Prices {
		marketChartData.Prices[i] = &walletgui.GetMarketChartResponse_MarketChartDataPoint{
			Timestamp: int64(v[0]) / 1000,
			Value:     v[1],
		}
	}

	for i, v := range *response.TotalVolumes {
		marketChartData.Volumes[i] = &walletgui.GetMarketChartResponse_MarketChartDataPoint{
			Timestamp: int64(v[0]) / 1000,
			Value:     v[1],
		}
	}

	return marketChartData, nil
}

// ExportExchangeRateAPI exports the exchangerateBot API functions to the UI
func ExportExchangeRateAPI(w webview.Interface) {

	cg = initializeCgClient()

	w.Bind("exchangerate__GetMarketChart", func(currencyCode string, days uint32) (r walletgui.LorcaMessage) {

		request := &walletgui.GetMarketChartRequest{
			Days:         days,
			CurrencyCode: currencyCode,
		}
		response, err := fetchMarketChart(request)
		if err != nil {
			r.Err = err
			return r
		}
		r.Payload, _ = proto.Marshal(response)
		return r
	})

}

func onUpdate(rates *walletgui.AltCurrencyRates) {
	b, err := proto.Marshal(rates)
	if err != nil {
		log.Println("proto.Marshal", err)
		return
	}
	encodedMsg := hex.EncodeToString(b)
	js := fmt.Sprintf("window.lorcareceiver__OnExchangeRateUpdate('%s')", encodedMsg)
	webview.ExecuteJS(js)
}

// Start initializes a Coingecko client and starts a periodic fetcher process
func Start(ctx context.Context, altCurrencies []string) {

	ctx, cancel := context.WithCancel(ctx)
	_ = cancel

	for {
		select {
		case <-ctx.Done():
			log.Printf("exchangeratebot stopped")
			return
		default:
		}

		rates, err := fetchCurrentRates(altCurrencies)
		if err == nil {
			rates.LastUpdatedTs = time.Now().Unix()
			onUpdate(rates)
		}
		time.Sleep(60 * time.Second)
	}
}
