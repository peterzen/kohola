import * as React from "react"
import { connect } from "react-redux"

import { Table, Accordion, Button, Badge } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons"

import { Transaction, WalletAccount } from "../../middleware/models"
import { Timestamp } from "../../components/Shared/shared"
import { Amount } from "../../components/Shared/Amount"
import TransactionHash from "./TransactionHash"
import Address from "./Address"
import Block from "./Block"
import { publishUnminedTransactions } from "./actions"
import { AppError, IApplicationState } from "../../store/types"
import { PublishUnminedTransactionsResponse } from "../../proto/api_pb"
import { ErrorAlert, SuccessAlert } from "../../components/Shared/FormStatusAlerts"
import { isTxMixed } from "./transactionsSlice"
import { lookupAccounts } from "../balances/accountSlice"
import _ from "lodash"


export const DebitAccountItem = (props: { debit: any, account: WalletAccount | undefined }) => {
    const { account, debit } = props
    return (
        <div
            key={
                "account-" +
                debit.getIndex() +
                debit.getPreviousAccount()
            }
        >
            <strong>{account?.getAccountName()}</strong>
            {" "}
            <small className="text-muted">
                (<Amount
                    showCurrency={true}
                    amount={debit.getPreviousAmount()}
                />)
            </small>
            <br />
        </div>
    )
}

class TransactionDetailsComponent extends React.Component<Props>{
    render() {
        const tx = this.props.tx
        if (tx == null) {
            return null
        }
        const isMined = tx.block.getHeight() != -1
        return (
            <div>
                {!isMined && (
                    <Button
                        variant="secondary"
                        className="float-right"
                        onClick={() => this.props.publishUnminedTransactions()}
                    >
                        <FontAwesomeIcon icon={faBroadcastTower} /> Rebroadcast TX
                    </Button>
                )}
                <Table borderless>
                    <tbody>
                        <tr>
                            <th>Type</th>
                            <td>
                                {tx.getTypeAsString()}
                                {" "}
                                {this.props.isTxMixed(tx) && (
                                    <Badge variant="secondary">Mix</Badge>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Block</th>
                            <td>
                                <Block block={tx.getBlock()} />
                            </td>
                        </tr>
                        <tr>
                            <th>Hash</th>
                            <td>
                                <TransactionHash tx={tx} truncate={false} />
                            </td>
                        </tr>
                        <tr>
                            <th>Timestamp</th>
                            <td>
                                <Timestamp ts={tx.getTimestamp()} />
                            </td>
                        </tr>
                        <tr>
                            <th>Amount</th>
                            <td>
                                <Amount
                                    amount={tx.getAmount()}
                                    rounding={8}
                                    showCurrency={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Fee</th>
                            <td>
                                <Amount
                                    amount={tx.getFee()}
                                    rounding={8}
                                    showCurrency={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Accounts</th>
                            <td>
                                {tx.getDebitsList().map(debit => (
                                    <div
                                        key={
                                            "account-" +
                                            debit.getIndex() +
                                            debit.getPreviousAccount()
                                        }
                                    >
                                        <DebitAccountItem
                                            account={_.first(this.props.lookupAccounts([debit.getPreviousAccount()]))}
                                            debit={debit} />
                                    </div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <th>Credit addresses</th>
                            <td>
                                {tx.getCreditsList().map(credit => (
                                    <div key={credit.getAddress() + credit.getIndex()}>
                                        <Address address={credit.getAddress()} />
                                    </div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Accordion>
                    <Accordion.Toggle
                        as={Button}
                        variant="secondary"
                        size="sm"
                        eventKey="0"
                    >
                        Raw JSON <FontAwesomeIcon icon={faCaretDown} />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <pre>{JSON.stringify(tx.toObject(), undefined, "  ")}</pre>
                    </Accordion.Collapse>
                </Accordion>
                <ErrorAlert error={this.props.error} />
                {this.props.publishUnminedTransactionsResponse != null && (
                    <SuccessAlert message="Unmined transactions published successfully." />
                )}
            </div>
        )
    }
}

interface OwnProps {
    tx: Transaction | null
}

interface StateProps {
    isTxMixed: (tx: Transaction) => boolean
    lookupAccounts: (accountNumbers: number[]) => WalletAccount[]
    error: AppError | null
    publishUnminedTransactionsResponse: PublishUnminedTransactionsResponse | null    
}

interface DispatchProps {
    publishUnminedTransactions: typeof publishUnminedTransactions
}

type Props = OwnProps & StateProps & DispatchProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    return {
        isTxMixed: (tx: Transaction) => {
            return isTxMixed(state, tx)
        },
        lookupAccounts: (accountNumbers: number[]) => {
            return lookupAccounts(state, accountNumbers)
        },
        error: state.transactions.errorPublishUnminedTransactions,
        publishUnminedTransactionsResponse:
            state.transactions.publishUnminedTransactionsResponse,
    }
}

const mapDispatchToProps = {
    publishUnminedTransactions,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionDetailsComponent)
