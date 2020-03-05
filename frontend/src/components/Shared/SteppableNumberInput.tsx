import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface ISteppableNumberInputProps {
	name: string
	max: number
	className: string
	placeholder: string
	onChange: () => void
}

export const SteppableNumberInput = (props: ISteppableNumberInputProps) => {

	const ref = React.useRef<HTMLInputElement>()
	const input = ref.current!;

	const stepDown = () => {
		parseInt(input.value) > 0 && input.stepDown()
		props.onChange()
	}

	const stepUp = () => {
		parseInt(input.value) < props.max && input.stepUp()
		props.onChange()
	}

	return (
		<>
			<InputGroup {...props}>
				<InputGroup.Prepend>
					<Button
						variant="outline-secondary"
						tabIndex={-1}
						onClick={stepDown}>
						<FontAwesomeIcon icon={faMinus} />
					</Button>
				</InputGroup.Prepend>
				<Form.Control
					name={props.name}
					type="number"
					size="lg"
					defaultValue={0}
					ref={ref as React.RefObject<any>} {...props} />
				<InputGroup.Append>
					<Button
						tabIndex={-1}
						variant="outline-secondary"
						onClick={stepUp}>
						<FontAwesomeIcon icon={faPlus} />
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</>
	)
}
