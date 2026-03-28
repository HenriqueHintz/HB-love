import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Save } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { MediaUploadField } from '../ui/MediaUploadField';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { useFileUpload } from '../../hooks/useFileUpload';

export const TaskModal = () => {
  const editingTaskId = useStore(s => s.editingTaskId);
  const setEditingTaskId = useStore(s => s.setEditingTaskId);
  const tasks = useStore(s => s.tasks);
  const updateTask = useStore(s => s.updateTask);
  const deleteTask = useStore(s => s.deleteTask);
  const addToast = useStore(s => s.addToast);

  const task = tasks.find(t => t.id === editingTaskId);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const upload = useFileUpload();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCategory(task.category);
      setDescription(task.description || '');
      upload.setMedia(task.mediaUrl || '', task.mediaType, '');
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      updateTask(task.id, { title, category, description, mediaUrl: upload.mediaUrl, mediaType: upload.mediaType });
      setEditingTaskId(null);
      addToast({ message: 'Meta atualizada!', type: 'success' });
    }
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
      setEditingTaskId(null);
      setShowDeleteConfirm(false);
      addToast({ message: 'Meta excluída.', type: 'info' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {editingTaskId && task && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0C]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel shadow-2xl rounded-3xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/6"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/6">
                <h2 className="text-2xl font-bold text-[#F0EDE8]">Detalhes da Meta</h2>
                <button onClick={() => setEditingTaskId(null)} className="text-[#5A5650] hover:text-[#9A9590] cursor-pointer"><X size={24} /></button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div>
                  <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Título</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="glass-input py-3 font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Categoria</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="glass-input py-3">
                    <option value="GERAL">Geral</option>
                    <option value="ESPIRITUAL & BEM-ESTAR">Espiritual & Bem-Estar</option>
                    <option value="SAÚDE & ATIVIDADE FÍSICA">Saúde & Atividade Física</option>
                    <option value="LAZER & EXPERIÊNCIAS">Lazer & Experiências</option>
                    <option value="DATAS & CELEBRAÇÕES">Datas & Celebrações</option>
                    <option value="FINANÇAS & FUTURO">Finanças & Futuro</option>
                    <option value="COMUNICAÇÃO & CONEXÃO">Comunicação & Conexão</option>
                    <option value="PLANEJAMENTO DE VIAGEM">Planejamento de Viagem</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Descrição</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Adicione detalhes..." className="glass-input py-3 resize-none" />
                </div>
                <MediaUploadField mediaUrl={upload.mediaUrl} mediaType={upload.mediaType} mediaName={upload.mediaName} onFileUpload={upload.handleFileUpload} onClear={upload.clearMedia} height="h-32" accept="image/*,video/*" label="Mídia (Foto ou Vídeo)" />
              </div>
              <div className="p-6 border-t border-white/6 bg-[#141418] flex justify-between items-center">
                <Button variant="ghost" className="text-red-400/70 hover:text-red-400 hover:bg-red-500/50/10" onClick={() => setShowDeleteConfirm(true)}>
                  <Trash2 size={18} className="mr-2" />Excluir Meta
                </Button>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setEditingTaskId(null)}>Cancelar</Button>
                  <Button onClick={handleSave}>
                    <Save size={18} className="mr-2" />Salvar
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ConfirmDialog open={showDeleteConfirm} message="Tem certeza que deseja excluir esta meta?" onConfirm={handleDelete} onCancel={() => setShowDeleteConfirm(false)} />
    </>
  );
};
