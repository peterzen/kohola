import React, { PureComponent } from "react"
import { WalletTotals } from "../../middleware/models"
import { Row, Col, Card } from "react-bootstrap"
import ComponentPlaceHolder from "../../components/Shared/ComponentPlaceholder"
import WalletTotalsPieChart from "./WalletTotalsPieChart"
import { Amount } from "../../components/Shared/Amount"

interface IValueRowProps {
    amount: number
    total: number
    label: string
    variant: string
}

const ValueRow = (props: IValueRowProps) => {
    return (
        <Col className="p-0">
            <Row>
                <Col>
                    <span
                        className={`indicator-circle spendable-${props.variant}`}
                    />
                    <div className="text-muted text-nowrap">
                        {props.label}
                        <h5 className="ml-3 mb-1">
                            <Amount
                                amount={props.amount}
                                rounding={2}
                                showCurrency
                            />
                        </h5>
                    </div>
                </Col>
            </Row>
        </Col>
    )
}

export default class WalletTotalsCard extends PureComponent<OwnProps> {
    render() {
        const totals = this.props.totals
        return (
            <Card className="h-100">
                <Card.Body className="pb-0">
                    <Row>
                        <Col xs="6" sm="6" md="7" lg="6">
                            <ComponentPlaceHolder
                                type="text"
                                rows={8}
                                ready={!this.props.loading}>
                                <div>
                                    <ValueRow
                                        label="Spendable"
                                        amount={totals.spendable}
                                        total={totals.total}
                                        variant="spendable"
                                    />

                                    <ValueRow
                                        label="Unconfirmed"
                                        amount={totals.unconfirmed}
                                        total={totals.total}
                                        variant="unconfirmed"
                                    />

                                    <ValueRow
                                        label="Immature"
                                        amount={
                                            totals.immature_coinbase +
                                            totals.immature_stake
                                        }
                                        total={totals.total}
                                        variant="immature"
                                    />

                                    <ValueRow
                                        label="Voting authority"
                                        amount={totals.votingauth}
                                        total={totals.total}
                                        variant="votingauth"
                                    />
                                </div>
                            </ComponentPlaceHolder>
                        </Col>
                        <Col className="p-0" xs="6" sm="6" md="5" lg="6">
                            <WalletTotalsPieChart totals={totals} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

interface OwnProps {
    totals: WalletTotals
    loading: boolean
}
