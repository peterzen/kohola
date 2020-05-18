import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { Card } from "react-bootstrap"

import { Transaction } from "../../middleware/models"
import TransactionTable from "./TransactionTable"
import TransactionDetailsComponent from "./TransactionDetailsComponent"
import GenericModal from "../../components/Shared/GenericModal"
import { loadTransactionsAttempt } from "./actions"
import { IApplicationState } from "../../store/types"
import ComponentPlaceHolder from "../../components/Shared/ComponentPlaceholder"
import IntervalChooser, {
    ChartTimeframe,
    timeframes,
    defaultTimeframe,
} from "../../components/Shared/IntervalChooser"
import moment from "../../helpers/moment-helper"

class RecentTransactionsComponent extends React.Component<
    Props,
    InternalState
> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showModal: false,
            selectedItem: null,
            selectedTimeframe: defaultTimeframe,
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
                                this.setState({ selectedTimeframe: timeframe })
                            }
                            selectedValue={this.state.selectedTimeframe}
                        />
                    </div>
                    <Card.Title>
                        Recent transactions{" "}
                        <small className="text-muted">({txList.length})</small>
                    </Card.Title>
                </Card.Header>

                <ComponentPlaceHolder
                    firstLaunchOnly={true}
                    className="p-x-20"
                    type="text"
                    rows={6}
                    ready={!this.props.loading}>
                    <TransactionTable
                        items={txList}
                        onItemClick={_.bind(this.itemClickHandler, this)}
                        showAccount={this.props.showAccount}
                    />
                </ComponentPlaceHolder>

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
    itemClickHandler(tx: Transaction) {
        this.setState({
            showModal: true,
            selectedItem: tx,
        })
    }
    componentDidMount() {
        // this.props.loadTransactionsAttempt()
    }
}

interface StateProps {
    getTxList: (timeframe: ChartTimeframe) => Transaction[]
}

interface OwnProps {
    loading?: boolean
    showAccount?: boolean
    txList: Transaction[]
}

interface InternalState {
    showModal: boolean
    selectedItem: Transaction | null
    selectedTimeframe: ChartTimeframe
}

interface DispatchProps {
    // loadTransactionsAttempt: typeof loadTransactionsAttempt
}
type Props = OwnProps & StateProps & DispatchProps

const mapStateToProps = (
    state: IApplicationState,
    ownProps: OwnProps
): StateProps => {
    return {
        getTxList: (timeframe: ChartTimeframe) => {
            const startTimestamp = moment
                .default()
                .subtract(timeframe.days, "days")
                .unix()
            return _.filter(
                ownProps.txList,
                (tx) => tx.getTimestamp().unix() >= startTimestamp
            )
        },
    }
}

const mapDispatchtoProps = {
    // loadTransactionsAttempt
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(RecentTransactionsComponent)
