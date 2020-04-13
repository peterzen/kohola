import React from "react"
import { connect } from "react-redux"
import _ from "lodash"
import { Moment } from "moment"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faPaste,
	faClipboard,
	faInfoCircle,
	faSlidersH,
	faCopy,
	faCheck,
} from "@fortawesome/free-solid-svg-icons"

// @ts-ignore
import Fade from "react-reveal/Fade"
import {
	Button,
	ButtonProps,
	Popover,
	OverlayTrigger,
	Form,
} from "react-bootstrap"

import { formatTimestamp } from "../../helpers/helpers"
import {
	Transaction,
	IndexedWalletAccounts,
	WalletBalance,
} from "../../middleware/models"

import { rawHashToHex } from "../../helpers/byteActions"
import CopyToClipboard from "react-copy-to-clipboard"
import { ATOMS_DIVISOR } from "../../constants"
import { getVisibleAccounts } from "../../features/balances/accountSlice"
import {
	getAccountPrefs,
} from "../../features/appconfiguration/settingsSlice"
import { getWalletBalances } from "../../features/balances/walletBalanceSlice"
import { IApplicationState } from "../../store/types"
import { AppConfiguration } from "../../proto/walletgui_pb"

interface TimestampProps {
	ts: Moment
}
export function Timestamp(props: TimestampProps) {
	return (
		<span className="timestamp" title={props.ts.format()}>
			{formatTimestamp(props.ts)}
		</span>
	)
}

export function TransactionHash(props: {
	tx: Transaction
	truncate?: boolean
}) {
	let truncate = true
	if (props.truncate != undefined) truncate = props.truncate
	const truncLength = truncate ? 15 : 100
	return (
		<span className="tx-hash" title={props.tx.getHash()}>
			{_.truncate(props.tx.getHash(), { length: truncLength })}
		</span>
	)
}

export function TxHash(props: {
	hash: Buffer | Uint8Array
	truncate?: boolean
}) {
	const h = rawHashToHex(props.hash)
	if (h == null) {
		console.error("rawHashToHex returned null")
		return null
	}
	let truncate = true
	if (props.truncate != undefined) truncate = props.truncate
	const truncLength = truncate ? 15 : 100
	return (
		<span className="tx-hash" title={h}>
			{_.truncate(h, { length: truncLength })}
		</span>
	)
}

interface HashProps {
	hash: Uint8Array
}

export function Hash(props: HashProps) {
	if (!props.hash.length) {
		return null
	}
	const fmtHash = Buffer.from(props.hash).toString("hex")
	return <span>{fmtHash}</span>
}

export function NoRouteMatch() {
	return <div>No route match</div>
}

export const InfoTooltip = (props: { text: string }) => {
	const popover = (
		<Popover id="popover-basic">
			{/* <Popover.Title as="h3">Popover right</Popover.Title> */}
			<Popover.Content>{props.text}</Popover.Content>
		</Popover>
	)

	return (
		<OverlayTrigger trigger="hover" placement="top" overlay={popover}>
			<FontAwesomeIcon icon={faInfoCircle} className="text-muted" />
		</OverlayTrigger>
	)
}

export const WidgetOptionsButton = (args: ButtonProps) => {
	return (
		<Button variant="secondary" {...args}>
			<FontAwesomeIcon icon={faSlidersH} />
		</Button>
	)
}

export const PasteButton = (args: any) => {
	return (
		<Button variant="secondary" {...args}>
			<FontAwesomeIcon icon={faPaste} />
		</Button>
	)
}

interface ICopyToClipboardButtonProps {
	value: string
}

export class CopyToClipboardButton extends React.Component<
	ICopyToClipboardButtonProps,
	{ copied: boolean }
	> {
	constructor(props: ICopyToClipboardButtonProps) {
		super(props)
		this.state = {
			copied: false,
		}
	}
	render() {
		return (
			<span>
				<CopyToClipboard
					text={this.props.value}
					onCopy={() => this.setState({ copied: true })}
				>
					<Button variant="secondary">
						<FontAwesomeIcon icon={faClipboard} />
					</Button>
				</CopyToClipboard>
				{this.state.copied ? (
					<Fade bottom>
						{" "}
						<span className="text-info">Copied.</span>
					</Fade>
				) : null}
			</span>
		)
	}
}

export class CopyToClipboardText extends React.Component<
	ICopyToClipboardButtonProps,
	{ copied: boolean }
	> {
	constructor(props: ICopyToClipboardButtonProps) {
		super(props)
		this.state = {
			copied: false,
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
						{this.props.children}{" "}
						<FontAwesomeIcon icon={faCopy} className="text-muted" />
					</span>
				</CopyToClipboard>
				{this.state.copied ? (
					<Fade bottom>
						{" "}
						<span className="text-info">Copied</span>
					</Fade>
				) : null}
			</span>
		)
	}
}

interface IAccountSelectProps {
	name: string
	tabIndex?: number
	enableAccountCreate?: boolean
	defaultValue: number
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

interface OwnProps {
	balances: WalletBalance
	accounts: IndexedWalletAccounts
}

class _AccountSelector extends React.Component<IAccountSelectProps & OwnProps> {
	render() {
		const props = this.props
		return (
			<Form.Control
				tabIndex={props.tabIndex}
				name={props.name}
				defaultValue={props.defaultValue}
				onChange={props.onChange}
				as="select"
			>
				<option value={-1}>Choose account</option>
				{_.map(props.accounts, (a, n) => {
					return (
						<option key={n} value={a.getAccountNumber()}>
							{a.getAccountName()} (
							{props.balances[a.getAccountNumber()] &&
								props.balances[a.getAccountNumber()].getSpendable() / ATOMS_DIVISOR}{" "}
                            DCR)
						</option>
					)
				})}
				{props.enableAccountCreate && (
					<>
						<optgroup label="---------------"></optgroup>
						<option value="-2">Add account...</option>
					</>
				)}
			</Form.Control>
		)
	}
}

const mapStateToProps = (state: IApplicationState) => {
	return {
		accounts: getVisibleAccounts(state),
		balances: getWalletBalances(state),
	}
}

export const AccountSelector = connect(mapStateToProps)(_AccountSelector)

export class SelectedDropdownItemLabel extends React.Component<{
	isSelected: boolean
}> {
	render() {
		return (
			<div>
				<div
					className="float-left"
					style={{ width: "1.5em", display: "block" }}
				>
					{this.props.isSelected && (
						<FontAwesomeIcon icon={faCheck} />
					)}
                    &nbsp;
                </div>
				<div className="float-left">{this.props.children}</div>
			</div>
		)
	}
}
