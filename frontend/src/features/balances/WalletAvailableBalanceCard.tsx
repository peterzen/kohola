import React, { PureComponent } from "react"
import { WalletTotals } from "../../middleware/models"
import ComponentPlaceHolder from "../../components/Shared/ComponentPlaceholder"
import { Amount, FiatAmount } from "../../components/Shared/Amount"

export default class WalletAvailableBalanceCard extends PureComponent<OwnProps> {
    
    render() {
        const totals = this.props.totals
        return (
            <ComponentPlaceHolder
                type="text"
                rows={3}
                ready={!this.props.loading}
            >
                <div>
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
        )
    }
}

interface OwnProps {
    totals: WalletTotals
    loading: boolean
}
