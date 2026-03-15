import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';

const CORRECT_PIN = '1227';

export const Inicio = () => {
  const navigate = useNavigate();
  const authenticate = useStore(state => state.authenticate);
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/painel', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError(false);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check PIN when all 4 digits entered
    const fullPin = newPin.join('');
    if (fullPin.length === 4) {
      if (fullPin === CORRECT_PIN) {
        authenticate();
        navigate('/painel');
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin(['', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 600);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasted.length === 4) {
      const newPin = pasted.split('');
      setPin(newPin);
      if (pasted === CORRECT_PIN) {
        authenticate();
        navigate('/painel');
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin(['', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 600);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-300/20 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/20 blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel p-12 rounded-3xl max-w-lg w-full text-center relative z-10"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white shadow-xl mb-8"
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 font-serif">Henrique & Brenda</h1>
        <p className="text-rose-500 font-medium mb-6 tracking-wide uppercase text-sm">Nossa Jornada Juntos</p>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-sm">
          Um espaço privado para organizar nossos sonhos, acompanhar nossas metas e registrar os momentos mais inesquecíveis da nossa história.
        </p>

        {/* PIN Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
              Digite o PIN para entrar
            </span>
          </div>

          <div className={`flex justify-center gap-3 mb-4 ${shake ? 'animate-shake' : ''}`}>
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`pin-input ${error ? 'border-red-400 dark:border-red-500' : ''}`}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-medium"
            >
              PIN incorreto. Tente novamente.
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
