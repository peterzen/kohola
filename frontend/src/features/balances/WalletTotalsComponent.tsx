import * as React from "react"

import { Row, Col, Card } from "react-bootstrap"

import { WalletTotals } from "../../middleware/models"
import { IApplicationState } from "../../store/types"
import { connect } from "react-redux"
import WalletTotalsCard from "./WalletTotalsCard"
import WalletAvailableBalanceCard from "./WalletAvailableBalanceCard"
import WalletCreditDebitCard from "./WalletCreditDebitCard"
import { TimeSeries } from "pondjs"
import {
    timeframes,
    ChartTimeframe,
} from "../../components/Shared/IntervalChooser"
import { makeTxHistoryChartSeries } from "../transactions/transactionsSlice"
import BalanceHistoryChart from "./BalanceHistoryChart"
import ComponentPlaceHolder from "../../components/Shared/ComponentPlaceholder"

class WalletTotalsComponent extends React.PureComponent<Props, {}> {
    render() {
        const totals = this.props.totals
        return (
            <Row>
                <Col sm="4">
                    <Card className="h-100">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <WalletAvailableBalanceCard
                                        totals={totals}
                                        loading={this.props.loading}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                        <ComponentPlaceHolder
                            firstLaunchOnly={true}
                            className="p-x-20"
                            type="text"
                            rows={3}
                            ready={!this.props.loading}
                            showLoadingAnimation>
                            <BalanceHistoryChart
                                timeframe={this.props.timeframe}
                                currentBalance={totals.total}
                                txHistorySeries={this.props.txHistorySeries}
                            />
                        </ComponentPlaceHolder>
                    </Card>
                </Col>
                <Col sm="4">
                    <WalletTotalsCard
                        totals={totals}
                        loading={this.props.loading}
                    />
                </Col>
                <Col sm="4">
                    <Card className="h-100">
                        <ComponentPlaceHolder
                            firstLaunchOnly={true}
                            className="p-x-20"
                            type="text"
                            rows={8}
                            ready={!this.props.loading}
                            showLoadingAnimation>
                            <WalletCreditDebitCard
                                timeframe={this.props.timeframe}
                                txHistorySeries={this.props.txHistorySeries}
                            />
                        </ComponentPlaceHolder>
                    </Card>
                </Col>
            </Row>
        )
    }
}

interface OwnProps {
    totals: WalletTotals
    loading: boolean
}

interface StateProps {
    timeframe: ChartTimeframe
    txHistorySeries: TimeSeries | undefined
}

type Props = OwnProps & StateProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    const timeframe = timeframes[4]
    const txHistorySeries = makeTxHistoryChartSeries(state, timeframe)
    return {
        timeframe: timeframe,
        txHistorySeries: txHistorySeries,
    }
}

export default connect(mapStateToProps)(WalletTotalsComponent)
