import React, { PureComponent } from "react"
import { WalletTotals } from "../../middleware/models"
import { Row, Col, Card } from "react-bootstrap"
import ComponentPlaceHolder from "../../components/Shared/ComponentPlaceholder"
import { Amount, FiatAmount } from "../../components/Shared/Amount"
import SparklineChart from "../market/charts/SparklineChart"

export default class WalletAvailableBalanceCard extends PureComponent<OwnProps> {
    render() {
        const totals = this.props.totals
        return (
            <Card className="h-100">
                <Card.Body>
                    <Row>
                        <Col>
                            <ComponentPlaceHolder
                                type="text"
                                rows={3}
                                ready={!this.props.loading}
                            >
                                <div className="current-balance-container">
                                    <div className="text-muted">
                                        Available balance
                                    </div>
                                    <h1 className="mb-0">
                                        <Amount
                                            amount={totals.total}
                                            showCurrency
                                            rounding={2}
                                        />
                                    </h1>
                                    <h4 className="text-muted mb-2">
                                        <FiatAmount
                                            amount={totals.total}
                                            showCurrency
                                            currency="USD"
                                        />
                                    </h4>
                                </div>
                            </ComponentPlaceHolder>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SparklineChart
                                currencyCodes={["eur", "btc"]}
                                days={14}
                                height={90}
                            />
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