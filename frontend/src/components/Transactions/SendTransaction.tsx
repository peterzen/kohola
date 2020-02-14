import * as React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import { IApplicationState } from '../../store/types';
import { ITransactionState } from '../../store/transactions/types';

import { Button } from 'react-bootstrap';
import SendTransactionModal from './SendTransaction/SendTransactionModal';


class SendTransaction extends React.Component<Props, InternalState> {

	constructor(props: Props) {
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
					onClick={_.bind(this.showSendTxModal, this)}>Send funds</Button>

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
	// componentDidUpdate() {
	// 	console.log("####componentDidUpdate")
	// }

}

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps): Props => {
	return {
		...state.transactions,
	}
}

export default connect(mapStateToProps)(SendTransaction);

interface OwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = ITransactionState & DispatchProps & OwnProps

interface InternalState {
	showSendTxModal: boolean
}

