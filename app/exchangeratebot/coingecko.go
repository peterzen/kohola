package exchangeratebot

import (
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"time"

	proto "github.com/golang/protobuf/proto"
	gui "github.com/peterzen/dcrwalletgui/dcrwalletgui"
	coingecko "github.com/superoo7/go-gecko/v3"
	"github.com/zserge/lorca"
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

func fetchCurrentRates(altCurrencies []string) (rates *gui.AltCurrencyRates, err error) {

	ids := []string{"decred"}
	sp, err := cg.SimplePrice(ids, altCurrencies)
	if err != nil {
		log.Printf("fetchCurrentRates: %s", err)
		return nil, err
	}
	decred := (*sp)["decred"]

	rates = &gui.AltCurrencyRates{
		Rates: make([]*gui.AltCurrencyRates_AltCurrencyRate, len(altCurrencies)),
	}
	for i, currency := range altCurrencies {
		r := &gui.AltCurrencyRates_AltCurrencyRate{
			CurrencyCode: currency,
			CurrentRate:  decred[currency],
		}
		rates.Rates[i] = r
	}
	return rates, nil
}

func fetchMarketChart(request *gui.GetMarketChartRequest) (marketChartData *gui.GetMarketChartResponse, err error) {

	if cg == nil {
		return nil, errors.New("fetchMarketChart: not initialized yet")
	}

	response, err := cg.CoinsIDMarketChart("decred", request.CurrencyCode, string(request.Days))

	if err != nil {
		fmt.Printf("fetchMarketChart: %s", err)
		return nil, err
	}

	marketChartData = &gui.GetMarketChartResponse{
		Datapoints: make([]*gui.MarketChartDataPoint, len(*response.Prices)),
	}

	for i, v := range *response.Prices {
		marketChartData.Datapoints[i] = &gui.MarketChartDataPoint{
			Timestamp:    int64(v[0]) / 1000,
			ExchangeRate: v[1],
		}
	}

	return marketChartData, nil
}

// ExportExchangeRateAPI exports the exchangerateBot API functions to the UI
func ExportExchangeRateAPI(ui lorca.UI) {
	ui.Bind("exchangerate__GetMarketChart", func(currencyCode string, days uint32) (r gui.LorcaMessage) {

		request := &gui.GetMarketChartRequest{
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

// Start initializes a Coingecko client and starts a periodic fetcher process
func Start(altCurrencies []string, onUpdate func(rates *gui.AltCurrencyRates)) {

	cg = initializeCgClient()

	for {
		rates, err := fetchCurrentRates(altCurrencies)
		if err == nil {
			rates.LastUpdatedTs = time.Now().Unix()
			onUpdate(rates)
		}
		time.Sleep(60 * time.Second)
	}
}

/*
func main() {
	cg := gecko.NewClient(nil)

	// simpleprice
	fmt.Println("Simpleprice-----")
	ids := []string{"decred"}
	vc := []string{"btc", "usd", "eur"}
	sp, err := cg.SimplePrice(ids, vc)
	if err != nil {
		log.Fatal(err)
	}
	decred := (*sp)["decred"]
	fmt.Println(fmt.Sprintf("Decred is worth %f (btc) %f usd (eur %f)", decred["btc"], decred["usd"], decred["eur"]))

	m, err := cg.CoinsIDMarketChart("decred", "usd", "7")
	fmt.Println("Marketchart")

	fmt.Printf("Prices\n")
	for _, v := range *m.Prices {
		fmt.Printf("%s -> %.04f\n", time.Unix(int64(v[0])/1000, int64(v[0])%1000).UTC().Format(time.RFC3339), v[1])
	}

	fmt.Printf("MarketCaps\n")
	for _, v := range *m.MarketCaps {
		fmt.Printf("%s:%.04f\n", time.Unix(int64(v[0])/1000, int64(v[0])%1000).UTC().Format(time.RFC3339), v[1])
	}

	fmt.Printf("TotalVolumes\n")
	for _, v := range *m.TotalVolumes {
		fmt.Printf("%s -> %.04f\n", time.Unix(int64(v[0])/1000, int64(v[0])%1000).UTC().Format(time.RFC3339), v[1])
	}

	os.Exit(0)

}
*/
