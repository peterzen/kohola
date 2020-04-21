import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { Card, Dropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

import { Ticket } from "../../middleware/models"
import { getTickets, loadTicketsAttempt } from "./stakingSlice"
import { TicketStatus } from "../../constants"
import TicketsTable from "./TicketsTable"
import { IApplicationState } from "../../store/types"
import { SelectedDropdownItemLabel } from "../../components/Shared/shared"
import GenericModal from "../../components/Shared/GenericModal"
import TicketDetailsComponent from "./TicketDetailsComponent"
import ComponentPlaceHolder from "../../components/Shared/ComponentPlaceholder"

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
                onSelect={(evtKey: string) => this.onSelect(evtKey)}
            >
                <Dropdown.Toggle
                    variant="secondary"
                    id="ticket-filter-dropdown"
                >
                    <FontAwesomeIcon icon={faFilter} /> {selectedLabel}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Header>Filter tickets</Dropdown.Header>
                    <Dropdown.Divider />
                    {_.map(menuItems, (label, status) => (
                        <Dropdown.Item eventKey={status} key={status}>
                            <SelectedDropdownItemLabel
                                isSelected={status == selected.toString()}
                            >
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
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        <span className="float-right">
                            <TicketsListFilterDropdown
                                menuHandler={_.bind(this.onFilterChange, this)}
                            />
                        </span>
                        My tickets
                    </Card.Title>
                </Card.Body>
                
                <ComponentPlaceHolder type='media' rows={7} ready={!this.props.getTicketsAttempting}>
                    <TicketsTable
                        items={this.getFilteredTickets()}
                        onItemClick={_.bind(this.itemClickHandler, this)}
                    />
                </ComponentPlaceHolder>

                <GenericModal
                    size="lg"
                    footer={true}
                    title="Ticket details"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                >
                    <TicketDetailsComponent ticket={this.state.selectedItem} />
                </GenericModal>

            </Card>
        )
    }
    componentDidMount() {
        this.props.loadTicketsAttempt()
    }

    getFilteredTickets() {
        if (this.state.currentFilter == -1) {
            return this.props.tickets
        }
        return _.filter(
            this.props.tickets,
            (t) => t.getStatus() == this.state.currentFilter
        )
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
        getTicketsAttempting: state.staking.getTicketsAttempting,
    }
}

interface OwnProps {
    tickets: Ticket[]
    getTicketsAttempting: boolean
}

interface DispatchProps {
    loadTicketsAttempt:typeof loadTicketsAttempt
 }

interface InternalState {
    showModal: boolean
    currentFilter: TicketStatus
    selectedItem: Ticket | null
}

type Props = OwnProps & DispatchProps

const mapDispatchToProps = {
    loadTicketsAttempt
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsOverviewContainer)
