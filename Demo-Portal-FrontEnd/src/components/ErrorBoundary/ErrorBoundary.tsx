import { Component, ErrorInfo, ReactNode } from 'react'

import UnexpectedError from 'src/components/UnexpectedError/UnexpectedError'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }
    public static getDerivedStateFromError(_: Error): State {
        return {
            hasError: true
        }
    }
    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        if (import.meta.env.VITE_APP_ENV !== 'PRODUCTION') {
            console.error('Uncaught Error: ', error, errorInfo)
        }
    }

    public render() {
        if (this.state.hasError) {
            return <UnexpectedError />
        }
        return this.props.children
    }

}

export default ErrorBoundary