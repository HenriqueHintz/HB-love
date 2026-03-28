import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FABProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

export const FloatingActionButton: React.FC<FABProps> = ({
  onClick,
  icon = <Plus size={24} />,
  label,
  className,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-40 md:hidden flex items-center justify-center gap-2 px-4 py-4 rounded-full",
        "bg-gradient-to-br from-[#D4A574] to-[#C97B8B] text-[#0A0A0C]",
        "shadow-[0_4px_20px_rgba(212,165,116,0.3)]",
        className
      )}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 0.5, ease: "easeInOut", times: [0, 0.5, 1] }}
      >
        {icon}
      </motion.div>
      {label && <span className="font-semibold text-sm mr-1">{label}</span>}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <motion.div
          className="w-1/2 h-full bg-white/20 skew-x-12"
          animate={{ x: ['-200%', '300%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />
      </div>
    </motion.button>
  );
};
