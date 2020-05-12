import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { Card, Dropdown, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

import { Ticket } from "../../middleware/models"
import {
    getTickets,
    loadTicketsAttempt,
    onTimeFrameChanged,
} from "./stakingSlice"
import { TicketStatus } from "../../constants"
import TicketsTable from "./TicketsTable"
import { IApplicationState } from "../../store/types"
import { SelectedDropdownItemLabel } from "../../components/Shared/shared"
import GenericModal from "../../components/Shared/GenericModal"
import TicketDetailsComponent from "./TicketDetailsComponent"
import ComponentPlaceHolder from "../../components/Shared/ComponentPlaceholder"
import IntervalChooser, {
    ChartTimeframe,
    timeframes,
} from "../../components/Shared/IntervalChooser"
import moment from "../../helpers/moment-helper"

interface ITicketsListFilterDropdownProps {
    menuHandler: (eventKey: string) => void
}

interface TicketsListFilterDropdownState {
    selected: number
}

interface IMenuItems {
    [status: number]: string
}

const menuItems: IMenuItems = {}
menuItems[-1] = "All"
menuItems[TicketStatus.LIVE] = "Live"
menuItems[TicketStatus.IMMATURE] = "Immature"
menuItems[TicketStatus.MISSED] = "Missed"
menuItems[TicketStatus.REVOKED] = "Revoked"
menuItems[TicketStatus.VOTED] = "Voted"
menuItems[TicketStatus.UNMINED] = "Unmined"
menuItems[TicketStatus.EXPIRED] = "Expired"

class TicketsListFilterDropdown extends React.Component<
    ITicketsListFilterDropdownProps,
    TicketsListFilterDropdownState
> {
    constructor(props: ITicketsListFilterDropdownProps) {
        super(props)
        this.state = {
            selected: -1,
        }
    }
    render() {
        const selected = this.state.selected
        const selectedLabel = menuItems[selected]
        return (
            <Dropdown
                alignRight
                onSelect={(evtKey: string) => this.onSelect(evtKey)}>
                <Dropdown.Toggle
                    variant="secondary"
                    id="ticket-filter-dropdown">
                    <FontAwesomeIcon icon={faFilter} /> {selectedLabel}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Header>Filter tickets</Dropdown.Header>
                    <Dropdown.Divider />
                    {_.map(menuItems, (label, status) => (
                        <Dropdown.Item eventKey={status} key={status}>
                            <SelectedDropdownItemLabel
                                isSelected={status == selected.toString()}>
                                {label}
                            </SelectedDropdownItemLabel>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    onSelect(value: string) {
        this.setState({
            selected: parseInt(value),
        })
        this.props.menuHandler(value)
    }
}

class TicketsOverviewContainer extends React.Component<Props, InternalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showModal: false,
            selectedItem: null,
            currentFilter: -1,
        }
    }

    render() {
        const tickets = this.props.getFilteredTickets(
            this.state.currentFilter,
            this.props.selectedTimeframe
        )
        return (
            <Card>
                <Card.Header>
                    <div className="float-right">
                        <TicketsListFilterDropdown
                            menuHandler={_.bind(this.onFilterChange, this)}
                        />
                        <IntervalChooser
                            timeframes={timeframes}
                            onChange={(timeframe: ChartTimeframe) =>
                                this.props.onTimeFrameChanged(timeframe)
                            }
                            selectedValue={this.props.selectedTimeframe}
                        />
                    </div>
                    <Card.Title>
                        My tickets{" "}
                        <small className="text-muted">({tickets.length})</small>
                    </Card.Title>
                </Card.Header>

                <ComponentPlaceHolder
                    firstLaunchOnly={true}
                    delay={500}
                    type="text"
                    rows={7}
                    ready={!this.props.getTicketsAttempting}>
                    <TicketsTable
                        items={tickets}
                        onItemClick={_.bind(this.itemClickHandler, this)}
                    />
                </ComponentPlaceHolder>

                <GenericModal
                    size="lg"
                    footer={true}
                    title="Ticket details"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}>
                    <TicketDetailsComponent ticket={this.state.selectedItem} />
                </GenericModal>
            </Card>
        )
    }
    componentDidMount() {
        // this.props.loadTicketsAttempt()
    }

    onFilterChange(filter: string) {
        this.setState({
            currentFilter: parseInt(filter),
        })
    }

    itemClickHandler(ticket: Ticket) {
        this.setState({
            showModal: true,
            selectedItem: ticket,
        })
    }
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        tickets: getTickets(state),
        selectedTimeframe: state.staking.selectedTimeframe,
        getTicketsAttempting: state.staking.getTicketsAttempting,
        getFilteredTickets: (
            currentFilter: TicketStatus,
            timeframe: ChartTimeframe
        ) => {
            let tickets = getTickets(state)
            if (currentFilter != -1) {
                tickets = _.filter(
                    tickets,
                    (t) => t.getStatus() == currentFilter
                )
            }
            const startTimestamp = moment
                .default()
                .subtract(timeframe.days, "days")
                .unix()
            return _.filter(
                tickets,
                (t) => t.getTx().getTimestamp().unix() >= startTimestamp
            )
        },
    }
}

interface OwnProps {
    tickets: Ticket[]
    selectedTimeframe: ChartTimeframe
    getTicketsAttempting: boolean
    getFilteredTickets: (
        filter: TicketStatus,
        timeframe: ChartTimeframe
    ) => Ticket[]
}

interface DispatchProps {
    onTimeFrameChanged: typeof onTimeFrameChanged
    loadTicketsAttempt: typeof loadTicketsAttempt
}

interface InternalState {
    showModal: boolean
    selectedItem: Ticket | null
    currentFilter: TicketStatus
}

type Props = OwnProps & DispatchProps

const mapDispatchToProps = {
    loadTicketsAttempt,
    onTimeFrameChanged,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TicketsOverviewContainer)
