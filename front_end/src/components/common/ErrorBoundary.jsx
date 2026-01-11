import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="p-10 bg-red-50 min-h-screen flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong.</h1>
                    <p className="text-gray-700 mb-6 m-auto max-w-lg">
                        The application encountered an unexpected error. Please show this to the developer.
                    </p>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-red-100 max-w-3xl w-full overflow-auto text-left">
                        <p className="font-bold text-red-500 mb-2">Error: {this.state.error?.toString()}</p>
                        <pre className="text-xs text-gray-500 font-mono whitespace-pre-wrap">
                            {this.state.errorInfo?.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
