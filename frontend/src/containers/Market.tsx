import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteChildrenProps } from "react-router-dom";
import _ from "lodash";

// @ts-ignore
import Fade from 'react-reveal/Fade';
import { Card, Row, Col, Dropdown } from "react-bootstrap";
import { IApplicationState } from "../store/types";
import ExchangeRateChart from "../features/market/charts/ExchangeRateChart";
import { FiatAmount } from "../components/Shared/Amount";
import { AltCurrencyRates } from "../proto/dcrwalletgui_pb";
import { getCurrentExchangeRate } from "../features/market/marketSlice";

// @TODO pull this out of AppConfig
const altCurrencies = ["btc", "usd", "eur"]
const altTimeFrameDays = [
	{ days: 1, name: "24 hours" },
	{ days: 3, name: "3 days" },
	{ days: 7, name: "1 week" },
	{ days: 31, name: "1 month" }
]

class Market extends React.PureComponent<Props, InternalState> {

	constructor(props: Props) {
		super(props)
		this.state = {
			days: 1
		}
	}

	render() {
		return (
			<div>
				<Row>
					<Col sm={12}>
						<div className="float-right">
							<Dropdown>
								<Dropdown.Toggle variant="secondary" id="timeframe-dropdown">
									{_.find(altTimeFrameDays, { 'days': this.state.days})?.name}
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{altTimeFrameDays.map(item => (
										<Dropdown.Item
											onClick={() => this.setState({ days: item.days })}>
											{item.name}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</Col>
				</Row>
				<Row>
					{altCurrencies.map(currencyCode => (
						<Col sm={6} key={currencyCode}>
							<div className="mb-3" >
								<Card key={currencyCode}>
									<Card.Header>
										<Card.Title className="mb-0">
											<span className="float-right">
												{this.props.getCurrentExchangeRate(currencyCode)?.toFixed(6)}
											</span>
											DCR-{currencyCode.toUpperCase()}
										</Card.Title>
									</Card.Header>
									<Card.Body>
										<ExchangeRateChart currencyCode={currencyCode} days={this.state.days} />
									</Card.Body>
								</Card>
							</div>
						</Col>
					))}
				</Row>
			</div>
		)
	}
}

interface InternalState {
	days: number
}

interface OwnProps {
	currentRates: AltCurrencyRates
	getCurrentExchangeRate: (currencyCode: string) => number
}

interface DispatchProps {
}

type Props = OwnProps & DispatchProps & RouteChildrenProps<any>


const mapStateToProps = (state: IApplicationState) => {
	return {
		currentRates: state.market.currentRates,
		getCurrentExchangeRate: (currencyCode: string) => {
			const r = getCurrentExchangeRate(state, currencyCode)
			return r
		}
	}
}

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Market))

