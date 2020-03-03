import * as React from 'react';
import _ from 'lodash';

import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { PasteButton, InfoTooltip, Amount } from '../../components/Shared/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faCog,
	faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { AppError } from '../../store/types';
import { sprintf } from 'sprintf-js';
import LorcaBackend from '../../datasources/lorca';
import { Ticket } from '../../models';



interface ITicketBuyerComponentProps {
	title: string
	error: AppError | null
	onFormComplete: () => void
}

interface ITicketBuyerComponentState {
	formRef: React.RefObject<any>
	error: AppError | null
	formIsValidated: boolean
	isDirty: boolean
}

export default class TicketBuyerComponent extends React.Component<ITicketBuyerComponentProps, ITicketBuyerComponentState> {
	constructor(props: ITicketBuyerComponentProps) {
		super(props)
		this.state = {
			error: null,
			isDirty: false,
			formRef: React.createRef(),
			formIsValidated: false,
		}
	}
	render() {
		const onChange = _.bind(this.handleChange, this)
		return (
			<Card>
				<Card.Body>

					<span className="float-right"><Button variant="link"><FontAwesomeIcon icon={faCog} /></Button></span>
					<Card.Title>Ticketbuyer</Card.Title>
					<Form
						// ref={this.state.formRef}
						// validated={this.state.formIsValidated && !this.props.error}
						// onSubmit={_.bind(this.handleFormSubmit, this)}
						className="m-0"
					>
						<Form.Group as={Row}>
							<Col sm={2} className="text-center">
								<Form.Check
									type="switch"
									id="custom-switch"
									label=""
								/>
							</Col>
							<Col sm={10}>
								<Amount amount={126.23871} showCurrency /> to maintain
								{/* <Form.Control
									autoComplete="off"
									required
									type="text"
									name="hostname"
									placeholder="Balance to maintain"
									onChange={onChange}
								// defaultValue={endPoint.getHostname()}
								/> */}
							</Col>
						</Form.Group>
					</Form>

				</Card.Body>
			</Card>

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
