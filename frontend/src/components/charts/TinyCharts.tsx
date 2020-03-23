import React from 'react';
import {
	LineChart, Line, ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import { IChartdataTimelineItem } from '../../helpers/helpers';
import _ from 'lodash';

interface OwnProps {
	dataKey: string
	data: IChartdataTimelineItem[]
}


export class SparklineChart extends React.Component<OwnProps> {
	render() {
		return (
			<div style={{ width: '100%', height: 40 }} className="pr-4 mb-4">
				<ResponsiveContainer>
					<LineChart width={300} height={100} data={this.props.data}>
						<Line
							type="monotone"
							dataKey={this.props.dataKey}
							dot={false}
							stroke="#8884d8"
							strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		)
	}
}


export class TinyBarChart extends React.Component<OwnProps> {
	render() {
		const data = this.props.data
		// massage 0 values into 1 to make the chart easier to read
		// const data = _.map(this.props.data, d => { d.value = d.value || 1; return d })
		return (
			<div style={{ width: '100%', height: 40 }} className="pr-4 mb-4">
				<ResponsiveContainer>
					<BarChart width={300} height={100} data={data}>
						<Bar
							dataKey={this.props.dataKey}
							fill="#8884d8"
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		)
	}
}


