import React from 'react'

interface LoadingFallbackProps {
  minHeight?: string
  spinnerSize?: string
}

/**
 * Componente de carga que muestra un spinner animado
 * Se utiliza como fallback en componentes lazy-loaded
 */
const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  minHeight = 'min-h-screen',
  spinnerSize = 'h-12 w-12',
}) => (
  <div className={`flex items-center justify-center ${minHeight}`}>
    <div
      className={`animate-spin rounded-full ${spinnerSize} border-b-2 border-t-2 border-blue-500`}
    ></div>
  </div>
)

export default LoadingFallback
