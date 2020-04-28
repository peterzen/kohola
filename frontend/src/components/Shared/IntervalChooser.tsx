import * as React from "react"

import { Dropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { SelectedDropdownItemLabel } from "./shared"

export interface ChartTimeframe {
    days: number
    name: string
    windowSize: string
}


export const timeframes: ChartTimeframe[] = [
    { days: 1, name: "24 hours", windowSize: "1h" },
    { days: 3, name: "3 days", windowSize: "6h" },
    { days: 7, name: "1 week", windowSize: "4h" },
    { days: 31, name: "1 month", windowSize: "3d" },
    { days: 365, name: "1 year", windowSize: "7d" },
]

export const defaultTimeframe = timeframes[4]

export default class IntervalChooser extends React.Component<OwnProps> {
    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="timeframe-dropdown">
                    <FontAwesomeIcon icon={faCalendar} /> {this.props.selectedValue.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.props.timeframes.map((item) => (
                        <Dropdown.Item
                            key={`interval-${item.days}`}
                            onClick={() => this.props.onChange(item)}
                        >
                            <SelectedDropdownItemLabel
                                isSelected={this.props.selectedValue == item}
                            >
                                {item.name}
                            </SelectedDropdownItemLabel>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

interface OwnProps {
    onChange: (interval: ChartTimeframe) => void
    timeframes: ChartTimeframe[]
    selectedValue: ChartTimeframe
}
