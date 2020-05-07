import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"
import moment from "../../helpers/moment-helper"

import { Card } from "react-bootstrap"

import IntervalChooser, {
    ChartTimeframe,
    timeframes,
    defaultTimeframe,
} from "../../components/Shared/IntervalChooser"
import { IApplicationState } from "../../store/types"
import {
    getMixTransactions,
    getTransactions,
} from "../transactions/transactionsSlice"
import { onTimeFrameChanged } from "../staking/stakingSlice"
import { Transaction } from "../../middleware/models"
import MixingStatsTable from "./MixingStatsTable"
import GenericModal from "../../components/Shared/GenericModal"
import TransactionDetailsComponent from "../transactions/TransactionDetailsComponent"
import MixerStatsChart from "./MixerStatsChart"
import { TimeRange } from "pondjs"

class MixingStatsContainer extends React.Component<Props, InternalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showModal: false,
            selectedItem: null,
            selectedTimeframe: timeframes[1],
            timerange: new TimeRange(),
        }
    }
    render() {
        const txList = this.props.getTxList(this.state.selectedTimeframe)
        return (
            <Card>
                <Card.Header>
                    <div className="float-right">
                        <IntervalChooser
                            timeframes={timeframes}
                            onChange={(timeframe: ChartTimeframe) =>
                                this.handleIntervalChange(timeframe)
                            }
                            selectedValue={this.state.selectedTimeframe}
                        />
                    </div>
                    <Card.Title>
                        Mixing stats{" "}
                        <small className="text-muted">({txList.length})</small>
                    </Card.Title>
                </Card.Header>

                <MixerStatsChart timeframe={this.state.selectedTimeframe} />
                <MixingStatsTable
                    onItemClick={_.bind(this.itemClickHandler, this)}
                    transactions={txList}
                />

                <GenericModal
                    size="lg"
                    footer={true}
                    title="Transaction details"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}>
                    <TransactionDetailsComponent tx={this.state.selectedItem} />
                </GenericModal>
            </Card>
        )
    }
    handleIntervalChange(timeframe: ChartTimeframe) {
        const now = moment.default()
        this.setState({
            timerange: new TimeRange(now.subtract(timeframe.days, "days"), now),
            selectedTimeframe: timeframe,
        })
    }

    itemClickHandler(tx: Transaction) {
        this.setState({
            showModal: true,
            selectedItem: tx,
        })
    }
}

interface InternalState {
    showModal: boolean
    selectedItem: Transaction | null
    selectedTimeframe: ChartTimeframe
    timerange: TimeRange
}

interface OwnProps {
    getTxList: (timeframe: ChartTimeframe) => Transaction[]
}

interface DispatchProps {
    onTimeFrameChanged: typeof onTimeFrameChanged
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState) => {
    const timeframe = state.staking.selectedTimeframe
    return {
        isLoading: state.transactions.getTransactionsAttempting,
        getTxList: (timeframe: ChartTimeframe) => {
            const startTimestamp = moment
                .default()
                .subtract(timeframe.days, "days")
                .unix()
            return _.filter(
                getTransactions(state),
                (tx) => tx.getTimestamp().unix() >= startTimestamp
            )
        },
    }
}

const mapDispatchToProps = {
    onTimeFrameChanged,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MixingStatsContainer)
