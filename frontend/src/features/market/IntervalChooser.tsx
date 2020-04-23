import * as React from "react"

import { Dropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"

export interface ChartTimeframe {
    days: number
    name: string
}

export const timeframes: ChartTimeframe[] = [
    { days: 1, name: "24 hours" },
    { days: 3, name: "3 days" },
    { days: 7, name: "1 week" },
    { days: 31, name: "1 month" },
]

export const defaultTimeframe = timeframes[2]

export default class IntervalChooser extends React.Component<OwnProps> {
    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="timeframe-dropdown">
                    <FontAwesomeIcon icon={faCalendar} /> {this.props.selectedValue.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {timeframes.map((item) => (
                        <Dropdown.Item
                            key={`interval-${item.days}`}
                            onClick={() => this.props.onChange(item)}
                        >
                            {item.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

interface OwnProps {
    selectedValue: ChartTimeframe
    onChange: (interval: ChartTimeframe) => void
}
