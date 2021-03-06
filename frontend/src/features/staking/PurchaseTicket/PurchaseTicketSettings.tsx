import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import {
    Spinner,
    Row,
    Col,
    Form,
    InputGroup,
    Modal,
    Button,
    Tabs,
    Tab,
    Card,
} from "react-bootstrap"

import { IApplicationState, AppError } from "../../../store/types"
import { AccountSelector } from "../../../components/Shared/shared"
import FeeChooserInput from "../../transactions/FeeChooserInput"
import { PurchaseTicketsRequest } from "../../../proto/api_pb"

class PurchaseTicketSettingsForm extends React.Component<Props, InternalState> {
    constructor(props: Props) {
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
            <div>
                <Form
                    ref={this.state.formRef}
                    validated={this.state.formIsValidated}
                    onSubmit={_.bind(this.handleFormSubmit, this)}
                    className="m-0">
                    <Tabs
                        defaultActiveKey="solo"
                        id="purchaseticketsettings-tabs">
                        <Tab eventKey="solo" title="Solo staking">
                            <Form.Group as={Row} className="p-2">
                                <Col sm={4}>
                                    <Form.Label>Default account</Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <AccountSelector
                                        defaultValue={-1}
                                        name="account_select"
                                        onChange={onChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="p-2">
                                <Col sm={4}>
                                    <Form.Label>Ticket address</Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Control
                                        autoComplete="off"
                                        required
                                        name="ticket_address"
                                        type="text"
                                        placeholder="Ds....."
                                        onChange={onChange}
                                        defaultValue=""
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="p-2">
                                <Col sm={4}>
                                    <Form.Label>Req'd confirmations</Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Control
                                        tabIndex={0}
                                        name="required_confirmations"
                                        defaultValue="1"
                                        onChange={onChange}
                                        as="select">
                                        {_.map([0, 1, 2, 3, 4], (n) => (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="p-2">
                                <Col sm={4}>
                                    <Form.Label>TX Fee</Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <FeeChooserInput
                                        defaultValue={40}
                                        onChange={onChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="p-2">
                                <Col sm={4}>
                                    <Form.Label>Ticket Fee</Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <FeeChooserInput
                                        defaultValue={40}
                                        onChange={onChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="vsp" title="VSP">
                            <fieldset disabled>
                                <Form.Group as={Row} className="p-2">
                                    <Col sm={4}>
                                        <Form.Label>Pool address</Form.Label>
                                    </Col>
                                    <Col sm={8}>
                                        <Form.Control
                                            autoComplete="off"
                                            required
                                            name="pool_address"
                                            type="text"
                                            placeholder="Ds....."
                                            onChange={onChange}
                                            defaultValue=""
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="p-2">
                                    <Col sm={4}>
                                        <Form.Label>Pool Fee</Form.Label>
                                    </Col>
                                    <Col sm={8}>
                                        <FeeChooserInput
                                            defaultValue={40}
                                            onChange={onChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                        </Tab>
                    </Tabs>
                </Form>
            </div>
        )
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            formIsValidated: true,
            isDirty: false,
        })
        // loadFormFields(this.state.formRef, this.props.endPointConfig)
        // this.props.onFormComplete(this.props.endPointConfig)
        return false
    }

    handleChange() {
        this.setState({
            isDirty: true,
        })
        if (!this.state.formRef.current.checkValidity()) {
            return
        }
    }
}

interface PurchaseTicketSettingsModalProps {
    showModal: boolean
    onHide: () => void
}

class PurchaseTicketSettingsModal extends React.Component<
    PurchaseTicketSettingsModalProps
> {
    render() {
        return (
            <Modal
                centered
                size="lg"
                show={this.props.showModal}
                onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket purchase settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PurchaseTicketSettingsForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.props.onHide}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
interface InternalState {
    formRef: React.RefObject<any>
    error: AppError | null
    formIsValidated: boolean
    isDirty: boolean
}

interface OwnProps {}

type Props = OwnProps

const mapStateToProps = (state: IApplicationState) => {
    return {
        // ...state.accounts
    }
}

export default connect(mapStateToProps)(PurchaseTicketSettingsModal)

const loadFormFields = (
    formRef: React.RefObject<any>,
    obj: PurchaseTicketsRequest
) => {
    const f = formRef.current

    // TODO
    // obj.setAccount(f.account.value)
    // obj.setPoolAddress(f.pool_address.value)
    // obj.setVotingAccount(f.voting_account.value)
    // obj.setVotingAddress(f.voting_address.value)
    // obj.setBalanceToMaintain(f.balance_to_maintain.value)
    // obj.setPassphrase("")
    return obj
}
