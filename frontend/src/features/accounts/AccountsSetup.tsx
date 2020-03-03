import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { IApplicationState } from '../../store/store';
import { Button, Form, Row, Col, InputGroup, Alert } from 'react-bootstrap';

import {
	faPencilAlt,
	faPlus,
	faCheck
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WalletAccount, IndexedWalletAccounts } from '../../models';
import { Dispatch, bindActionCreators } from '@reduxjs/toolkit';
import { loadNextAccountAttempt, doRenameAccountAttempt } from './accountSlice';
import PassphraseEntryDialog, { askPassphrase } from '../../components/Shared/PassphraseEntryDialog';
import { AppError } from '../../store/types';
import { NextAccountResponse, RenameAccountResponse } from '../../proto/api_pb';

function enterHandler(e: React.KeyboardEvent<HTMLInputElement>, callback: () => void) {
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
				defaultValue={defaultValue} />
			<Form.Control.Feedback />
			<InputGroup.Append>
				<Button
					title="Hit enter"
					variant="link"
				><FontAwesomeIcon icon={faCheck} /></Button>
			</InputGroup.Append>
		</InputGroup>
	)
}

interface IAddAccountProps {
	nextAccountResponse: NextAccountResponse | null
	error: AppError | null
	onEditComplete: (value: string) => void
}

class AddAccountComponent extends React.Component<IAddAccountProps, { visible: boolean }> {
	constructor(props: IAddAccountProps) {
		super(props)
		this.state = {
			visible: false
		}
	}
	render() {
		const toggle = this.state.visible
		return (
			<div>
				<Button variant="outline-secondary" size="sm" onClick={() => this.setState({ visible: !toggle })}>
					<FontAwesomeIcon icon={faPlus} /> Add account...
				</Button>
				{this.state.visible && this.props.nextAccountResponse == null && (
					<div>
						Account name:
						<AccountNameInputComponent onEditComplete={(value) => this.props.onEditComplete(value)} />
					</div>
				)}
				{this.props.nextAccountResponse && (
					<Alert variant="success">Account #{this.props.nextAccountResponse.getAccountNumber()} created</Alert>
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
			editable: undefined
		}
	}

	render() {
		const accounts = _.values(this.props.accounts);
		return (
			<div>
				<Row key="header">
					<Col xs={8}></Col>
					<Col xs={4}>Visible</Col>
				</Row>
				{accounts.map(account => (
					<Row key={account.getAccountNumber()}>
						<Col xs={8}>
							{this.state.editable != account.getAccountNumber() && (
								<span>
									{account.getAccountName()}
									<Button
										variant="link"
										onClick={() => {
											this.setState({
												editable: account.getAccountNumber()
											})
										}}
									>
										<FontAwesomeIcon icon={faPencilAlt} />
									</Button>
								</span>
							)}
							{this.state.editable == account.getAccountNumber() && (
								<AccountNameInputComponent
									account={account}
									onEditComplete={(value) => this.renameAccount(account, value)} />
							)}
						</Col>
						<Col xs={4}>
							<Form.Check
								type="switch"
								id={`account-visibility-${account.getAccountNumber()}`}
								label=""
							/>
						</Col>
					</Row>
				))}
				{this.props.renameAccountResponse && (
					<Alert variant="success">Account renamed</Alert>
				)}
				{this.props.errorRenameAccount && (
					<Alert variant="danger">{this.props.errorRenameAccount.message}</Alert>
				)}
				<hr />
				<div className="mt-2"></div>
				<AddAccountComponent
					onEditComplete={(value) => this.addNewAccount(value)}
					error={this.props.errorNextAccount}
					nextAccountResponse={this.props.nextAccountResponse}
				/>
				<PassphraseEntryDialog show={false} />
			</div >
		)
	}

	addNewAccount(accountName: string) {
		askPassphrase()
			.then((passphrase) => {
				if (passphrase == "") {
					throw "empty passphrase"
				}
				this.props.loadNextAccountAttempt(accountName, passphrase)
			})
	}

	renameAccount(account: WalletAccount, accountName: string) {
		this.props.renameAccountAttempt(account, accountName)
	}
}

interface OwnProps {
	accounts: IndexedWalletAccounts
	renameAccountResponse: RenameAccountResponse | null
	errorRenameAccount: AppError | null
	nextAccountResponse: NextAccountResponse | null
	errorNextAccount: AppError | null
}

const mapStateToProps = function (state: IApplicationState, ownProps: OwnProps) {
	return {
		accounts: state.accounts.accounts,
		renameAccountResponse: state.accounts.renameAccountResponse,
		errorRenameAccount: state.accounts.errorRenameAccount,
		nextAccountResponse: state.accounts.nextAccountResponse,
		errorNextAccount: state.accounts.errorNextAccount,
	};
}

type Props = OwnProps & DispatchProps

interface DispatchProps {
	loadNextAccountAttempt: typeof loadNextAccountAttempt
	renameAccountAttempt: typeof doRenameAccountAttempt
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	renameAccountAttempt: doRenameAccountAttempt,
	loadNextAccountAttempt: loadNextAccountAttempt,
}, dispatch)

interface InternalState {
	editable?: number
}



export default connect(mapStateToProps, mapDispatchToProps)(AccountsSetup);
