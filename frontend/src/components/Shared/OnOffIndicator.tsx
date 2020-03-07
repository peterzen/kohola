import * as React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

const OnOffIndicator = (props: Props) => {

	const size = props.size || "1x"

	return (
		<span>
			{props.status === true && <FontAwesomeIcon icon={faCircle} className="text-success" size={size} />}
			{props.status === false && <FontAwesomeIcon icon={faCircle} className="text-danger" size={size} />}
			{props.status === undefined && <FontAwesomeIcon icon={faCircle} className="text-secondary" size={size} />}
		</span>
	)
}

interface Props {
	status: boolean | undefined
	size?: SizeProp
}


export default OnOffIndicator
