import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"

import { getAccounts } from "../../store/accounts/selectors"
import { IApplicationState, AppError } from "../../store/types"
import { IndexedWalletAccounts } from "../../models"

import { Row, Form, Button, Col, InputGroup, ToggleButton, FormControl, FormCheck } from 'react-bootstrap';

import { ATOMS_DIVISOR, DEFAULT_FEE, DEFAULT_REQUIRED_CONFIRMATIONS } from "../../constants"
import { constructTransactionAttempt } from "../../store/transactions/actions"
import { ConstructTxOutput } from "../../datasources/models"
import SendDialogForm, { ISendDialogFormData } from "./SendDialogForm"


class SendDialogContainer extends React.Component<Props, InternalState>{
	constructor(props: Props) {
		super(props)
	}

	render() {
		return (
			<Row>
				<Col>
					<SendDialogForm
						error={this.props.error}
						accounts={this.props.accounts}
						onFormComplete={_.bind(this.onFormComplete, this)} />
				</Col>
				<Col>
				</Col>
			</Row>
		)
	}

	async onFormComplete(formData: ISendDialogFormData) {
		const outputs: ConstructTxOutput[] = [{
			destination: formData.destinationAddress[0],
			amount: formData.amount * ATOMS_DIVISOR
		}]
		this.props.constructTransactionAttempt(
			formData.sourceAccount.getAccountNumber(),
			formData.requiredConfirmations,
			outputs,
			formData.sendAllToggle
		)
	}
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		...state.walletbalance,
		error: state.transactions.errorConstructTransaction,
		accounts: getAccounts(state),
	};
}

interface OwnProps {
	error: AppError | null
	accounts: IndexedWalletAccounts
}


interface DispatchProps {
	constructTransactionAttempt(...arguments: any): Promise<any>
}

type Props = DispatchProps & OwnProps

interface InternalState {

}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	constructTransactionAttempt: constructTransactionAttempt
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(SendDialogContainer);
