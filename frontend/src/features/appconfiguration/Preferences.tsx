import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { Form, Row, Col, Button } from 'react-bootstrap';
import { MiscPreferences } from '../../proto/dcrwalletgui_pb';
import { AppError, IApplicationState, AppDispatch } from '../../store/types';
import GenericModal, { GenericModalProps } from '../../components/Shared/GenericModal';

import { saveConfigurationAttempt, getMiscPreferences, updateMiscPreferences } from './settingsSlice';
import { DisplayUnit, FiatCurrency} from '../../constants';

export class GetPassphraseForConfigEncryptionModal extends React.Component<GenericModalProps & OwnPropsModal, InternalStateModal>{
	constructor(props: GenericModalProps & OwnPropsModal) {
		super(props)
		this.state = {
			passphrasesAreNotTheSameErrorMsg: "",
			passphraseInnerRef: React.createRef()
		}
	}

	render() {
		return (
			<GenericModal
				title={this.props.title}
				show={this.props.show}
				onEntered={_.bind(this.onEntered, this)}
				onHide={this.props.onHide}
			>
				<Form>
					<Form.Group>
						<Form.Control
							required
							ref={this.state.passphraseInnerRef}
							autoComplete="off"
							name="passphrase"
							type="password"
							onFocus={_.bind(this.handleFocus, this)}
							placeholder="New passphrase"
							defaultValue="" />
						{this.props.passphraseModalNeedVerify && 
							<Form.Control
								required
								autoComplete="off"
								name="verifyPassphrase"
								type="password"
								placeholder="Verify passphrase"
								onFocus={_.bind(this.handleFocus, this)}
								defaultValue="" />
						}
						<span className="help-block">{this.state.passphrasesAreNotTheSameErrorMsg}</span>
					</Form.Group>
					<Form.Group>
						<div className="text-right pr-4">
							<Button
								variant="secondary"
								onClick={this.props.onHide}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								onClick={_.bind(this.handleFormSubmit, this)}
								variant="primary">
								Submit
							</Button>														
						</div>

					</Form.Group>
				</Form>
			</GenericModal>
		)
	}
	
	handleFocus(e: React.FormEvent<HTMLFormElement>) {
		this.setState({
			passphrasesAreNotTheSameErrorMsg: ""
		})		
	}

	onEntered() {
		this.state.passphraseInnerRef.current.focus();
	}	
	
	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.stopPropagation();
		e.preventDefault();

		this.setState({
			passphrasesAreNotTheSameErrorMsg: ""
		})

		const passphrase = e.currentTarget.form.elements.passphrase.value;

		if (this.props.passphraseModalNeedVerify) {
			const verifyPassphrase = e.currentTarget.form.elements.verifyPassphrase.value;

			if (passphrase != verifyPassphrase) {
				this.setState({
					passphrasesAreNotTheSameErrorMsg: "Your new passphrase is not the same as the verify passphrase"
				})
			} else {
				this.props.passphraseModalCallback(passphrase)
			}
		} else {
			this.props.passphraseModalCallback(passphrase)
		}
	}
}

interface InternalStateModal {
	passphrasesAreNotTheSameErrorMsg: string
	passphraseInnerRef: React.RefObject<any>
}

interface OwnPropsModal {
	passphraseModalCallback: ((result: string) => void)
	passphraseModalNeedVerify: boolean
}

class Preferences extends React.Component<Props, InternalState>  {
	constructor(props: Props) {
		super(props)
		this.state = {
			miscPreferences: props.miscPreferences,
			showPassphraseModal: false,
			passphraseModalCallback: (result: string) => {},
			passphraseModalNeedVerify: false
		}
	}

	render() {
		const miscPreferences = this.state.miscPreferences;
		const displayUnit = miscPreferences.getDisplayUnit();
		const fiatCurrency = miscPreferences.getFiatCurrency();
		const isConfigEncrypted = miscPreferences.getIsConfigEncrypted();

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
		const miscPreferences = this.state.miscPreferences;
		miscPreferences?.setDisplayUnit(displayUnit);
		this.setState({
			miscPreferences: miscPreferences
		})
		this.props.updateMiscPreferences(miscPreferences);
	}

	updateFiatCurrency(fiatCurrency: FiatCurrency) {
		const miscPreferences = this.state.miscPreferences;
		miscPreferences?.setFiatCurrency(fiatCurrency);
		this.setState({
			miscPreferences: miscPreferences
		})
		this.props.updateMiscPreferences(miscPreferences);
	}

	updateIsConfigEncrypted(isConfigEncrypted: boolean) {

		const done = (passphrase: string) => {
			this.hidePassphraseModal()
		
			const miscPreferences = this.state.miscPreferences;
			miscPreferences?.setIsConfigEncrypted(isConfigEncrypted);
			this.setState({
				miscPreferences: miscPreferences
			})
			this.props.updateMiscPreferences(miscPreferences, passphrase);
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
	miscPreferences: MiscPreferences
	setConfigError: AppError | null
}

interface InternalState {
	miscPreferences: MiscPreferences,
	showPassphraseModal: boolean,
	passphraseModalCallback: ((result: string) => void),
	passphraseModalNeedVerify: boolean
}

const mapStateToProps = function (state: IApplicationState): OwnProps {
	return {
		miscPreferences: getMiscPreferences(state.appconfiguration),
		setConfigError: state.appconfiguration.setConfigError,
	}
}

type Props = OwnProps & DispatchProps

interface DispatchProps {
	updateMiscPreferences: (miscPreferences: MiscPreferences, passphrase?: string) => void
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		updateMiscPreferences: (miscPreferences: MiscPreferences, passphrase?: string) => {
			dispatch(updateMiscPreferences({ miscPreferences: miscPreferences }))
			dispatch(saveConfigurationAttempt(passphrase))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
