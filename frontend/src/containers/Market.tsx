import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteChildrenProps } from "react-router-dom";
import _ from "lodash";

// @ts-ignore
import Fade from 'react-reveal/Fade';
import { Card, Row, Col } from "react-bootstrap";
import SparklineChart from "../components/charts/SparklineChart";
import { IApplicationState } from "../store/types";


class Market extends React.PureComponent<Props> {

	render() {
		return (
			<Row>
				<Col sm={4}>
					<Card>
						<Card.Header>
							<Card.Title>DCR-BTC</Card.Title>
						</Card.Header>
						<Card.Body>
							<SparklineChart currencyCode="btc" days={7} />
						</Card.Body>
					</Card>
				</Col>
				<Col sm={4}>
					<Card>
						<Card.Header>
							<Card.Title>DCR-USD</Card.Title>
						</Card.Header>
						<Card.Body>
							<SparklineChart currencyCode="usd" days={7} />
						</Card.Body>
					</Card>
				</Col>
				<Col sm={4}>
					<Card>
						<Card.Header>
							<Card.Title>DCR-EUR</Card.Title>
						</Card.Header>
						<Card.Body>
							<SparklineChart currencyCode="eur" days={7} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		)
	}
}

interface OwnProps {

}

interface DispatchProps {
}

type Props = OwnProps & DispatchProps & RouteChildrenProps<any>


const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {

	}
}

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Market))
