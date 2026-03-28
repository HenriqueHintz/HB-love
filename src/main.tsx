import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Apply saved background image on startup
const applyStartupSettings = () => {
  const bgImage = localStorage.getItem('bg-image');
  if (bgImage !== null && bgImage) {
    document.body.style.background = `url(${bgImage}) center/cover no-repeat fixed`;
  } else if (bgImage === null) {
    // Default background if never customized
    document.body.style.background = `url('/foto_02.jpg') center/cover no-repeat fixed`;
  }
};

// Register service worker for PWA
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration.scope);
    } catch (error) {
      console.log('SW registration failed:', error);
    }
  }
};

applyStartupSettings();
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
