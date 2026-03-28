import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Inicio = () => {
  const navigate = useNavigate();
  const authenticate = useStore(state => state.authenticate);
  const isAuthenticated = useStore(state => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/painel', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleEnter = () => {
    authenticate();
    navigate('/painel');
  };

  const photos = [
    '/foto_01.jpg',
    '/foto_02.jpg',
  ];

  return (
    <div className="hero-wrapper">
      {/* 4-Photo Quadrant Background */}
      <div className="hero-bg">
        <div className="hero-quadrant-grid">
          {photos.map((src, i) => (
            <motion.div
              key={i}
              className="hero-quadrant"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={src}
                alt=""
                className="hero-quadrant-img"
                loading="eager"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
        {/* Noir overlays */}
        <div className="hero-overlay" />
        <div className="hero-overlay-radial" />
        {/* Grid line accents */}
        <div className="hero-grid-lines" />
      </div>

      {/* Ambient glow blobs */}
      <motion.div
        className="hero-particle hero-particle-1"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-particle hero-particle-2"
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="hero-card"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 150, damping: 15 }}
          className="hero-avatar"
        >
          <img src="/foto_01.jpg" alt="Henrique & Brenda" className="hero-avatar-img" />
          <div className="hero-avatar-ring" />
          <motion.div
            className="hero-avatar-heart"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={14} fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Sparkle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="hero-sparkle"
        >
          <Sparkles size={16} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h1 className="hero-title">Henrique & Brenda</h1>
          <div className="hero-divider">
            <span className="hero-divider-line" />
            <Heart size={12} className="hero-divider-icon" fill="currentColor" />
            <span className="hero-divider-line" />
          </div>
          <p className="hero-subtitle">Nossa Jornada Juntos</p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="hero-description"
        >
          Um espaço criado com carinho para guardar nossos sonhos, celebrar nossas conquistas e eternizar cada momento da nossa história de amor.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <button onClick={handleEnter} className="hero-cta">
            <span className="hero-cta-glow" />
            <Heart size={18} className="hero-cta-icon" />
            <span>Entrar no nosso mundo</span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="hero-date"
        >
          ✦ Juntos desde sempre, para sempre ✦
        </motion.p>
      </motion.div>
    </div>
  );
};
