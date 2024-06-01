import { Component, lazy } from "react"

const DisplayError = lazy(() => import("./display-error"))

interface Props {
	children: React.ReactNode
	className?: string
	fallback?: React.ReactNode
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
		// eslint-disable-next-line no-console
		console.error("Uncaught error:", error, errorInfo)
	}

	// Clearing Console when ErrorBoundary Component isn't mounted any more (ex. When used In Portals)
	public componentWillUnmount(): void {
		// eslint-disable-next-line no-console
		console.clear()
	}

	public render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<DisplayError
						className={this.props.className}
						error={{ data: { message: "Component Render Error", statusCode: 500 }, status: 500 }}
						showReloadButton
					/>
				)
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
