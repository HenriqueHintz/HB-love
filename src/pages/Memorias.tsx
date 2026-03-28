import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Lightbox } from '../components/ui/Lightbox';
import { FloatingActionButton } from '../components/ui/FloatingActionButton';
import { MediaUploadField } from '../components/ui/MediaUploadField';
import { useFileUpload } from '../hooks/useFileUpload';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, Trash2, X, Edit3, FileText } from 'lucide-react';
import { Memory } from '../types';

export const Memorias = () => {
  const memories = useStore(state => state.memories);
  const addMemory = useStore(state => state.addMemory);
  const updateMemory = useStore(state => state.updateMemory);
  const deleteMemory = useStore(state => state.deleteMemory);
  const addToast = useStore(state => state.addToast);

  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const upload = useFileUpload();

  // Edit state
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const editUpload = useFileUpload();

  // Confirm delete
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Lightbox
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredMemories = memories.filter(m =>
    !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !upload.mediaUrl) return;

    addMemory({
      title,
      description,
      date,
      photoUrl: upload.mediaUrl,
      mediaUrl: upload.mediaUrl,
      mediaType: upload.mediaType,
      mediaName: upload.mediaName,
    });

    setTitle('');
    setDescription('');
    upload.clearMedia();
    setDate(new Date().toISOString().split('T')[0]);
    setIsAdding(false);
    addToast({ message: 'Memória adicionada!', type: 'success' });
  };

  const openEdit = (memory: Memory) => {
    setEditingMemory(memory);
    setEditTitle(memory.title);
    setEditDescription(memory.description);
    setEditDate(memory.date);
    editUpload.setMedia(memory.mediaUrl || memory.photoUrl, memory.mediaType || 'image', memory.mediaName);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemory || !editTitle) return;

    updateMemory(editingMemory.id, {
      title: editTitle,
      description: editDescription,
      date: editDate,
      photoUrl: editUpload.mediaUrl,
      mediaUrl: editUpload.mediaUrl,
      mediaType: editUpload.mediaType,
      mediaName: editUpload.mediaName,
    });

    setEditingMemory(null);
    editUpload.clearMedia();
    addToast({ message: 'Memória atualizada!', type: 'success' });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteMemory(deleteTarget);
      setDeleteTarget(null);
      addToast({ message: 'Memória removida.', type: 'info' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#F0EDE8]">Memórias</h1>
          <p className="text-[#5A5650] mt-1">Momentos inesquecíveis que compartilhamos.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus size={18} />
          Nova Memória
        </Button>
      </div>

      <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Buscar memórias..." />

      {/* Add form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleAdd} className="glass-panel p-6 rounded-2xl shadow-lg border border-white/60">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#F0EDE8]">Adicionar Memória</h3>
                <button type="button" onClick={() => setIsAdding(false)} className="text-[#5A5650] hover:text-[#9A9590] cursor-pointer"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Título</label>
                    <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="glass-input" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Data</label>
                    <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="glass-input" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Descrição</label>
                    <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className="glass-input resize-none" />
                  </div>
                </div>
                <MediaUploadField mediaUrl={upload.mediaUrl} mediaType={upload.mediaType} mediaName={upload.mediaName} onFileUpload={upload.handleFileUpload} onClear={upload.clearMedia} />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancelar</Button>
                <Button type="submit">Salvar Memória</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memories grid */}
      {filteredMemories.length === 0 ? (
        <EmptyState type="memories" searchQuery={searchQuery} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredMemories.map((memory, index) => (
              <motion.div key={memory.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.05 }} layout>
                <Card className="p-3 overflow-hidden group hover:shadow-xl transition-all duration-300 relative">
                  <div className="absolute top-5 right-5 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(memory)} className="bg-[#0A0A0C]/60 text-[#9A9590] p-2 rounded-full shadow-lg cursor-pointer hover:bg-black/60">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => setDeleteTarget(memory.id)} className="bg-red-500/50 text-[#F0EDE8] p-2 rounded-full shadow-lg cursor-pointer hover:bg-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="media-thumbnail mb-4 bg-[#1C1C22] flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      const src = memory.mediaUrl || memory.photoUrl;
                      if (memory.mediaType !== 'video' && memory.mediaType !== 'document') {
                        setLightboxSrc(src);
                        setLightboxOpen(true);
                      }
                    }}
                  >
                    {memory.mediaType === 'video' ? (
                      <video src={memory.mediaUrl || memory.photoUrl} controls className="absolute inset-0 w-full h-full object-contain" />
                    ) : memory.mediaType === 'document' ? (
                      <a href={memory.mediaUrl || memory.photoUrl} download={memory.mediaName || 'arquivo'} className="flex flex-col items-center gap-2 text-[#5A5650] p-4 hover:text-[#9A9590] transition-colors absolute inset-0 justify-center">
                        <FileText size={48} />
                        <span className="text-sm font-medium text-center break-all">{memory.mediaName || 'Arquivo'}</span>
                      </a>
                    ) : (
                      <img src={memory.mediaUrl || memory.photoUrl} alt={memory.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" />
                    )}
                    {(!memory.mediaType || memory.mediaType === 'image') && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    )}
                  </div>
                  <div className="px-2 pb-2">
                    <span className="text-xs font-semibold text-[#9A9590] uppercase tracking-wider">
                      {format(parseISO(memory.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    </span>
                    <h3 className="text-lg font-bold text-[#F0EDE8] mt-1">{memory.title}</h3>
                    <p className="text-[#9A9590] text-sm mt-1 line-clamp-3">{memory.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0C]/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-panel shadow-2xl rounded-3xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] border border-white/6">
              <div className="flex justify-between items-center p-6 border-b border-white/6">
                <h2 className="text-xl font-bold text-[#F0EDE8]">Editar Memória</h2>
                <button onClick={() => { setEditingMemory(null); editUpload.clearMedia(); }} className="text-[#5A5650] hover:text-[#9A9590] cursor-pointer"><X size={24} /></button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 overflow-y-auto flex-1 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Título</label>
                  <input type="text" required value={editTitle} onChange={e => setEditTitle(e.target.value)} className="glass-input py-3" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Data</label>
                  <input type="date" required value={editDate} onChange={e => setEditDate(e.target.value)} className="glass-input py-3" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Descrição</label>
                  <textarea rows={3} value={editDescription} onChange={e => setEditDescription(e.target.value)} className="glass-input py-3 resize-none" />
                </div>
                <MediaUploadField mediaUrl={editUpload.mediaUrl} mediaType={editUpload.mediaType} mediaName={editUpload.mediaName} onFileUpload={editUpload.handleFileUpload} onClear={editUpload.clearMedia} height="h-40" />
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="ghost" onClick={() => { setEditingMemory(null); editUpload.clearMedia(); }}>Cancelar</Button>
                  <Button type="submit">Salvar Alterações</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDialog open={!!deleteTarget} message="Tem certeza que deseja excluir esta memória? Essa ação não pode ser desfeita." onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
      <Lightbox open={lightboxOpen} src={lightboxSrc} onClose={() => setLightboxOpen(false)} />
      <FloatingActionButton onClick={() => setIsAdding(true)} />
    </motion.div>
  );
};
