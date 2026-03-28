// Framer Motion animation presets — Noir Cinematic
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const staggerContainer = (delay = 0.08) => ({
  animate: { transition: { staggerChildren: delay } },
});

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { scale: 0.98 }
};

export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 10px rgba(212, 165, 116, 0.1)",
      "0 0 30px rgba(212, 165, 116, 0.25)",
      "0 0 10px rgba(212, 165, 116, 0.1)"
    ],
    transition: { repeat: Infinity, duration: 3 }
  }
};

export const scrollReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};
