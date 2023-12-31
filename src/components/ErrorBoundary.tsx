import React, { ErrorInfo } from 'react'

interface Props {
  children: React.ReactNode
}
class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props)
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            display: 'grid',
            placeContent: 'center',
            placeItems: 'center',
            height: '100%',
          }}>
          <h2>Ahoy, turbulent waters!</h2>
          <blockquote>
            {`"We cannot direct the wind, but we can adjust the sails."`}
          </blockquote>
          <button
            type='button'
            onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
