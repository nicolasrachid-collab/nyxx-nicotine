import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Aqui você pode enviar o erro para um serviço de monitoramento
    // Exemplo: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-7 md:px-14">
          <div className="max-w-2xl w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-[38px] font-bold tracking-tight mb-4 text-black line-clamp-2">
                Ops! Algo deu errado
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Ocorreu um erro inesperado. Por favor, tente recarregar a página.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-lg font-bold text-red-900 mb-3">Detalhes do Erro (Dev)</h2>
                <p className="text-sm font-mono text-red-800 mb-2">
                  <strong>Erro:</strong> {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="text-sm font-semibold text-red-900 cursor-pointer mb-2">
                      Stack Trace
                    </summary>
                    <pre className="text-xs text-red-700 bg-red-100 p-4 rounded overflow-auto max-h-64">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-200 text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
              >
                Recarregar Página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
