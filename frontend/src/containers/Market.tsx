import * as React from "react"
import { connect } from "react-redux"
import { withRouter, RouteChildrenProps } from "react-router-dom"
import _ from "lodash"

import { Card, Col, Row } from "react-bootstrap"

import { IApplicationState } from "../store/types"
import { AltCurrencyRates } from "../proto/walletgui_pb"
import IntervalChooser, {
    ChartTimeframe,
    timeframes,
    defaultTimeframe,
} from "../components/Shared/IntervalChooser"
import ExchangeRateV2Chart from "../features/market/charts/ExchangeRateV2Chart"
import { getCurrentExchangeRate } from "../features/market/marketSlice"
import { sprintf } from "sprintf-js"

class Market extends React.PureComponent<Props, InternalState> {
    state = {
        selectedTimeframe: defaultTimeframe,
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Card.Title>DCR Markets</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <h2>DCRBTC</h2>
                                <h4>
                                    {sprintf(
                                        "%.6f",
                                        this.props.getCurrentExchangeRate("btc")
                                    )}
                                </h4>
                            </Col>
                            <Col>
                                <h2>DCRUSD</h2>
                                <h4>
                                    {sprintf(
                                        "%.2f",
                                        this.props.getCurrentExchangeRate("usd")
                                    )}
                                </h4>
                            </Col>
                            <Col>
                                <h2>DCREUR</h2>
                                <h4>
                                    {sprintf(
                                        "%.2f",
                                        this.props.getCurrentExchangeRate("eur")
                                    )}
                                </h4>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <div className="float-right">
                            <IntervalChooser
                                onChange={(timeframe: ChartTimeframe) =>
                                    this.handleTimerangeChange(timeframe)
                                }
                                timeframes={timeframes}
                                selectedValue={this.state.selectedTimeframe}
                            />
                        </div>
                    </Card.Header>
                    <div>
                        <ExchangeRateV2Chart
                            currencies={this.props.currencies}
                            days={this.state.selectedTimeframe.days}
                            currencyCode="btc"
                        />
                    </div>
                </Card>
            </div>
        )
    }

    handleTimerangeChange(timeframe: ChartTimeframe) {
        this.setState({
            selectedTimeframe: timeframe,
        })
    }
}

interface InternalState {
    selectedTimeframe: ChartTimeframe
}

interface OwnProps {
    currentRates: AltCurrencyRates
    currencies: string[]
    getCurrentExchangeRate: (currencyCode: string) => number
}

type Props = OwnProps & RouteChildrenProps<any>

const mapStateToProps = (state: IApplicationState) => {
    // @TODO pull this out of AppConfig
    const altCurrencies = ["btc", "usd", "eur"]

    return {
        currencies: altCurrencies,
        currentRates: state.market.currentRates,
        getCurrentExchangeRate: (currencyCode: string) => {
            const r = getCurrentExchangeRate(state, currencyCode)
            return r
        },
    }
}

export default withRouter(connect(mapStateToProps)(Market))
