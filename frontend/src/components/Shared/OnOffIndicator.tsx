import * as React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { SizeProp } from "@fortawesome/fontawesome-svg-core"
// @ts-ignore
import Fade from "react-reveal/Fade"

const OnOffIndicator = (props: Props) => {
    const size = props.size || "1x"

    return (
        <Fade fade>
            <span>
                {props.status === true && (
                    <span>
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-success"
                            size={size}
                        />{" "}
                        {props.onMessage}
                    </span>
                )}
                {props.status === false && (
                    <span>
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-danger"
                            size={size}
                        />{" "}
                        {props.offMessage}
                    </span>
                )}
                {props.status === undefined && (
                    <span>
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-secondary"
                            size={size}
                        />{" "}
                        {props.undefMessage}
                    </span>
                )}
            </span>
        </Fade>
    )
}

interface Props {
    status: boolean | undefined
    onMessage?: string
    offMessage?: string
    undefMessage?: string
    size?: SizeProp
}

export default OnOffIndicator
