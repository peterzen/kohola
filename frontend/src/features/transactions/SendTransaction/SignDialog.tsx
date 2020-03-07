import _ from "lodash"
import * as React from "react"

import { Form, Button, FormControl, Table, Row, Col } from 'react-bootstrap';

import { AppError } from "../../../store/types";
import { ConstructTransactionResponse } from "../../../proto/api_pb";
import { rawToHex } from "../../../helpers/byteActions";
import { DecodedrawTx } from "../../../datasources/models";
import DialogAlert from "./DialogAlert";
import { decodeRawTransaction } from "../../../helpers/tx";
import { HumanreadableTxInfo } from "../transactionsSlice";
import { Amount, TxHash } from "../../../components/Shared/shared";

const ReviewTx = (props: {
	txInfo: HumanreadableTxInfo,
	constructTxResp: ConstructTransactionResponse
}) => {
	const txInfo = props.txInfo
	const resp = props.constructTxResp
	const changeAddress = txInfo.constructTxReq.getChangeDestination() ? txInfo.constructTxReq.getChangeDestination()?.getAddress() : null
	return (
		<div>
			<Table>
				<tbody>
					<tr>
						<th>Source account:</th>
						<td>{txInfo.sourceAccount.getAccountName()}</td>
					</tr>
					<tr>
						<th>Total amount:</th>
						<td><Amount amount={txInfo.totalAmount} showCurrency /></td>
					</tr>
					<tr>
						<th>Fee</th>
						<td>Fee rate: {txInfo.constructTxReq.getFeePerKb()}<br />
						</td>

					</tr>
					<tr>
						<th>Inputs ({txInfo.rawTx.numInputs}):</th>
						<td>
							{txInfo.rawTx.inputs.map((i) => (
								<div key={i.prevTxId.toString()}><TxHash hash={i.prevTxId} />:{i.outputIndex}</div>
							))}
						</td>
					</tr>
					<tr>
						<th>Outputs:</th>
						<td>
							<Table>
								<tbody>
									{txInfo.constructTxReq.getNonChangeOutputsList().map((o) => {
										if (o == undefined || o.getDestination() == undefined) return null
										// @ts-ignore
										const address = o.getDestination().getAddress()
										return (
											<tr key={address}>
												<td>{address}</td>
												<td><Amount amount={o.getAmount()} showCurrency /></td>
											</tr>
										)
									})}
								</tbody>
							</Table>

							{changeAddress && (
								<div>
									Change destination: {changeAddress}
								</div>
							)}
						</td>
					</tr>
					<tr>
						<th>Estimated size:</th>
						<td>{resp.getEstimatedSignedSize()}b</td>
					</tr>
				</tbody>
			</Table>
			<Form>
				<Form.Group controlId="unsignedTxHex">
					<Form.Label>Unsigned tx</Form.Label>
					<Form.Control
						readOnly
						as="textarea"
						cols="20"
						rows="3"
						value={rawToHex(resp.getUnsignedTransaction_asU8())}
					/>
				</Form.Group>
			</Form>
		</div>

	)
}
export default class SignDialog extends React.Component<OwnProps, InternalState>{
	constructor(props: OwnProps) {
		super(props)
		this.state = {
			rawTx: decodeRawTransaction(Buffer.from(this.props.constructTransactionResponse.getUnsignedTransaction_asU8())),
			error: null,
			formIsValidated: false,
			passphrase: ""
		}
	}

	render() {
		return (
			<div>
				<h4>Review and confirm transaction</h4>
				{this.props.txInfo != null && (
					<ReviewTx txInfo={this.props.txInfo} constructTxResp={this.props.constructTransactionResponse} />
				)}
				<Form
					validated={this.state.formIsValidated && !this.props.error}
					onSubmit={_.bind(this.handleFormSubmit, this)}
				>
					<Form.Group controlId="destinationAddressControl">
						<Form.Label>Wallet passphrase:</Form.Label>
						<FormControl
							required
							autoComplete="off"
							tabIndex={0}
							type="password"
							placeholder=""
							onChange={_.bind(this.handleWalletPassphraseChange, this)}
							name="walletPassphrase" />
						<Form.Control.Feedback type="invalid">
							Invalid passphrase
					</Form.Control.Feedback>
					</Form.Group>
					<DialogAlert error={this.props.error} />
					<Row>
						<Col>
							<Button
								tabIndex={4}
								variant="secondary"
								onClick={this.props.onCancel}
							>Back</Button>
						</Col>
						<Col className="text-right">
							<Button
								tabIndex={4}
								variant="primary"
								type="submit">Sign tx</Button>

						</Col>
					</Row>
				</Form>
			</div>
		)
	}

	handleWalletPassphraseChange(e: React.ChangeEvent<HTMLInputElement>) {
		const passphrase = e.currentTarget.value
		if (!passphrase.length) {
			return
		}
		this.setState({
			passphrase: passphrase
		})
		return true;
	}


	handleCancel(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();

	}
	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({ formIsValidated: true })
		this.props.onFormComplete(this.state)
		return false;
	}
}


interface OwnProps {
	error: AppError | null
	txInfo: HumanreadableTxInfo | null,
	constructTransactionResponse: ConstructTransactionResponse,
	onFormComplete: (formData: ISignDialogFormData) => void
	onCancel: () => void
}


interface InternalState {
	error: AppError | null
	formIsValidated: boolean
	passphrase: string
	rawTx: DecodedrawTx
}

export interface ISignDialogFormData {
	passphrase: string
}
