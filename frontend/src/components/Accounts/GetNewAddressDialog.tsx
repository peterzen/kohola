import * as React from 'react';
import { connect } from 'react-redux';

import { IApplicationState } from '../../store/types';
import { NextAddressState } from '../../store/accounts/types';
import GenericModalDialog from '../Shared/GenericModalDialog';
import { Spinner } from 'react-bootstrap';

class GetNewAddressDialog extends GenericModalDialog<Props, InternalState> {
	DialogContent() {
		if (this.props.getNextAddressRequest) {
			return (
				<Spinner animation="grow" />
			)
		}
		if (this.props.errorNextAddress != null) {
			return (
				<div>
					<h4>Error ({this.props.errorNextAddress.status})</h4>
					<p className="text-danger">{this.props.errorNextAddress.msg}</p>
				</div>
			)
		}
		return (
			<div>
				<h4>Account: {this.props.nextAddressAccount?.getAccountName()}</h4>
				<span>Address: {this.props.nextAddressResponse?.getAddress()}</span>
			</div>
		)
	}
}

interface OwnProps { }
interface InternalState { }
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
