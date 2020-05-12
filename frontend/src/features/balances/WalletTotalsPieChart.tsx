import React, { PureComponent } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { WalletTotals } from "../../middleware/models"

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill="#ffffff"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central">
            {percent > 0 ? `${(percent * 100).toFixed(0)}%` : ""}
        </text>
    )
}

export default class WalletTotalsPieChart extends PureComponent<OwnProps> {
    render() {
        const totals = this.props.totals
        const totalsPieData = [
            { name: "spendable", value: totals.spendable },
            { name: "unconfirmed", value: totals.unconfirmed },
            {
                name: "immature",
                value: totals.immature_coinbase + totals.immature_stake,
            },
            { name: "votingauth", value: totals.votingauth },
        ]

        return (
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={totalsPieData}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        isAnimationActive={false}
                        dataKey="value" // silence a warning -- https://github.com/recharts/recharts/issues/1410
                    >
                        {totalsPieData.map((entry, index) => {
                            return (
                                <Cell
                                    key={`cell-${index}`}
                                    className={`spendable-${entry.name}`}
                                />
                            )
                        })}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        )
    }
}

interface OwnProps {
    totals: WalletTotals
}
