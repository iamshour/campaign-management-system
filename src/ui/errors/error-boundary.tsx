import { Component } from "react"

import DisplayError from "./display-error"

interface Props {
	children: React.ReactNode
	fallback?: React.ReactNode
	className?: string
}

interface State {
	hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	}

	public static getDerivedStateFromError(): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo)
	}

	// Clearing Console when ErrorBoundary Component isn't mounted any more (ex. When used In Portals)
	public componentWillUnmount(): void {
		console.clear()
	}

	public render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<DisplayError
						error={{ data: { message: "Component Render Error", statusCode: 500 }, status: 500 }}
						className={this.props.className}
						showReloadButton
					/>
				)
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
