import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRecycle } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"

export default class ErrorBoundary extends React.Component {
    state = {
        error: null,
        hasError: false,
        errorInfo: null,
    }

    static getDerivedStateFromError(_error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error(error, errorInfo)
        this.setState({
            error: error,
            errorInfo: errorInfo,
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <h3>{this.state.error}</h3>
                    <pre>{this.state.errorInfo}</pre>
                    <Button
                        variant="secondary"
                        onClick={() => this.setState({ hasError: false })}>
                        <FontAwesomeIcon icon={faRecycle} /> Try again
                    </Button>
                </div>
            )
        }

        return this.props.children
    }
}
