import * as React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import { Button } from 'react-bootstrap';

import SendTransactionModal from './SendTransaction/SendTransactionModal';
import { WalletAccount } from '../../models';
import { IApplicationState } from '../../store/types';


class SendTransaction extends React.Component<OwnProps, InternalState> {

	constructor(props: OwnProps) {
		super(props)
		this.state = {
			showSendTxModal: false,
		}
	}

	render() {
		return (
			<>
				<Button
					variant="primary"
					className=""
					onClick={_.bind(this.showSendTxModal, this)}>Send</Button>

				<SendTransactionModal
					show={this.state.showSendTxModal}
					onHide={_.bind(this.hideSendTxModal, this)} />

			</>
		)
	}
	showSendTxModal() {
		this.setState({ showSendTxModal: true })
	}
	hideSendTxModal() {
		this.setState({ showSendTxModal: false })
	}
}

const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.transactions,
	}
}

export default connect(mapStateToProps)(SendTransaction);

interface OwnProps {
	defaultAccount?: WalletAccount
}

interface InternalState {
	showSendTxModal: boolean
}

