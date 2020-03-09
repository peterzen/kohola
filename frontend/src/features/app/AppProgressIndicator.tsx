import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { Modal, ProgressBar } from 'react-bootstrap'
import { IApplicationState } from '../../store/types'

let progressState: any = {}

class AppProgressIndicator extends React.Component<Props>{

	render() {
		return (
			<Modal
				centered
				show={this.props.show}
			>
				<Modal.Body>
					<div className="p-4">
						<h6 className="text-muted mb-4">Opening wallet...</h6>
						<ProgressBar
							animated={true}
							min={0}
							max={5}
							variant="info"
							now={this.props.progress} />
					</div>
				</Modal.Body>
			</Modal>
		)
	}
	componentWillUnmount() {
		progressState = {}
	}
}

interface Props {
	show: boolean
	progress: number
}

const calculateProgress = (state: IApplicationState): number => {
	const steps = [
		state.networkinfo.getBestBlockHeightAttempting,
		state.accounts.getAccountsAttempting,
		state.transactions.getTransactionsRequest,
		state.walletbalance.getBalanceAttempting,
		state.staking.getTicketsRequest,
	]
	_.each(steps, (s, idx) => {
		if (s) progressState[idx] = true
	})
	return _.values(progressState).length
}

const mapStateToProps = (state: IApplicationState): Props => {
	return {
		show: state.app.progressbarShown,
		progress: calculateProgress(state),
	}
}

export default connect(mapStateToProps)(AppProgressIndicator)




