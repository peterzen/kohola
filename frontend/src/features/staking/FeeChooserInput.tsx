import React from "react"

import { Row, Col, InputGroup } from "react-bootstrap"
// @ts-ignore
import RangeSlider from 'react-bootstrap-range-slider';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

interface IFeeChooserInputProps {
	name: string
	defaultValue: number
	min?: number
	max?: number
	step?: number
	onChange: (value: number) => void
}

const FeeChooserInput = (props: IFeeChooserInputProps) => {
	return (
		<Row>
			<Col xs={8}>
				<InputGroup >
					<RangeSlider
						min={0}
						max={40}
						step={0.1}
						variant="secondary"
						tooltip="off"
						size="sm"
						defaultValue={props.defaultValue}
						className="pr-3"
						name={props.name}
						title="fee rate"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							props.onChange(parseInt(e.target.value))}
					/>
					<InputGroup.Append>
					</InputGroup.Append>
				</InputGroup>
			</Col>
			<Col sm={4}>
				<small className="text-muted">40 atoms/B</small>
			</Col>
		</Row>
	)
}

export default FeeChooserInput
