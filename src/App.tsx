/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { PageSkeleton } from './components/ui/Skeleton';
import { useStore } from './store/useStore';

// Lazy load pages
const Inicio = React.lazy(() => import('./pages/Inicio').then(m => ({ default: m.Inicio })));
const Painel = React.lazy(() => import('./pages/Painel').then(m => ({ default: m.Painel })));
const Memorias = React.lazy(() => import('./pages/Memorias').then(m => ({ default: m.Memorias })));
const Conquistas = React.lazy(() => import('./pages/Conquistas').then(m => ({ default: m.Conquistas })));
const LinhaDoTempo = React.lazy(() => import('./pages/LinhaDoTempo').then(m => ({ default: m.LinhaDoTempo })));
const Configuracoes = React.lazy(() => import('./pages/Configuracoes').then(m => ({ default: m.Configuracoes })));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center p-10">
            <PageSkeleton />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/painel" element={<Painel />} />
              <Route path="/memorias" element={<Memorias />} />
              <Route path="/conquistas" element={<Conquistas />} />
              <Route path="/linha-do-tempo" element={<LinhaDoTempo />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
