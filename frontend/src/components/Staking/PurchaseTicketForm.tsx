import * as React from 'react';
import _ from 'lodash';

import { Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { PasteButton, InfoTooltip } from '../Shared/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faExclamationTriangle,
	faPlus, faMinus,
	faCircleNotch,
	faCheck
} from '@fortawesome/free-solid-svg-icons'
import { AppError } from '../../store/types';
import { sprintf } from 'sprintf-js';
import LorcaBackend from '../../datasources/lorca';
import { Ticket, WalletAccount } from '../../models';

import React, { useState } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';



interface IPurchaseTicketFormProps {
	title: string
	error: AppError | null
	accounts: WalletAccount[]
	// onFormComplete: () => void
}

interface IPurchaseTicketFormState {
	formRef: React.RefObject<any>
	error: AppError | null
	formIsValidated: boolean
	isDirty: boolean
}

export default class PurchaseTicketForm extends React.Component<IPurchaseTicketFormProps, IPurchaseTicketFormState> {
	constructor(props: IPurchaseTicketFormProps) {
		super(props)
		this.state = {
			error: null,
			isDirty: false,
			formRef: React.createRef(),
			formIsValidated: false,
		}
	}
	accountSelectOptions() {
		return _.map(this.props.accounts, (a, n) =>
			<option key={n} value={a.getAccountNumber()}>{a.getAccountName()} ({a.getTotalBalance() / ATOMS_DIVISOR} DCR)</option>
		)
	}
	render() {
		const onChange = _.bind(this.handleChange, this)
		return (
			<Card >
				<Card.Body>
					<Card.Title>Purchase tickets</Card.Title>
					<Form
						// ref={this.state.formRef}
						// validated={this.state.formIsValidated && !this.props.error}
						// onSubmit={_.bind(this.handleFormSubmit, this)}
						className="m-0"
					>
						<Form.Group as={Row}>
							<Col sm={4}>
								<Form.Label>From account</Form.Label>

								{/* <Form.Control
									autoComplete="off"
									required
									name="port"
									type="text"
									placeholder="Port"
									onChange={onChange}
								// defaultValue={endPoint.getPort().toString()}
								/> */}
							</Col>
							<Col sm={8}>
								<Form.Control
									tabIndex={0}
									// value={this.state.sourceAccount.getAccountNumber().toString()}
									// onChange={_.bind(this.handleSourceSelectChange, this)}
									as="select">
									<option>default (35xxxx DCR)</option>
									<option>otheracc (35xxxx DCR)</option>
									<option> pos(35xxxx DCR)</option>
								</Form.Control>
							</Col>
						</Form.Group>
						<Form.Group as={Row}>
							<InputGroup as={Col} sm={4}>
								# of tickets
								</InputGroup>
							<InputGroup as={Col} sm={8}>
								<InputGroup.Prepend>
									<Button variant="outline-secondary" >
										<FontAwesomeIcon icon={faMinus} />
									</Button>
								</InputGroup.Prepend>
								<Form.Control
									required
									name="tickets"
									type="number"
									tabIndex={-1}
									defaultValue="" />
								<InputGroup.Append>
									<Button variant="outline-secondary" >
										<FontAwesomeIcon icon={faPlus} />
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</Form.Group>

						<Form.Group className="p-2">
							<RangeSlider
								defaultValue={50}
							// onChange={changeEvent => console.log(changeEvent.target.value)}
							/>
							<p
								className="mt-5"
							>Est balance:</p>
						</Form.Group>
					</Form>
					
					
				</Card.Body>
				<Card.Footer className="text-right">
						<Button variant="outline-primary">
							Purchase
						</Button>
					</Card.Footer>
			</Card >

		)
	}

	browseFile() {
		// const w = (window as any)
		// w.walletgui_FileOpenDialog()
		// 	.then((file: string) => {
		// 		console.log("FILE", file)
		// 		this.state.formRef.current.cert_file_name.value = file
		// 		this.handleChange()
		// 		// endPoint.setCertFileName(file)
		// 	})
	}

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		// this.setState({
		// 	formIsValidated: true,
		// 	isDirty: false,
		// })
		// loadFormFields(this.state.formRef, this.props.endPointConfig)
		// console.log("formSubmit", this.props.endPointConfig.toObject())
		// this.props.onFormComplete()

		return false;
	}

	handleChange() {
		// console.log("handleChange")
		// const ep = this.props.endPointConfig
		// this.setState({
		// 	isDirty: true
		// })
		// if (!this.state.formRef.current.checkValidity()) {
		// 	return
		// }
		// this.setState({
		// 	connectionCheckStatus: ConnectionCheckState.CHECKING
		// })
		// checkEndpointFn(this.state.formRef, ep, _.bind((r) => {
		// 	this.setState({
		// 		connectionCheckStatus: r.error ? ConnectionCheckState.FAILED : ConnectionCheckState.SUCCESS,
		// 		connectionCheckMessage: r.error
		// 	})
		// }, this))
	}
}



const loadFormFields = (formRef: React.RefObject<any>, ep: Ticket) => {
	// const f = formRef.current
	// if (ep instanceof RPCEndpoint) {
	// 	ep.setUsername(f.username.value)
	// 	ep.setPassword(f.password.value)
	// }
	// ep.setHostname(f.hostname.value)
	// ep.setPort(f.port.value)
	// ep.setNetwork(f.network.value)
	// ep.setCertFileName(f.cert_file_name.value)
	// ep.setLabel(generateEndpointLabel(ep))
}

