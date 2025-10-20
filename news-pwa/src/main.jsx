import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        console.log('✅ Service Worker registrado:', reg.scope);
        console.log('¿Controlado por SW?', !!navigator.serviceWorker.controller);
      })
      .catch((err) => {
        console.error('❌ Error al registrar SW:', err);
      });
  });
}
