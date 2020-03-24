import * as React from 'react'
import { connect } from 'react-redux'

import { Dropdown, Badge } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools, faCircle } from '@fortawesome/free-solid-svg-icons'

import { StakeInfo } from '../../middleware/models'
import { IApplicationState } from '../../store/types'
import { revokeExpiredTickets } from './stakingSlice'
import { askPassphrase } from '../../components/Shared/PassphraseEntryDialog'

import "./Staking.scss"

class StakingToolsMenu extends React.Component<Props>{
	render() {
		const ticketsToRevoke = (this.props.stakeinfo.getExpired() + this.props.stakeinfo.getMissed()) - this.props.stakeinfo.getRevoked()
		return (
			<Dropdown
				alignRight
				onSelect={(evtKey: string) => this.menuHandler(evtKey)}>
				<Dropdown.Toggle id={"staking-tools-dropdown"} className="no-arrow mt-3">
					<div className="text-muted">
						<FontAwesomeIcon icon={faTools} /> Tools
						{" "}
						{ticketsToRevoke > 0 && (
							<sup><FontAwesomeIcon icon={faCircle} className="text-danger" size="sm" /></sup>
						)}
					</div>
				</Dropdown.Toggle>
				<Dropdown.Menu
				>
					<Dropdown.Item
						eventKey={StakingToolsMenuItems[StakingToolsMenuItems.REVOKE]}
						disabled={ticketsToRevoke <= 0}>
						<span className="nowrap">
							Revoke {ticketsToRevoke > 0 && ticketsToRevoke} missed/expired tickets...
						</span>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		)
	}
	menuHandler(evtKey: string) {
		switch (evtKey) {
			case StakingToolsMenuItems[StakingToolsMenuItems.REVOKE]:
				askPassphrase()
					.then((passphrase) => {
						if (passphrase == "") {
							throw "empty passphrase"
						}
						this.props.revokeExpiredTickets(passphrase)
					})
		}
	}
}

export enum StakingToolsMenuItems {
	REVOKE,
}

interface OwnProps {
	stakeinfo: StakeInfo
}

interface DispatchProps {
	revokeExpiredTickets: typeof revokeExpiredTickets
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		stakeinfo: state.staking.stakeinfo,
	}
}

const mapDispatchToProps = {
	revokeExpiredTickets,
}

export default connect(mapStateToProps, mapDispatchToProps)(StakingToolsMenu)

