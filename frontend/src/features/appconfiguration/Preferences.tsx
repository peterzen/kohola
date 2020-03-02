import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { WalletAccountsState } from './accountSlice';
import { IApplicationState } from '../../store/store';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';


import {
	faPencilAlt,
	faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class AccountsSetup extends React.Component<WalletAccountsState, WalletAccountsState> {

	render() {
		return (
			<Form>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Display unit
						</Form.Label>
					<Col sm={10}>
						<div className="pt-2">
							<Form.Check
								custom
								inline
								name="unit"
								label="DCR"
								type="radio"
								id="units-radio--dcr"
							/>
							<Form.Check
								custom
								inline
								name="unit"
								label="Atoms"
								type="radio"
								id="units-radio--atoms"
							/>
						</div>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Fiat currency
				</Form.Label>
					<Col sm={10}>
						<Form.Control as="select">
							<option>USD</option>
							<option>EUR</option>
						</Form.Control>
					</Col>
				</Form.Group>
			</Form>
		)
	}
}

const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return {
		accounts: state.accounts.accounts
	};
}

export default connect(mapStateToProps)(AccountsSetup);
