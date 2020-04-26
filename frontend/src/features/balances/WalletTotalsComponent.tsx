import * as React from "react"

import { Row, Col, Container } from "react-bootstrap"
import { WalletTotals } from "../../middleware/models"
import { IApplicationState } from "../../store/types"
import { connect } from "react-redux"
import WalletTotalsCard from "./WalletTotalsCard"
import WalletAvailableBalanceCard from "./WalletAvailableBalanceCard"
import WalletCreditDebitCard from "./WalletCreditDebitCard"

class WalletTotalsComponent extends React.PureComponent<Props, {}> {
    render() {
        const totals = this.props.totals
        return (
            <Container fluid>
                <Row>
                    <Col className="pl-0 pr-0" xs="12" sm="6" md="3" lg="3">
                        <WalletAvailableBalanceCard
                            totals={totals}
                            loading={this.props.loading}
                        />
                    </Col>
                    <Col
                        className="pr-0 pl-0 pt-3 pl-sm-3 pt-sm-0 pl-md-3 pt-md-0"
                        xs="12"
                        sm="6"
                        md="4"
                        lg="3"
                    >
                        <WalletTotalsCard
                            totals={totals}
                            loading={this.props.loading}
                        />
                    </Col>
                    <Col
                        className="pr-0 pl-0 pt-3 pl-sm-0 pt-sm-3 pl-md-3 pt-md-0"
                        sm="12"
                        md="5"
                        lg="6"
                    >
                        <WalletCreditDebitCard
                            totals={totals}
                            loading={this.props.loading}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

interface OwnProps {
    totals: WalletTotals
}

interface StateProps {
    loading: boolean
}

type Props = OwnProps & StateProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    return {
        loading: state.accounts.getAccountsAttempting,
    }
}

export default connect(mapStateToProps)(WalletTotalsComponent)
