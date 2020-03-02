import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { IApplicationState } from '../../store/store';
import { Table, Button, Form, Row, Col, InputGroup, Alert } from 'react-bootstrap';

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

function enterHandler(e: React.KeyboardEvent<HTMLInputElement>, callback: () => void) {
	if (e.key == "Enter") {
		callback()
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
								<InputGroup>
									<Form.Control
										type="text"
										onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
											enterHandler(e, () => {
												this.renameAccount(account, e.currentTarget.value)
											})
										}}
										defaultValue={account.getAccountName()} />
									<Form.Control.Feedback />
									<InputGroup.Append>
										<Button
											title="Hit enter"
											variant="link"
										>
											<FontAwesomeIcon icon={faCheck} />
										</Button>
									</InputGroup.Append>
								</InputGroup>
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
				{this.props.error && (
					<Alert variant="danger">{this.props.error.message}</Alert>
				)}
				<div className="mt-2"></div>
				<Button variant="outline-secondary" size="sm">
					<FontAwesomeIcon icon={faPlus} /> Add account...
				</Button>
				<PassphraseEntryDialog show={false} />

			</div >
		)
	}

	onEditBtn() {

	}

	addNewAccount(accountName: string) {
		askPassphrase()
			.then((passphrase) => {
				if (passphrase == "") {
					throw "empty passphrase"
				}
				return this.props.loadNextAccountAttempt(accountName, passphrase)
			})
			.then(() => {
				this.setState({
					editable: undefined
				})
			})
	}

	renameAccount(account: WalletAccount, accountName: string) {
		this.props.renameAccountAttempt(account, accountName)
			.then(() => {
				this.setState({
					editable: undefined
				})
			})
	}
}

const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return {
		accounts: state.accounts.accounts,
		error: state.accounts.errorNextAccount || state.accounts.errorRenameAccount
	};
}


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	renameAccountAttempt: doRenameAccountAttempt,
	loadNextAccountAttempt: loadNextAccountAttempt,
}, dispatch)


interface OwnProps {
	accounts: IndexedWalletAccounts
	error: AppError | null
}

interface DispatchProps {
	loadNextAccountAttempt: (accountName: string, passphrase: string) => any
	renameAccountAttempt: (account: WalletAccount, accountName: string) => any
}

type Props = OwnProps & DispatchProps

interface InternalState {
	editable?: number
}



export default connect(mapStateToProps, mapDispatchToProps)(AccountsSetup);
