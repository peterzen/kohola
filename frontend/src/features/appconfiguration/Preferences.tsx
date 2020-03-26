import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { Form, Row, Col } from 'react-bootstrap';
import { UIPreferences } from '../../proto/dcrwalletgui_pb';
import { AppError, IApplicationState, AppDispatch } from '../../store/types';

import { saveConfigurationAttempt, getUiPreferences, updateUiPreferences } from './settingsSlice';
import { DisplayUnit, FiatCurrency} from '../../constants';
import { GetPassphraseForConfigEncryptionModal } from './GetPassphraseForConfigEncryptionModal';

class Preferences extends React.Component<Props, InternalState>  {
	constructor(props: Props) {
		super(props)
		this.state = {
			uiPreferences: props.uiPreferences,
			showPassphraseModal: false,
			passphraseModalCallback: (result: string) => {},
			passphraseModalNeedVerify: false
		}
	}

	render() {
		const uiPreferences = this.state.uiPreferences;
		const displayUnit = uiPreferences.getDisplayUnit();
		const fiatCurrency = uiPreferences.getFiatCurrency();
		const isConfigEncrypted = uiPreferences.getIsConfigEncrypted();

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
								checked={displayUnit == DisplayUnit.DCR}
								onChange={(e: React.FormEvent<HTMLInputElement>) =>
									this.updateDisplayUnit(DisplayUnit.DCR)}
							/>
							<Form.Check
								custom
								inline
								name="unit"
								label="Atoms"
								type="radio"
								id="units-radio--atoms"
								checked={displayUnit == DisplayUnit.ATOMS}
								onChange={(e: React.FormEvent<HTMLInputElement>) =>
									this.updateDisplayUnit(DisplayUnit.ATOMS)}
							/>
						</div>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Fiat currency
				</Form.Label>
					<Col sm={10}>
						<Form.Control 
							defaultValue={fiatCurrency}
							onChange={(e: React.FormEvent<HTMLInputElement>) => 
								this.updateFiatCurrency(FiatCurrency[e.currentTarget.value as keyof typeof FiatCurrency])}
							as="select">
							<option>USD</option>
							<option>EUR</option>
						</Form.Control>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Config file encryption
				</Form.Label>
					<Col sm={10}>
						<Form.Check
							id="is-config-encrypted"
							type="switch"
							label=""
							checked={isConfigEncrypted}
							onChange={(e: React.FormEvent<HTMLInputElement>) =>
								this.updateIsConfigEncrypted(e.currentTarget.checked)}
							/>
					</Col>
				</Form.Group>				
				<GetPassphraseForConfigEncryptionModal 
					title="Enter your passphrase"
					onHide={() => this.hidePassphraseModal()}
					passphraseModalNeedVerify={this.state.passphraseModalNeedVerify}
					passphraseModalCallback={this.state.passphraseModalCallback}
					show={this.state.showPassphraseModal}/>
			</Form>
		)
	}

	updateDisplayUnit(displayUnit: DisplayUnit) {
		const uiPreferences = this.state.uiPreferences;
		uiPreferences?.setDisplayUnit(displayUnit);
		this.setState({
			uiPreferences: uiPreferences
		})
		this.props.updateUiPreferences(uiPreferences);
	}

	updateFiatCurrency(fiatCurrency: FiatCurrency) {
		const uiPreferences = this.state.uiPreferences;
		uiPreferences?.setFiatCurrency(fiatCurrency);
		this.setState({
			uiPreferences: uiPreferences
		})
		this.props.updateUiPreferences(uiPreferences);
	}

	updateIsConfigEncrypted(isConfigEncrypted: boolean) {

		const done = (passphrase: string) => {
			this.hidePassphraseModal()
		
			const uiPreferences = this.state.uiPreferences;
			uiPreferences?.setIsConfigEncrypted(isConfigEncrypted);
			this.setState({
				uiPreferences: uiPreferences
			})
			this.props.updateUiPreferences(uiPreferences, passphrase);
		}

		this.showPassphraseModal(done, isConfigEncrypted)

	}	

	showPassphraseModal(callback: ((result: string) => void), needVerify: boolean ) {
		this.setState({ 
			showPassphraseModal: true,
			passphraseModalCallback: callback,
			passphraseModalNeedVerify: needVerify
		})
	}

	hidePassphraseModal() {
		this.setState({
			showPassphraseModal: false
		})
	}	
}

interface OwnProps {
	uiPreferences: UIPreferences
	setConfigError: AppError | null
}

interface InternalState {
	uiPreferences: UIPreferences,
	showPassphraseModal: boolean,
	passphraseModalCallback: ((result: string) => void),
	passphraseModalNeedVerify: boolean
}

const mapStateToProps = function (state: IApplicationState): OwnProps {
	return {
		uiPreferences: getUiPreferences(state.appconfiguration),
		setConfigError: state.appconfiguration.setConfigError,
	}
}

type Props = OwnProps & DispatchProps

interface DispatchProps {
	updateUiPreferences: (uiPreferences: UIPreferences, passphrase?: string) => void
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		updateUiPreferences: (uiPreferences: UIPreferences, passphrase?: string) => {
			dispatch(updateUiPreferences({ uiPreferences: uiPreferences }))
			dispatch(saveConfigurationAttempt(passphrase))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
