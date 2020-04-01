import React from "react"

import { Row, Col, InputGroup } from "react-bootstrap"
// @ts-ignore
import RangeSlider from 'react-bootstrap-range-slider';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

interface IFeeChooserInputProps {
	defaultValue: number
	value?: number
	min?: number
	max?: number
	step?: number
	tabIndex?:number
	onChange: (value: number) => void
}

export default class FeeChooserInput extends React.Component<IFeeChooserInputProps>{
	render() {
		return (
			<Row>
				<Col xs={8}>
					<InputGroup >
						<RangeSlider
							min={0}
							max={100}
							step={1}
							variant="secondary"
							tooltip="off"
							size="sm"
							tabIndex={this.props.tabIndex}
							className="pr-3"
							title="fee rate"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								this.props.onChange(parseInt(e.target.value))}
						/>
						<InputGroup.Append>
							<InputGroup.Text>
								<small className="text-muted">40 atoms/B</small>
							</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup>
				</Col>
				<Col sm={4}>
				</Col>
			</Row>
		)
	}
}
