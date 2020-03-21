import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { IApplicationState } from '../../store/types';
import { fetchExchangeChartData, getExchangeSparklineData } from '../../features/app/exchangerateSlice';
import { MarketChartDataPoint } from '../../proto/dcrwalletgui_pb';

class ChartdataProvider extends React.Component<Props>{
	render() {
		const childrenWithProps = React.Children.map(this.props.children, child =>
			React.cloneElement(child, { data: this.props.getChartData() })
		)
debugger
		return <div>{childrenWithProps}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChartdataProvider)

