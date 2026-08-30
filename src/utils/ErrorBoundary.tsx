import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '../atoms/Button'

export interface ErrorBoundaryProps {
  children: ReactNode
  /**
   * Replaces the default fallback. Receives the error and a reset callback, so
   * an experiment can render its own recovery UI without reimplementing the
   * boundary.
   */
  fallback?: (error: Error, reset: () => void) => ReactNode
  /** Called when an error is caught, for reporting to an external service. */
  onError?: (error: Error, info: ErrorInfo) => void
}

interface ErrorBoundaryState {
  error: Error | null
}

/**
 * Catches render errors below it and shows a recoverable fallback.
 *
 * **Filed under `utils/`, not `organisms/`.** It was previously an organism,
 * but it is not a region of the interface: it renders nothing of its own in
 * the ordinary case, and its job is control flow. Atomic design classifies UI;
 * a component with no UI in its normal state does not belong in the hierarchy,
 * and putting it there made "organism" mean two different things.
 *
 * Still a class component: `getDerivedStateFromError` and `componentDidCatch`
 * have no hook equivalent, and React provides no other way to catch a render
 * error.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
    this.props.onError?.(error, info)
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    if (this.props.fallback) return this.props.fallback(error, this.reset)

    return (
      <div
        role="alert"
        className="flex items-center justify-center h-screen bg-background text-foreground"
      >
        <div className="flex flex-col gap-4 max-w-md w-full text-center p-8">
          <p className="type-h4 text-ink-title">Something went wrong</p>
          <p className="type-code text-ink-body">{error.message}</p>
          <Button onClick={this.reset} className="self-center">Try again</Button>
        </div>
      </div>
    )
  }
}
