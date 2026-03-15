import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = 'Confirmar exclusão',
  message,
  confirmLabel = 'Excluir',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="bg-white dark:bg-gray-800 border border-white/50 dark:border-gray-700 shadow-2xl rounded-2xl w-full max-w-sm p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  variant === 'danger'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-500'
                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'
                }`}
              >
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h3>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
              {message}
            </p>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button
                onClick={onConfirm}
                className={
                  variant === 'danger'
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
