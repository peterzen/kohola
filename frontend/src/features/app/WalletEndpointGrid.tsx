import * as React from 'react';
import _ from 'lodash';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import Fade from 'react-reveal/Fade';

import { GRPCEndpoint } from '../../proto/dcrwalletgui_pb';

export default class WalletEndpointGrid extends React.Component<Props> {
	render() {
		return (
			<Fade fade cascade>
				<Row>
					{this.props.endpoints.map((endpoint) => (
						<Col sm={4} key={endpoint.getId()} className="mb-4">
							<Card
								className="clickable"
								onClick={() => this.onSelect(endpoint)}>
								<Card.Header>
									{endpoint.getLabel()}
								</Card.Header>
								<div>
									{this.props.editable && (
										<Card.Footer>
											<span className="float-right">
												<Button
													variant="secondary"
													onClick={() => this.props.onEdit(endpoint)}
												>
													<FontAwesomeIcon icon={faCog} /> Edit
												</Button>
											</span>
											<Button
												variant="danger"
												onClick={() => this.props.onDelete(endpoint)}
											>
												<FontAwesomeIcon icon={faTrash} /> Delete
											</Button>
										</Card.Footer>
									)}
								</div>
							</Card>
						</Col>
					))}
					<Col sm={4} className="mb-4">
						{this.props.editable && (
							<Card
								className="clickable"
								onClick={() => this.props.onAdd()}>
								<Card.Header>
									<FontAwesomeIcon icon={faPlus} /> Add endpoint...
								</Card.Header>
							</Card>
						)}
					</Col>
				</Row>
			</Fade>
		)
	}
	onSelect(endpoint: GRPCEndpoint) {
		if (this.props.editable == false) {
			this.props.onSelect(endpoint)
		}
	}
}


interface Props {
	endpoints: GRPCEndpoint[]
	editable: boolean
	onSelect: (endpoint: GRPCEndpoint) => void
	onDelete: (endpoint: GRPCEndpoint) => void
	onEdit: (endpoint: GRPCEndpoint) => void
	onAdd: () => void
}
