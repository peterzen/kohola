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
                        <BalanceHistoryChart
                            timeframe={this.props.timeframe}
                            currentBalance={totals.total}
                            txHistorySeries={this.props.txHistorySeries}
                        />
                    </Card>
                </Col>
                <Col sm="4">
                    <WalletTotalsCard
                        totals={totals}
                        loading={this.props.loading}
                    />
                </Col>
                <Col sm="4">
                    <WalletCreditDebitCard
                        timeframe={this.props.timeframe}
                        txHistorySeries={this.props.txHistorySeries}
                    />
                </Col>
            </Row>
        )
    }
}

interface OwnProps {
    totals: WalletTotals
}

interface StateProps {
    loading: boolean
    timeframe: ChartTimeframe
    txHistorySeries: TimeSeries | undefined
}

type Props = OwnProps & StateProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    const timeframe = timeframes[3]
    const txHistorySeries = makeTxHistoryChartSeries(state, timeframe)
    return {
        loading: state.accounts.getAccountsAttempting,
        timeframe: timeframe,
        txHistorySeries: txHistorySeries,
    }
}

export default connect(mapStateToProps)(WalletTotalsComponent)
