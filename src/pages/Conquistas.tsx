import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { MediaUploadField } from '../components/ui/MediaUploadField';
import { useFileUpload } from '../hooks/useFileUpload';
import { Heart, Plane, PiggyBank, Trophy, Star, Plus, Trash2, X, Edit3, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Achievement } from '../types';

const iconMap: Record<string, React.ElementType> = { Heart, Plane, PiggyBank, Trophy, Star };

const IconSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <select value={value} onChange={e => onChange(e.target.value)} className="glass-input">
    <option value="Star">Estrela</option>
    <option value="Heart">Coração</option>
    <option value="Plane">Avião</option>
    <option value="PiggyBank">Porquinho</option>
    <option value="Trophy">Troféu</option>
  </select>
);

export const Conquistas = () => {
  const achievements = useStore(s => s.achievements);
  const addAchievement = useStore(s => s.addAchievement);
  const updateAchievement = useStore(s => s.updateAchievement);
  const deleteAchievement = useStore(s => s.deleteAchievement);
  const addToast = useStore(s => s.addToast);

  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [icon, setIcon] = useState('Star');
  const upload = useFileUpload();

  const [editing, setEditing] = useState<Achievement | null>(null);
  const [eTitle, setETitle] = useState('');
  const [eDesc, setEDesc] = useState('');
  const [eDate, setEDate] = useState('');
  const [eIcon, setEIcon] = useState('Star');
  const eUpload = useFileUpload();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = achievements.filter(a =>
    !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addAchievement({ title, description, date, icon, mediaUrl: upload.mediaUrl, mediaType: upload.mediaType, mediaName: upload.mediaName });
    setTitle(''); setDescription(''); setIcon('Star'); upload.clearMedia();
    setDate(new Date().toISOString().split('T')[0]); setIsAdding(false);
    addToast({ message: 'Conquista adicionada!', type: 'success' });
  };

  const openEdit = (a: Achievement) => {
    setEditing(a); setETitle(a.title); setEDesc(a.description); setEDate(a.date); setEIcon(a.icon);
    eUpload.setMedia(a.mediaUrl || '', a.mediaType, a.mediaName);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !eTitle) return;
    updateAchievement(editing.id, { title: eTitle, description: eDesc, date: eDate, icon: eIcon, mediaUrl: eUpload.mediaUrl, mediaType: eUpload.mediaType, mediaName: eUpload.mediaName });
    setEditing(null); eUpload.clearMedia();
    addToast({ message: 'Conquista atualizada!', type: 'success' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-app-text">Conquistas</h1>
          <p className="text-app-text-muted mt-1">Marcos e vitórias que alcançamos juntos.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-2"><Plus size={18} />Nova Conquista</Button>
      </div>

      <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Buscar conquistas..." />

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleAdd} className="glass-panel p-6 rounded-2xl shadow-lg border border-app-border-light">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-app-text">Adicionar Conquista</h3>
                <button type="button" onClick={() => setIsAdding(false)} className="text-app-text-muted hover:text-app-text-secondary cursor-pointer"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-app-text-secondary dark:text-app-text-muted mb-1 uppercase tracking-wider">Título</label>
                  <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="glass-input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-app-text-secondary dark:text-app-text-muted mb-1 uppercase tracking-wider">Data</label>
                  <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="glass-input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-app-text-secondary dark:text-app-text-muted mb-1 uppercase tracking-wider">Ícone</label>
                  <IconSelect value={icon} onChange={setIcon} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-app-text-secondary dark:text-app-text-muted mb-1 uppercase tracking-wider">Descrição</label>
                  <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} className="glass-input resize-none" />
                </div>
                <div className="md:col-span-2">
                  <MediaUploadField mediaUrl={upload.mediaUrl} mediaType={upload.mediaType} mediaName={upload.mediaName} onFileUpload={upload.handleFileUpload} onClear={upload.clearMedia} height="h-24" label="Mídia (Opcional)" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.length === 0 ? <EmptyState type="achievements" searchQuery={searchQuery} /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filtered.map((a, i) => {
              const Icon = iconMap[a.icon] || Star;
              return (
                <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }} layout>
                  <Card className="flex items-start gap-5 hover:bg-app-surface0 dark:hover:bg-gray-800/80 transition-colors group relative">
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(a)} className="text-app-text-muted hover:text-app-text-secondary cursor-pointer"><Edit3 size={16} /></button>
                      <button onClick={() => setDeleteId(a.id)} className="text-app-text-muted hover:text-red-400 cursor-pointer"><Trash2 size={16} /></button>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-app-surface-light flex items-center justify-center text-app-text-secondary shadow-lg shrink-0"><Icon size={28} /></div>
                    <div className="pr-6 flex-1">
                      <span className="text-xs font-semibold text-app-text-muted uppercase tracking-wider">{format(parseISO(a.date), "MMMM 'de' yyyy", { locale: ptBR })}</span>
                      <h3 className="text-xl font-bold text-app-text mt-1">{a.title}</h3>
                      <p className="text-app-text-secondary mt-2 leading-relaxed">{a.description}</p>
                      {a.mediaUrl && (
                        <div className="mt-4 media-container bg-app-surface-light border border-app-border-light">
                          {a.mediaType === 'video' ? <video src={a.mediaUrl} controls className="w-full h-auto object-contain" /> :
                           a.mediaType === 'document' ? <a href={a.mediaUrl} download={a.mediaName} className="flex items-center gap-3 p-3 hover:bg-app-surface text-app-text-secondary"><FileText size={24} className="text-app-text-muted" /><span className="text-sm font-medium truncate">{a.mediaName || 'Arquivo'}</span></a> :
                           <img src={a.mediaUrl} alt={a.title} className="w-full h-auto object-contain" loading="lazy" />}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-app-bg/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-panel shadow-2xl rounded-3xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] border border-app-border-light">
              <div className="flex justify-between items-center p-6 border-b border-app-border-light">
                <h2 className="text-xl font-bold text-app-text">Editar Conquista</h2>
                <button onClick={() => { setEditing(null); eUpload.clearMedia(); }} className="text-app-text-muted hover:text-app-text-secondary cursor-pointer"><X size={24} /></button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 overflow-y-auto flex-1 space-y-4">
                <input type="text" required value={eTitle} onChange={e => setETitle(e.target.value)} placeholder="Título" className="glass-input py-3" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" required value={eDate} onChange={e => setEDate(e.target.value)} className="glass-input py-3" />
                  <IconSelect value={eIcon} onChange={setEIcon} />
                </div>
                <textarea rows={3} value={eDesc} onChange={e => setEDesc(e.target.value)} placeholder="Descrição" className="glass-input py-3 resize-none" />
                <MediaUploadField mediaUrl={eUpload.mediaUrl} mediaType={eUpload.mediaType} mediaName={eUpload.mediaName} onFileUpload={eUpload.handleFileUpload} onClear={eUpload.clearMedia} height="h-28" />
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => { setEditing(null); eUpload.clearMedia(); }}>Cancelar</Button>
                  <Button type="submit">Salvar</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDialog open={!!deleteId} message="Tem certeza que deseja excluir esta conquista?" onConfirm={() => { if (deleteId) { deleteAchievement(deleteId); setDeleteId(null); addToast({ message: 'Conquista removida.', type: 'info' }); } }} onCancel={() => setDeleteId(null)} />
    </motion.div>
  );
};
