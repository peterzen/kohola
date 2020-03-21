import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteChildrenProps } from "react-router-dom";
import _ from "lodash";

// @ts-ignore
import Fade from 'react-reveal/Fade';
import { Card, Row, Col } from "react-bootstrap";
import { IApplicationState } from "../store/types";
import ExchangeRateChart from "../features/market/charts/ExchangeRateChart";
import { FiatAmount } from "../components/Shared/Amount";
import { AltCurrencyRates } from "../proto/dcrwalletgui_pb";
import { getCurrentExchangeRate } from "../features/market/marketSlice";

// @TODO pull this out of AppConfig
const altCurrencies = ["btc", "usd", "eur"]

class Market extends React.PureComponent<Props> {

	render() {
		return (
			<div>
				<Row>
					<Col sm={6}>

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
										<ExchangeRateChart currencyCode={currencyCode} days={14} />
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

