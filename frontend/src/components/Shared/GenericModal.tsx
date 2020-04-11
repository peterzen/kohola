import * as React from "react"
import _ from "lodash"

import { Modal, Button } from "react-bootstrap"

export default class GenericModal<P, S> extends React.Component<
    P & GenericModalProps,
    S
> {
    static defaultProps = {
        onEntered: () => {},
        onExit: () => {},
        footer: false,
    }

    render() {
        const props = _.omit(this.props, "title")
        return (
            <Modal
                {...props}
                centered
                onEntered={() => this.props.onEntered()}
                onExit={() => this.props.onExit()}
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.children}</Modal.Body>
                <Modal.Footer>
                    {this.props.footer === true && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={this.props.onHide}
                        >
                            Close
                        </Button>
                    )}
                    {this.props.footer != undefined && this.props.footer}
                </Modal.Footer>
            </Modal>
        )
    }
}

export interface GenericModalProps {
    title: string
    show: boolean
    onExit: () => void
    onHide: () => void
    onEntered: () => void
    footer?: boolean | JSX.Element
}
