import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart,
} from 'recharts';
import { IApplicationState, AppDispatch } from '../../store/types';
import { getMarketChartData, fetchExchangeChartData } from '../../features/app/exchangerateSlice';

class SparklineChart extends React.Component<Props>{
	render() {
		const data = this.props.getChartData()
		console.log("DATA", data)
		return (
			<div style={{ width: '100%', height: '80px' }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart height={150} data={data} margin={{
						top: 0, right: 0, left: 0, bottom: 0,
					}}>

						<Line
							type="monotone"
							dataKey="v"
							dot={false}
							stroke="#8884d8"
							strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		)
	}
	componentDidMount() {
		this.props.fetchExchangeChartData(this.props.currencyCode, this.props.days)
	}
}

interface OwnProps {
	currencyCode: string
	days: number
}

interface StateProps {
	getChartData: () => any[]
}

interface DispatchProps {
	fetchExchangeChartData: typeof fetchExchangeChartData
}

type Props = OwnProps & StateProps & DispatchProps

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
	return {
		getChartData: () => {
			return _.map(getMarketChartData(state, ownProps.currencyCode), d => { return { v: d } })
		}
	}
}

const mapDispatchToProps = {
	fetchExchangeChartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SparklineChart)
