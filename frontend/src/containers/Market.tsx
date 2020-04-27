import * as React from "react"
import { connect } from "react-redux"
import { withRouter, RouteChildrenProps } from "react-router-dom"
import _ from "lodash"


// @ts-ignore
import Fade from "react-reveal/Fade"
import { Card, Row, Col, Dropdown } from "react-bootstrap"

import { IApplicationState } from "../store/types"
import ExchangeRateChart from "../features/market/charts/ExchangeRateChart"
import { AltCurrencyRates } from "../proto/walletgui_pb"
import { getCurrentExchangeRate, makeTimerange } from "../features/market/marketSlice"
import IntervalChooser, {
    ChartTimeframe,
    timeframes,
    defaultTimeframe,
} from "../components/Shared/IntervalChooser"
import { TimeRange } from "pondjs"
import ExchangeRateV2Chart from "../features/market/charts/ExchangeRateV2Chart"

// @TODO pull this out of AppConfig
const altCurrencies = ["btc", "usd", "eur"]


class Market extends React.PureComponent<Props, InternalState> {

    state = {
        selectedTimeframe: defaultTimeframe,
        // timerange: makeTimerange(defaultTimeframe.days)
    }

    render() {
        return (
            <div>
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
                        <Card.Title>
                            DCR Markets
                        </Card.Title>
                    </Card.Header>
                    <div>
                        <ExchangeRateV2Chart
                            currencies={altCurrencies}
                            days={this.state.selectedTimeframe.days}
                            currencyCode="btc" />
                    </div>
                    {/* <Row>
                    {altCurrencies.map((currencyCode) => (
                        <Col sm={6} key={currencyCode}>
                            <div className="mb-3">
                                <Fade fade cascade >
                                    <Card>
                                        <Card.Header>
                                            <Card.Title className="mb-0">
                                                <small className="float-right text-muted">
                                                    {this.props
                                                        .getCurrentExchangeRate(
                                                            currencyCode
                                                        )
                                                        ?.toFixed(6)}
                                                </small>
                                            DCR-{currencyCode.toUpperCase()}
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <ExchangeRateChart
                                                currencyCode={currencyCode}
                                                days={this.state.selectedTimeframe.days}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Fade>
                            </div>
                        </Col>
                    ))}
                </Row> */}

                </Card>
            </div>
        )
    }
    handleTimerangeChange(timeframe: ChartTimeframe) {
        this.setState({
            timerange: makeTimerange(timeframe.days),
            selectedTimeframe: timeframe
        })
    }
}

interface InternalState {
    selectedTimeframe: ChartTimeframe
    // timerange: TimeRange
}

interface OwnProps {
    currentRates: AltCurrencyRates
    getCurrentExchangeRate: (currencyCode: string) => number
}

type Props = OwnProps & RouteChildrenProps<any>

const mapStateToProps = (state: IApplicationState) => {
    return {
        currentRates: state.market.currentRates,
        getCurrentExchangeRate: (currencyCode: string) => {
            return getCurrentExchangeRate(state, currencyCode)
        },
    }
}

export default withRouter(connect(mapStateToProps)(Market))

