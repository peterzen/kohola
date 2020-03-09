import * as React from 'react'
import _ from 'lodash'

import { Button, Modal, Form } from 'react-bootstrap'


interface Props {
	show: boolean
	dialogTitle: string
	cancelButtonLabel: string
	okButtonLabel: string
	placeholder?: string
	inputLabel: string
	onSelect: (result: string) => void
}

export const stringInputDialog = (
	title: string = "",
	inputLabel: string = "",
	okButtonLabel: string = "OK",
	cancelButtonLabel: string = "Cancel",
	callback: (result: string) => void
) => {

	const props = {
		show: true,
		dialogTitle: title,
		okButtonLabel: okButtonLabel,
		cancelButtonLabel: cancelButtonLabel,
		inputLabel: inputLabel,
		onSelect: callback,
	}

	return StringInputDialog(props)
}

const StringInputDialog = (props: Props) => {

	const ref = React.useRef()

	const hide = () => {
		props.show = false
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		hide()
		props.onSelect(ref.current?.value)
	}


	return (
		<Modal
			centered
			show={props.show}
		>
			<Form
				onSubmit={onSubmit}>
				<Modal.Header >
					<Modal.Title>
						{props.dialogTitle}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="p-4">
						<Form.Group>
							<Form.Label>{props.inputLabel}</Form.Label>
							<Form.Control
								ref={() => ref}
								autoComplete="off"
								type="text"
								placeholder={props.placeholder}
								defaultValue="" />
						</Form.Group>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="text-right">
						<Button variant="secondary">
							{props.cancelButtonLabel}
						</Button>
						<Button
							type="submit"
							variant="primary"
						>
							{props.okButtonLabel}
						</Button>
					</div>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}
