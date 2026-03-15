import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Apply saved customizations on startup
const applyStartupSettings = () => {
  // Accent color
  const accent = localStorage.getItem('accent-color');
  if (accent) {
    const colors: Record<string, Record<string, string>> = {
      rose: { '400': '#fb7185', '500': '#f43f5e', '600': '#e11d48' },
      violet: { '400': '#a78bfa', '500': '#8b5cf6', '600': '#7c3aed' },
      blue: { '400': '#60a5fa', '500': '#3b82f6', '600': '#2563eb' },
      emerald: { '400': '#34d399', '500': '#10b981', '600': '#059669' },
      amber: { '400': '#fbbf24', '500': '#f59e0b', '600': '#d97706' },
      cyan: { '400': '#22d3ee', '500': '#06b6d4', '600': '#0891b2' },
      fuchsia: { '400': '#e879f9', '500': '#d946ef', '600': '#c026d3' },
      orange: { '400': '#fb923c', '500': '#f97316', '600': '#ea580c' },
    };
    const c = colors[accent];
    if (c) {
      document.documentElement.style.setProperty('--accent-400', c['400']);
      document.documentElement.style.setProperty('--accent-500', c['500']);
      document.documentElement.style.setProperty('--accent-600', c['600']);
    }
  }

  // Background image or gradient
  const bgImage = localStorage.getItem('bg-image');
  if (bgImage) {
    document.body.style.background = `url(${bgImage}) center/cover no-repeat fixed`;
  } else {
    const preset = localStorage.getItem('gradient-preset');
    if (preset) {
      const PRESETS: Record<string, { from: string; via: string; to: string; darkFrom: string; darkVia: string; darkTo: string }> = {
        romance: { from: '#fff1f2', via: '#faf5ff', to: '#fdfbf7', darkFrom: '#1a1020', darkVia: '#0f172a', darkTo: '#1a1520' },
        ocean: { from: '#ecfeff', via: '#eff6ff', to: '#f0fdf4', darkFrom: '#0c1a2a', darkVia: '#0f172a', darkTo: '#0a1a1a' },
        sunset: { from: '#fff7ed', via: '#fef2f2', to: '#fdf4ff', darkFrom: '#1a150d', darkVia: '#1a1010', darkTo: '#1a0f1f' },
        forest: { from: '#f0fdf4', via: '#ecfdf5', to: '#f0fdfa', darkFrom: '#0a1a0f', darkVia: '#0b1a13', darkTo: '#0a1a18' },
        lavender: { from: '#faf5ff', via: '#f5f3ff', to: '#fdf2f8', darkFrom: '#150f1f', darkVia: '#13101f', darkTo: '#1a0f18' },
        midnight: { from: '#f1f5f9', via: '#e2e8f0', to: '#f8fafc', darkFrom: '#020617', darkVia: '#0f172a', darkTo: '#020617' },
      };
      const g = PRESETS[preset];
      if (g) {
        const isDark = document.documentElement.classList.contains('dark');
        const from = isDark ? g.darkFrom : g.from;
        const via = isDark ? g.darkVia : g.via;
        const to = isDark ? g.darkTo : g.to;
        document.body.style.background = `linear-gradient(135deg, ${from} 0%, ${via} 50%, ${to} 100%)`;
        document.body.style.backgroundAttachment = 'fixed';
      }
    }
  }

  // Text color
  const textColor = localStorage.getItem('text-color');
  if (textColor) {
    document.body.style.color = textColor;
  }
};

applyStartupSettings();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
