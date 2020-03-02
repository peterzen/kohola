import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { IApplicationState } from '../../store/store';
import { Table, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';


import {
	faPencilAlt,
	faPlus,
	faCheck
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WalletAccount } from '../../models';
import { Dispatch, bindActionCreators } from '@reduxjs/toolkit';
import { loadNextAccountAttempt } from './accountSlice';
import PassphraseEntryDialog, { askPassphrase } from '../../components/Shared/PassphraseEntryDialog';

function enterHandler(e, callback) {
	if (e.key == "Enter") {
		callback()
	}
}



class AccountsSetup extends React.Component<Props, InternalState> {

	constructor(props: Props) {
		super(props)
		this.state = {
			editable: {}
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
							{!this.state.editable[account.getAccountNumber()] && (
								<span>
									{account.getAccountName()}
									<Button
										variant="link"
										onClick={() => {
											const s: any = {}
											s[account.getAccountNumber()] = true
											this.setState({
												editable: s
											})
										}}
									>
										<FontAwesomeIcon icon={faPencilAlt} />
									</Button>
								</span>
							)}
							{this.state.editable[account.getAccountNumber()] && (
								<InputGroup>
									<Form.Control
										type="text"
										onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
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
					throw cancelError
				}
				this.props.loadNextAccountAttempt(accountName, passphrase)
			})
		
	}

	renameAccount(account: WalletAccount, accountName: string) {
		askPassphrase()
			.then((passphrase) => {
				if (passphrase == "") {
					throw cancelError
				}
				this.props.renameAccountAttempt(account, accountName, passphrase)
			})
	}
}

const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return {
		accounts: state.accounts.accounts
	};
}


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	loadNextAccountAttempt: loadNextAccountAttempt,
}, dispatch)


interface OwnProps {

}

type Props = OwnProps

interface InternalState {
	editable: {
		[accountNumber: number]: boolean
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountsSetup);
