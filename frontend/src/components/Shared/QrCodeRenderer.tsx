import React from "react"
import { QRCode } from "react-qr-svg"

export default class QrCodeRenderer extends React.Component<
    IQrCodeRendererProps
> {
    render() {
        return (
            <QRCode
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{ width: 150 }}
                value={this.props.value}
            />
        )
    }
}

interface IQrCodeRendererProps {
    value: string
    level?: "L" // QR Error correction level
    bgColor?: "#FFFFFF" // Color of the bright squares
    fgColor?: "#000000" // Color of the dark squares
    cellClassPrefix?: "" // Prefix of the CSS classes, if not specified, bgColor and fgColor are ignored
}
