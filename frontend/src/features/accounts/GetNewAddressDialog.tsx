import * as React from 'react';
import { connect } from 'react-redux';

import { Spinner, Row, Col } from 'react-bootstrap';

import GenericModalDialog from '../../components/Shared/GenericModalDialog';
import { CopyToClipboardText } from '../../components/Shared/shared';
import { IApplicationState } from '../../store/store';
import { NextAddressState } from './accountSlice';
import ErrorAlert from '../../components/Shared/ErrorAlert';
import QrCodeRenderer from '../../components/Shared/QrCodeRenderer';

class GetNewAddressDialog extends GenericModalDialog<Props, InternalState> {
	DialogContent() {
		const address = this.props.nextAddressResponse?.getAddress() || ""
		return (
			<div>
				{this.props.getNextAddressAttempting && (
					<Spinner animation="grow" />
				)}
				{this.props.errorNextAddress != null && (
					<ErrorAlert error={this.props.errorNextAddress} />
				)}
				{this.props.errorNextAddress == null && (
					<Row>
						<Col sm={8}>
							<h4>Account: {this.props.nextAddressAccount?.getAccountName()}</h4>
							<h6>Address: </h6>
							<CopyToClipboardText value={address}><code>{address}</code></CopyToClipboardText>
						</Col>
						<Col sm={4}>
							<QrCodeRenderer value={`decred:${address}`} />
						</Col>
					</Row>
				)}
			</div>
		)
	}
}

interface InternalState {
}

type Props = NextAddressState

const mapStateToProps = (state: IApplicationState) => {
	return {
		nextAddressAccount: state.accounts.nextAddressAccount,
		nextAddressResponse: state.accounts.nextAddressResponse,
		errorNextAddress: state.accounts.errorNextAddress,
	}
}

export default connect(mapStateToProps)(GetNewAddressDialog)
