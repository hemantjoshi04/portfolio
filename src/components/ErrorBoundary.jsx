import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-6">
          <div className="max-w-md w-full bg-white p-10 shadow-sm border border-[#E5E0D8] text-center">
            <div className="mb-6 flex justify-center text-[#D4AF37]">
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>error</span>
            </div>
            <h1 className="font-playfair text-3xl text-[#1c1b1b] mb-4">Application Error</h1>
            <p className="font-montserrat text-[#666666] mb-8 leading-relaxed">
              Something went wrong while loading the application. We apologize for the inconvenience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="bg-[#1c1b1b] text-white px-6 py-3 font-montserrat uppercase text-[10px] tracking-widest hover:bg-[#D4AF37] transition-colors"
              >
                Refresh Page
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-transparent text-[#1c1b1b] border border-[#1c1b1b] px-6 py-3 font-montserrat uppercase text-[10px] tracking-widest hover:bg-[#F5F5F5] transition-colors"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
