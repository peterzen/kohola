import * as React from 'react';
import { connect } from 'react-redux';

import { IApplicationState } from '../../store/types';
import { NextAddressState } from '../../store/accounts/types';
import GenericModalDialog from '../Shared/GenericModalDialog';
import { Spinner } from 'react-bootstrap';
import { CopyToClipboardButton, CopyToClipboardText } from '../Shared/shared';

class GetNewAddressDialog extends GenericModalDialog<Props, InternalState> {
	DialogContent() {
		const address = this.props.nextAddressResponse?.getAddress() || ""
		return (
			<div>
				{
					this.props.getNextAddressRequest && (
						<Spinner animation="grow" />
					)
				}
				{
					this.props.errorNextAddress != null && (
						<div>
							<h4>Error ({this.props.errorNextAddress.status})</h4>
							<p className="text-danger">{this.props.errorNextAddress.msg}</p>
						</div>
					)
				}
				{this.props.errorNextAddress == null && (
					<>
						<h4>Account: {this.props.nextAddressAccount?.getAccountName()}</h4>
						<h6>Address: </h6>
						<CopyToClipboardText value={address}><code>{address}</code></CopyToClipboardText>
					</>
				)}
			</div>
		)
	}
}

interface OwnProps { }
interface InternalState {
}
type Props = NextAddressState & OwnProps


const mapStateToProps = (state: IApplicationState) => {
	return {
		nextAddressAccount: state.accounts.nextAddressAccount,
		nextAddressResponse: state.accounts.nextAddressResponse,
		getNextAddressRequest: state.accounts.getNextAddressRequest,
		errorNextAddress: state.accounts.errorNextAddress,
	}
}

export default connect(mapStateToProps)(GetNewAddressDialog)
