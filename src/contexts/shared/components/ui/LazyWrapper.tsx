import React, { Suspense } from 'react';
import LoadingFallback from './LoadingFallback';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente que envuelve elementos cargados de forma perezosa (lazy)
 * Muestra un indicador de carga mientras el componente se está cargando
 */
const LazyWrapper: React.FC<LazyWrapperProps> = ({ children, fallback = <LoadingFallback /> }) => (
  <Suspense fallback={fallback}>{children}</Suspense>
);

export default LazyWrapper;
