import _ from 'lodash'
import * as React from 'react';

import { Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/types';
import { TransactionNotificationsResponse } from '../../proto/api_pb';


class ToastContainer extends React.Component<Props> {
	render() {
		if (this.props.txNotifications == undefined) {
			return null
		}
		const txList = this.props.txNotifications.getUnminedTransactionsList()
		return (
			<div id="toast-container"
				aria-live="polite"
				aria-atomic="true"
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
					}}
				>
					{txList.map(
						(tx) => (<Notification txHash={tx.getTransaction_asB64()} />)
					)}
				</div>
			</div>
		)
	}
}

class Notification extends React.Component<{ txHash: string }> {

	setShow(show: boolean) {
		this.setState({ show: show })
	}
	render() {
		return (
			<Toast
				onClose={() => this.setShow(false)}
				// show={this.state.show}
				// delay={3000}
				// autohide
				style={{
					position: 'absolute',
					top: 150,
					right: 0,
				}}>
				<Toast.Header variant="success">
					<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
					<strong className="mr-auto">Incoming TX</strong>
					<small>just now</small>
				</Toast.Header>
				<Toast.Body>
					{this.props.txHash}
				</Toast.Body>
			</Toast>
		)
	}
}


interface Props {
	txNotifications: TransactionNotificationsResponse
}

const mapStateToProps = function (state: IApplicationState, ownProps: Props) {
	return {
		txNotification: state.transactions.latestTxNotification
	};
}

export default   connect(mapStateToProps)(ToastContainer)
