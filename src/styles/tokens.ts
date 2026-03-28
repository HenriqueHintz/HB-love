// Design tokens — Noir Cinematic palette
export const colors = {
  bg:      { primary: '#0A0A0C', surface: '#141418', elevated: '#1C1C22' },
  accent:  { gold: '#D4A574', goldLight: '#E8C9A0', goldMuted: 'rgba(212,165,116,0.15)' },
  rose:    { soft: '#C97B8B', muted: 'rgba(201,123,139,0.12)', glow: 'rgba(201,123,139,0.25)' },
  text:    { primary: '#F0EDE8', secondary: '#9A9590', muted: '#5A5650', inverse: '#0A0A0C' },
  status:  {
    planned:   { bg: 'rgba(212,165,116,0.10)', border: 'rgba(212,165,116,0.25)', text: '#D4A574' },
    progress:  { bg: 'rgba(147,179,210,0.10)', border: 'rgba(147,179,210,0.25)', text: '#93B3D2' },
    completed: { bg: 'rgba(139,180,140,0.10)', border: 'rgba(139,180,140,0.25)', text: '#8BB48C' },
  },
  overlay: { light: 'rgba(10,10,12,0.6)', heavy: 'rgba(10,10,12,0.85)', blur: 'rgba(20,20,24,0.75)' },
  border:  { subtle: 'rgba(255,255,255,0.06)', medium: 'rgba(255,255,255,0.10)' },
};

export const typography = {
  font: {
    display: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
};

export const shadows = {
  soft: '0 2px 8px rgba(0,0,0,0.3)',
  medium: '0 4px 16px rgba(0,0,0,0.4)',
  glow: '0 0 20px rgba(212,165,116,0.15)',
  cinematic: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
};
