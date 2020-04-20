import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import _ from "lodash"

import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)

import { loadStakingHistory } from "./stakingSlice"
import { StakingHistory } from "../../proto/walletgui_pb"
import { AppError, IApplicationState } from "../../store/types"
import { Table, Card } from "react-bootstrap"
import ReactTimeago from "react-timeago"
import { Amount } from "../../components/Shared/Amount"
import { TransactionType } from "../../constants"
import { rawHashToHex } from "../../helpers/byteActions"

class StakingHistoryTable extends React.Component<Props> {
    render() {
        return (
            <Card>
                <Card.Header>
                    <Card.Title>Staking returns</Card.Title>
                </Card.Header>
                <Table>
                    <thead>
                        <tr>
                            <th>TxType</th>
                            <th>Timestamp</th>
                            <th>RewardCredit</th>
                            <th>TicketCostCredit</th>
                            <th>TicketCostDebit</th>
                            <th>FeeDebit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.stakingHistory
                            ?.getLineItemsList()
                            .map((item) => (
                                <tr
                                    key={
                                        rawHashToHex(item.getTxHash_asU8()) ||
                                        ""
                                    }
                                >
                                    <td>{TransactionType[item.getTxType()]}</td>
                                    <td>
                                        <ReactTimeago
                                            date={moment
                                                .unix(item.getTimestamp())
                                                .toDate()}
                                        />
                                    </td>
                                    <td>
                                        <Amount
                                            amount={item.getRewardCredit()}
                                            showCurrency={false}
                                        />
                                    </td>
                                    <td>
                                        <Amount
                                            amount={item.getTicketCostCredit()}
                                            showCurrency={false}
                                        />
                                    </td>
                                    <td>
                                        <Amount
                                            amount={item.getTicketCostDebit()}
                                            showCurrency={false}
                                        />
                                    </td>
                                    <td>
                                        <Amount
                                            amount={item.getFeeDebit()}
                                            showCurrency={false}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Card>
        )
    }
    componentDidMount() {
        this.props.loadStakingHistory(moment.default().unix(), moment.default().subtract("days",17).unix())
    }
}

interface OwnProps {
    stakingHistory: StakingHistory | null
    getStakingHistoryError: AppError | null
    getStakingHistoryAttempting: boolean
}

interface DispatchProps {
    loadStakingHistory: typeof loadStakingHistory
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        stakingHistory: state.staking.stakingHistory,
        getStakingHistoryError: state.staking.getStakingHistoryError,
        getStakingHistoryAttempting: state.staking.getStakingHistoryAttempting,
    }
}

const mapDispatchToProps = {
    loadStakingHistory,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StakingHistoryTable)
)
