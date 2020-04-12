package exchangeratebot

import (
	"encoding/hex"
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"time"

	"github.com/golang/protobuf/proto"
	"github.com/peterzen/kohola/walletgui"
	coingecko "github.com/superoo7/go-gecko/v3"
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
		Datapoints: make([]*walletgui.MarketChartDataPoint, len(*response.Prices)),
	}

	for i, v := range *response.Prices {
		marketChartData.Datapoints[i] = &walletgui.MarketChartDataPoint{
			Timestamp:    int64(v[0]) / 1000,
			ExchangeRate: v[1],
		}
	}

	return marketChartData, nil
}

// ExportExchangeRateAPI exports the exchangerateBot API functions to the UI
func ExportExchangeRateAPI(ui walletgui.WebViewInterface) {

	cg = initializeCgClient()

	ui.Bind("exchangerate__GetMarketChart", func(currencyCode string, days uint32) (r walletgui.LorcaMessage) {

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
	walletgui.ExecuteJS(js)
}

// Start initializes a Coingecko client and starts a periodic fetcher process
func Start(altCurrencies []string) {

	for {
		rates, err := fetchCurrentRates(altCurrencies)
		if err == nil {
			rates.LastUpdatedTs = time.Now().Unix()
			onUpdate(rates)
		}
		time.Sleep(60 * time.Second)
	}
}
