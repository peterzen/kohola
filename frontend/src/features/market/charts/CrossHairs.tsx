// @ts-nocheck
import React from "react"
import _ from "lodash"

export class CrossHairs extends React.Component<Props> {
    render() {
        const { x, y } = this.props
        const style = { pointerEvents: "none", stroke: "#ccc" }
        if (!_.isNull(x) && !_.isNull(y)) {
            return (
                <g>
                    <line
                        style={style}
                        x1={0}
                        y1={y}
                        x2={this.props.width}
                        y2={y}
                    />
                    <line
                        style={style}
                        x1={x}
                        y1={0}
                        x2={x}
                        y2={this.props.height}
                    />
                </g>
            )
        } else {
            return <g />
        }
    }
}

interface Props {
    x: number
    y: number
}
