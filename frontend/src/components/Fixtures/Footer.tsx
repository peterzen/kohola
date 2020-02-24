
import * as React from 'react';
import ConnectionStatus from './ConnectionStatus';
import BestBlockComponent from '../../features/networkinfo/BestBlockComponent';

import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
	return (
		<footer className="footer">
			<Container fluid>
				<Row>
					<Col>
						<ConnectionStatus />
					</Col>
					<Col className="text-right">
						<BestBlockComponent />
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
