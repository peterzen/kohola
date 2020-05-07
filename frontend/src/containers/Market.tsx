import * as React from "react"
import { connect } from "react-redux"
import { withRouter, RouteChildrenProps } from "react-router-dom"
import _ from "lodash"

import { Card } from "react-bootstrap"

import { IApplicationState } from "../store/types"
import { AltCurrencyRates } from "../proto/walletgui_pb"
import IntervalChooser, {
    ChartTimeframe,
    timeframes,
    defaultTimeframe,
} from "../components/Shared/IntervalChooser"
import ExchangeRateV2Chart from "../features/market/charts/ExchangeRateV2Chart"

class Market extends React.PureComponent<Props, InternalState> {
    state = {
        selectedTimeframe: defaultTimeframe,
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
                        <Card.Title>DCR Markets</Card.Title>
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
}

type Props = OwnProps & RouteChildrenProps<any>

const mapStateToProps = (state: IApplicationState) => {
    // @TODO pull this out of AppConfig
    const altCurrencies = ["btc", "usd", "eur"]

    return {
        currencies: altCurrencies,
        currentRates: state.market.currentRates,
    }
}

export default withRouter(connect(mapStateToProps)(Market))
