import React, { PureComponent } from "react"
import { WalletTotals } from "../../middleware/models"
import { Card } from "react-bootstrap"
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    ReferenceLine,
} from "recharts"

const mockData = [
    { name: "04/17/2020", debit: -4000, credit: 2400, amt: 2400 },
    { name: "04/18/2020", debit: -3000, credit: 1398, amt: 2210 },
    { name: "04/19/2020", debit: 0, credit: 9800, amt: 2290 },
    { name: "04/20/2020", debit: -2780, credit: 3908, amt: 0 },
    { name: "04/21/2020", debit: -1890, credit: 4800, amt: 2181 },
    { name: "04/22/2020", debit: -2390, credit: 3800, amt: 2500 },
    { name: "04/23/2020", debit: -3490, credit: 4300, amt: 0 },
]

export default class WalletCreditDebitCard extends PureComponent<OwnProps> {
    render() {
        const totals = this.props.totals
        return (
            <Card className="h-100">
                <Card.Body className="pb-0 pl-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={mockData}
                            margin={{
                                top: 10,
                                right: 5,
                                left: 5,
                                bottom: 10,
                            }}
                        >
                            <ReferenceLine y={0} stroke="#000" />
                            <Bar dataKey="credit" fill="#00c49f" />
                            <Bar dataKey="debit" fill="#ff9800" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
        )
    }
}

interface OwnProps {
    totals: WalletTotals
    loading: boolean
}
