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
import { getCurrentExchangeRate } from "../features/market/marketSlice"
import IntervalChooser, {
    ChartTimeframe,
    timeframes,
    defaultTimeframe,
} from "../components/Shared/IntervalChooser"

// @TODO pull this out of AppConfig
const altCurrencies = ["btc", "usd", "eur"]


class Market extends React.PureComponent<Props, InternalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            selectedTimeframe: defaultTimeframe,
        }
    }

    render() {
        return (
            <div>
                <div className="text-right">
                    <IntervalChooser
                        onChange={(timeframe: ChartTimeframe) =>
                            this.setState({ selectedTimeframe: timeframe })
                        }
                        timeframes={timeframes}
                        selectedValue={this.state.selectedTimeframe}
                    />
                </div>
                <Row>
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
                </Row>
            </div>
        )
    }
}

interface InternalState {
    selectedTimeframe: ChartTimeframe
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
            const r = getCurrentExchangeRate(state, currencyCode)
            return r
        },
    }
}

export default withRouter(connect(mapStateToProps)(Market))
