import React from "react"

import { Row, Col, InputGroup } from "react-bootstrap"
// @ts-ignore
// import RangeSlider from "react-bootstrap-range-slider"
import Slider from "react-input-slider"

import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faEquals } from "@fortawesome/free-solid-svg-icons"
import { Amount } from "../../components/Shared/Amount"


export default class FeeChooserInput extends React.Component<OwnProps, InternalState> {
    constructor(props: OwnProps) {
        super(props)
        this.state = {
            feeRateValue: props.value,
            feeEstimate: props.txSizeEstimate ? this.calculateFee(props.value, props.txSizeEstimate) : 0,
        }
    }
    render() {
        return (
            <Row>
                <Col xs={8}>
                    <InputGroup>
                        <Slider
                            axis="x"
                            xmin={0}
                            xmax={1000}
                            xstep={100}
                            x={this.state.feeRateValue}
                            onChange={(values: { x: number, y: number }) => this.onChange(values.x)}
                        />
                        {/* <RangeSlider
                            ref={this.props.inputRef}
                            min={0}
                            max={1000}
                            step={100}
                            variant="secondary"
                            tooltip="off"
                            size="sm"
                            tabIndex={this.props.tabIndex}
                            className="pr-3"
                            title="Fee rate"
                            value={this.state.feeRateValue}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => this.onChange(parseInt(e.target.value))}
                        /> */}
                    </InputGroup>
                    <span className="text-muted form-text">
                        {`${this.state.feeRateValue} atoms/byte `}
                        <FontAwesomeIcon icon={faTimes} />
                        {` ${this.props.txSizeEstimate} bytes `}
                        <FontAwesomeIcon icon={faEquals} />
                        {" "}
                        <Amount amount={this.state.feeEstimate} rounding={8} />
                    </span>

                </Col>
                <Col sm={4}>
                </Col>
            </Row>
        )
    }
    onChange(feeRateValue: number) {
        this.setState({
            feeRateValue: feeRateValue,
            feeEstimate: this.calculateFee(feeRateValue, this.props.txSizeEstimate)
        })
        this.props.onChange(feeRateValue)
    }
    calculateFee(feeRate: number, txSize: number) {
        return feeRate * txSize
    }
}

interface OwnProps {
    inputRef: React.RefObject<any>
    value: number
    min?: number
    max?: number
    step?: number
    tabIndex?: number
    txSizeEstimate: number
    onChange: (value: number) => void
}

interface InternalState {
    feeRateValue: number
    feeEstimate: number
}
