import * as React from "react"
import { connect } from "react-redux"

import { Table, Accordion, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons"

import { Transaction } from "../../middleware/models"
import { Timestamp } from "../../components/Shared/shared"
import { Amount } from "../../components/Shared/Amount"
import TransactionHash from "./TransactionHash"
import Address from "./Address"
import Block from "./Block"
import { publishUnminedTransactions } from "./actions"
import { AppError, IApplicationState } from "../../store/types"
import { PublishUnminedTransactionsResponse } from "../../proto/api_pb"
import { ErrorAlert, SuccessAlert } from "../../components/Shared/FormStatusAlerts"

class TransactionDetailsComponent extends React.Component<Props> {
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
                            <td>{tx.getTypeAsString()}</td>
                        </tr>
                        <tr>
                            <th>Block</th>
                            <td>
                                <Block block={tx.getBlock()}/>
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
                            <th>Debit accounts</th>
                            <td>
                                {tx.getDebitsList().map((a) => {
                                    return (
                                        <div
                                            key={
                                                "account-" +
                                                a.getIndex() +
                                                a.getPreviousAccount()
                                            }
                                        >
                                            {a.getPreviousAccount()}:{" "}
                                            {a.getPreviousAccount()} /{" "}
                                            <Amount
                                                showCurrency={true}
                                                amount={a.getPreviousAmount()}
                                            />
                                            <br />
                                        </div>
                                    )
                                })}
                            </td>
                        </tr>
                        <tr>
                            <th>Credit addresses</th>
                            <td>
                                {tx.getCreditsList().map((a) => {
                                    return (
                                        <div key={a.getAddress() + a.getIndex()}>
                                            <Address address={a.getAddress()} />
                                        </div>
                                    )
                                })}
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

interface DispatchProps {
    publishUnminedTransactions: typeof publishUnminedTransactions
}

interface OwnProps {
    tx: Transaction | null
    error: AppError | null
    publishUnminedTransactionsResponse: PublishUnminedTransactionsResponse | null    
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
    return {
        error: state.transactions.errorPublishUnminedTransactions,
        publishUnminedTransactionsResponse: state.transactions.publishUnminedTransactionsResponse,
    }
}

const mapDispatchToProps = {
    publishUnminedTransactions,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailsComponent)
