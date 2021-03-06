import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"
import * as jspb from "google-protobuf"

import { Button, Form, Row, Col, InputGroup, Alert } from "react-bootstrap"

import { faPencilAlt, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    WalletAccount,
    IndexedWalletAccounts,
    WalletBalance,
} from "../../middleware/models"
import {
    loadNextAccountAttempt,
    doRenameAccountAttempt,
    isAccountVisible,
} from "./accountSlice"
import PassphraseEntryDialog, {
    askPassphrase,
} from "../../components/Shared/PassphraseEntryDialog"
import { AppError, IApplicationState } from "../../store/types"
import { NextAccountResponse, RenameAccountResponse } from "../../proto/api_pb"
import {
    getAccountPrefs,
    updateAccountPreference,
} from "../appconfiguration/settingsSlice"
import { getWalletBalances } from "./walletBalanceSlice"
import { getConnectedEndpointId } from "../app/appSlice"
import { Amount } from "../../components/Shared/Amount"
import { AppConfiguration } from "../../proto/walletgui_pb"

function enterHandler(
    e: React.KeyboardEvent<HTMLInputElement>,
    callback: () => void
) {
    if (e.key == "Enter") {
        callback()
    }
}

interface IAccountNameInputProps {
    account?: WalletAccount
    onEditComplete: (value: string) => void
}

const AccountNameInputComponent = (props: IAccountNameInputProps) => {
    const defaultValue = props.account ? props.account.getAccountName() : ""
    return (
        <InputGroup>
            <Form.Control
                type="text"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    enterHandler(e, () => {
                        props.onEditComplete(e.currentTarget.value)
                    })
                }}
                defaultValue={defaultValue}
            />
            <Form.Control.Feedback />
            <InputGroup.Append>
                <Button title="Hit enter" variant="link">
                    <FontAwesomeIcon icon={faCheck} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

interface IAddAccountProps {
    nextAccountResponse: NextAccountResponse | null
    error: AppError | null
    onEditComplete: (value: string) => void
}

class AddAccountComponent extends React.Component<
    IAddAccountProps,
    { visible: boolean }
> {
    constructor(props: IAddAccountProps) {
        super(props)
        this.state = {
            visible: false,
        }
    }
    render() {
        const toggle = this.state.visible
        return (
            <div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => this.setState({ visible: !toggle })}>
                    <FontAwesomeIcon icon={faPlus} /> Add account...
                </Button>
                {this.state.visible && this.props.nextAccountResponse == null && (
                    <div>
                        Account name:
                        <AccountNameInputComponent
                            onEditComplete={(value) =>
                                this.props.onEditComplete(value)
                            }
                        />
                    </div>
                )}
                {this.props.nextAccountResponse && (
                    <Alert variant="success">
                        Account #
                        {this.props.nextAccountResponse.getAccountNumber()}{" "}
                        created
                    </Alert>
                )}
                {this.props.error && (
                    <Alert variant="danger">{this.props.error.message}</Alert>
                )}
            </div>
        )
    }
}

class AccountsSetup extends React.Component<Props, InternalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            editable: undefined,
        }
    }

    render() {
        const accounts = _.values(this.props.accounts)
        return (
            <div>
                <Row>
                    <Col xs={8}>
                        {this.props.renameAccountResponse && (
                            <Alert variant="success">Account renamed</Alert>
                        )}
                        {this.props.errorRenameAccount && (
                            <Alert variant="danger">
                                {this.props.errorRenameAccount.message}
                            </Alert>
                        )}
                        <AddAccountComponent
                            onEditComplete={(value) =>
                                this.addNewAccount(value)
                            }
                            error={this.props.errorNextAccount}
                            nextAccountResponse={this.props.nextAccountResponse}
                        />
                    </Col>
                    <Col xs={4}></Col>
                </Row>

                <hr className="mt-3" />

                <Row key="header">
                    <Col xs={6}></Col>
                    <Col xs={2}>
                        <strong>Balance</strong>
                    </Col>
                    <Col xs={2}>
                        <strong>Voting auth</strong>
                    </Col>
                    <Col xs={2}>
                        <strong>Hidden?</strong>
                    </Col>
                </Row>

                {accounts.map((account) => {
                    const accountNumber = account.getAccountNumber()

                    const totalBalance = this.props.accountBalances[
                        accountNumber
                    ]
                        ? this.props.accountBalances[accountNumber].getTotal()
                        : 0

                    const votingAuthBalance = this.props.accountBalances[
                        accountNumber
                    ]
                        ? this.props.accountBalances[
                              accountNumber
                          ].getVotingAuthority()
                        : 0

                    return (
                        <Row key={`account-row-${accountNumber}`}>
                            <Col xs={6}>
                                {this.state.editable != accountNumber && (
                                    <span>
                                        {account.getAccountName()}
                                        <Button
                                            variant="link"
                                            onClick={() =>
                                                this.setState({
                                                    editable: accountNumber,
                                                })
                                            }>
                                            <FontAwesomeIcon
                                                icon={faPencilAlt}
                                            />
                                        </Button>
                                    </span>
                                )}
                                {this.state.editable == accountNumber && (
                                    <AccountNameInputComponent
                                        account={account}
                                        onEditComplete={(value) =>
                                            this.props.doRenameAccountAttempt(
                                                account,
                                                value
                                            )
                                        }
                                    />
                                )}
                            </Col>
                            <Col xs={2}>
                                <Amount amount={totalBalance} showCurrency />
                            </Col>
                            <Col xs={2}>
                                <Amount
                                    amount={votingAuthBalance}
                                    showCurrency
                                />
                            </Col>
                            <Col xs={2}>
                                <Form.Check
                                    checked={
                                        !this.props.isAccountVisible(
                                            accountNumber
                                        )
                                    }
                                    type="switch"
                                    id={`account-visibility-${accountNumber}`}
                                    label=""
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) =>
                                        this.props.updateAccountPreference(
                                            this.props.walletEndpointId,
                                            accountNumber,
                                            e.currentTarget.checked
                                        )
                                    }
                                />
                            </Col>
                        </Row>
                    )
                })}
                <PassphraseEntryDialog show={false} />
            </div>
        )
    }

    addNewAccount(accountName: string) {
        askPassphrase().then((passphrase) => {
            if (passphrase == "") {
                throw "empty passphrase"
            }
            this.props.loadNextAccountAttempt(accountName, passphrase)
        })
    }
}

interface OwnProps {
    accounts: IndexedWalletAccounts
    accountPrefs: jspb.Map<number, AppConfiguration.AccountPreference>
    accountBalances: WalletBalance
    walletEndpointId: string
    renameAccountResponse: RenameAccountResponse | null
    errorRenameAccount: AppError | null
    nextAccountResponse: NextAccountResponse | null
    errorNextAccount: AppError | null
    isAccountVisible: (accountNumber: number) => boolean
}

const mapStateToProps = function (state: IApplicationState): OwnProps {
    const walletEndpointId = getConnectedEndpointId(state)
    return {
        accounts: state.accounts.accounts,
        accountPrefs: getAccountPrefs(state),
        accountBalances: getWalletBalances(state),
        walletEndpointId: walletEndpointId,
        renameAccountResponse: state.accounts.renameAccountResponse,
        errorRenameAccount: state.accounts.errorRenameAccount,
        nextAccountResponse: state.accounts.nextAccountResponse,
        errorNextAccount: state.accounts.errorNextAccount,
        isAccountVisible: (accountNumber: number) => {
            return isAccountVisible(state, accountNumber)
        },
    }
}

type Props = OwnProps & DispatchProps

interface DispatchProps {
    loadNextAccountAttempt: typeof loadNextAccountAttempt
    doRenameAccountAttempt: typeof doRenameAccountAttempt
    updateAccountPreference: typeof updateAccountPreference
}

const mapDispatchToProps = {
    doRenameAccountAttempt,
    loadNextAccountAttempt,
    updateAccountPreference,
}

interface InternalState {
    editable?: number
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsSetup)
