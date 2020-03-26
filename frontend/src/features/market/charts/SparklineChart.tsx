import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
	LineChart, Line, ResponsiveContainer,
} from 'recharts';
import { IApplicationState } from '../../../store/types';
import { fetchExchangeChartData, getExchangeSparklineData } from '../marketSlice';
import { MarketChartDataPoint } from '../../../proto/dcrwalletgui_pb';

class SparklineChart extends React.Component<Props>{
	render() {
		const normalizedDatapoints =this.props.getChartData()
		return (
			<div style={{ width: '100%', height: '50px' }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={normalizedDatapoints} margin={{
						top: 0, right: 0, left: 0, bottom: 0,
					}}>
						<Line
							type="monotone"
							dataKey="exchangeRate"
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
	getChartData: () => MarketChartDataPoint.AsObject[]
}

interface DispatchProps {
	fetchExchangeChartData: typeof fetchExchangeChartData
}

type Props = OwnProps & StateProps & DispatchProps

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
	return {
		getChartData: () => {
			return getExchangeSparklineData(state, ownProps.currencyCode)
		}
	}
}

const mapDispatchToProps = {
	fetchExchangeChartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SparklineChart)
