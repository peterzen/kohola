import { Moment } from "moment";
import { formatTimestamp, reverseHash } from "../../helpers";
import React, { useState, useEffect } from "react";
import { Transaction, WalletAccount, IndexedWalletAccounts } from "../../models";
import _ from "lodash";
import { sprintf } from "sprintf-js";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPaste,
	faClipboard,
	faInfoCircle
} from '@fortawesome/free-solid-svg-icons'


import { Button, ButtonProps, Popover, OverlayTrigger, Form } from 'react-bootstrap';
import { rawHashToHex } from "../../helpers/byteActions";
import CopyToClipboard from "react-copy-to-clipboard";
import accounts from "../../store/accounts/reducers";
import { ATOMS_DIVISOR } from "../../constants";


interface TimestampProps {
	ts: Moment
}
export function Timestamp(props: TimestampProps) {
	return (
		<span className="timestamp" title={props.ts.format()}>{formatTimestamp(props.ts)}</span>
	)
}

export function TransactionHash(props: { tx: Transaction }) {
	return (
		<span className="tx-hash" title={props.tx.getHash()}>{_.truncate(props.tx.getHash(), { length: 15 })}</span>
	)
}

export function TxHash(props: { hash: Buffer, truncate?: boolean }) {
	const h = rawHashToHex(props.hash)
	let truncate = true;
	if (props.truncate != undefined) truncate = props.truncate;
	const truncLength = truncate ? 15 : 100
	return (
		<span className="tx-hash" title={h}>{_.truncate(h, { length: truncLength })}</span>
	)
}

interface AmountProps {
	amount: number
	rounding?: number
	showCurrency?: boolean
}

export function Amount(props: AmountProps) {

	const showCurrency = props.showCurrency || false
	const rounding = props.rounding || 4;
	const dcrAmount = props.amount / 100000000;
	const split = dcrAmount.toFixed(rounding).toString().split(".");
	const head = [split[0], split[1].slice(0, 2)].join(".");
	const tail = split[1].slice(2).replace(/0{1,3}$/, "");
	const negativeZero = (parseFloat(head) === 0) && (dcrAmount < 0);

	return (
		<span className="amount" title={dcrAmount.toString()}>
			<span>{sprintf("%s%02.02f", negativeZero ? '-' : '', head)}</span>
			<span className="fractions" >{tail}</span>&nbsp;
			{showCurrency ? <span className="currency">DCR</span> : ""}
		</span>
	)
}

interface HashProps {
	hash: Uint8Array
}

export function Hash(props: HashProps) {
	if (!props.hash.length) {
		return null;
	}
	const fmtHash = Buffer.from(props.hash).toString("hex")
	return (
		<span>{fmtHash}</span>
	)
}



export function NoRouteMatch() {
	return (
		<div>
			No route match
  		</div>
	)
}



export const InfoTooltip = (props: { text: string }) => {
	const popover = (
		<Popover id="popover-basic">
			{/* <Popover.Title as="h3">Popover right</Popover.Title> */}
			<Popover.Content>{props.text}</Popover.Content>
		</Popover>
	);

	return (
		<OverlayTrigger trigger="hover" placement="top" overlay={popover}>
			<FontAwesomeIcon icon={faInfoCircle} className="text-muted" />
		</OverlayTrigger>
	)
}


export const PasteButton = (args: ButtonProps) => {
	return (
		<Button
			variant="outline-secondary" {...args}>
			<FontAwesomeIcon icon={faPaste} />
		</Button>
	)
}

interface ICopyToClipboardButtonProps {
	value: string
}

export class CopyToClipboardButton extends React.Component<ICopyToClipboardButtonProps, { copied: boolean }> {
	constructor(props: ICopyToClipboardButtonProps) {
		super(props)
		this.state = {
			copied: false
		}
	}
	render() {
		return (
			<span>
				<CopyToClipboard text={this.props.value}
					onCopy={() => this.setState({ copied: true })}>
					<Button
						variant="outline-secondary" >
						<FontAwesomeIcon icon={faClipboard} />
					</Button>
				</CopyToClipboard>
				{
					this.state.copied ? (
						<span className="text-info">Copied.</span>
					) : null
				}
			</span>
		)
	}
}

export class CopyToClipboardText extends React.Component<ICopyToClipboardButtonProps, { copied: boolean }> {
	constructor(props: ICopyToClipboardButtonProps) {
		super(props)
		this.state = {
			copied: false
		}
	}
	render() {
		return (
			<span className="copy-to-clipboard">
				<CopyToClipboard
					text={this.props.value}
					onCopy={() => this.setState({ copied: true })}
				>
					<span className="copy-to-clipboard-inner">
						{this.props.children} <FontAwesomeIcon icon={faClipboard} />
					</span>
				</CopyToClipboard>
				{this.state.copied ? (
					<span className="text-info">Copied</span>
				) : null}
			</span>
		)
	}
}


export const AccountSelector = (props: { name: string, accounts: IndexedWalletAccounts, value: number, onChange: any }) => {
	return (
		<Form.Control
			tabIndex={0}
			name={props.name}
			value={props.value && props.value.toString()}
			onChange={props.onChange}
			as="select">
			{_.map(props.accounts, (a, n) => (
				<option key={n} value={a.getAccountNumber()}>{a.getAccountName()} ({a.getTotalBalance() / ATOMS_DIVISOR} DCR)</option>

			))}
		</Form.Control>
	)
}

// function simulateNetworkRequest() {
// 	return new Promise(resolve => setTimeout(resolve, 2000));
// }

// export function LoadingButton(props: {
// 	label: string,
// 	loadingLabel: string,
// 	onClick: (React.FormEvent<HTMLButtonElement>)
// }) {
// 	const [isLoading, setLoading] = useState(false);

// 	useEffect(() => {
// 		if (isLoading) {
// 			simulateNetworkRequest().then(() => {
// 				setLoading(false);
// 			});
// 		}
// 	}, [isLoading]);

// 	function handleClick() {
// 		setLoading(true);
// 		return props.onClick(arguments);
// 	}

// 	return (
// 		<Button
// 			type="submit"
// 			variant="primary"
// 			disabled={isLoading}
// 			onClick={!isLoading ? handleClick : null}
// 		>
// 			{isLoading ? props.loadingLabel : props.label}
// 		</Button>
// 	);
// }


