import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
	LineChart, Line, ResponsiveContainer, XAxis, YAxis,
} from 'recharts';
import { IApplicationState } from '../../store/types';
import { getMarketChartData, fetchExchangeChartData, datapointsAsPOJO, normalizeDatapoints, getExchangeSparklineData } from '../../features/app/exchangerateSlice';
import { MarketChartDataPoint } from '../../proto/dcrwalletgui_pb';

class ExchangeRateChart extends React.Component<Props>{
	render() {
		const normalizedDatapoints = this.props.getChartData()
		return (
			<div style={{ width: '100%', height: '250px' }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={normalizedDatapoints} margin={{
						top: 0, right: 0, left: 0, bottom: 0,
					}}>
						<XAxis dataKey="timestamp" />
						<YAxis dataKey="exchangeRate"/>
						<Line
							type="monotone"
							dataKey="exchangeRate"
							dot={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRateChart)

