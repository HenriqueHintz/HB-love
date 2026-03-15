import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { MediaUploadField } from '../components/ui/MediaUploadField';
import { useFileUpload } from '../hooks/useFileUpload';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Heart, MapPin, Calendar, Plus, Trash2, X, Edit3, FileText } from 'lucide-react';
import { TimelineEvent } from '../types';

export const LinhaDoTempo = () => {
  const timeline = useStore(s => s.timeline);
  const addTimelineEvent = useStore(s => s.addTimelineEvent);
  const updateTimelineEvent = useStore(s => s.updateTimelineEvent);
  const deleteTimelineEvent = useStore(s => s.deleteTimelineEvent);
  const addToast = useStore(s => s.addToast);

  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<'milestone' | 'trip' | 'date'>('milestone');
  const upload = useFileUpload();

  const [editing, setEditing] = useState<TimelineEvent | null>(null);
  const [eTitle, setETitle] = useState('');
  const [eDesc, setEDesc] = useState('');
  const [eDate, setEDate] = useState('');
  const [eType, setEType] = useState<'milestone' | 'trip' | 'date'>('milestone');
  const eUpload = useFileUpload();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sorted = [...timeline]
    .filter(ev => !searchQuery || ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || ev.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getIcon = (t: string) => {
    if (t === 'trip') return <MapPin size={16} />;
    if (t === 'date') return <Calendar size={16} />;
    return <Heart size={16} />;
  };
  const getColor = (t: string) => {
    if (t === 'trip') return 'bg-blue-500';
    if (t === 'date') return 'bg-purple-500';
    return 'bg-rose-500';
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addTimelineEvent({ title, description, date, type, mediaUrl: upload.mediaUrl, mediaType: upload.mediaType, mediaName: upload.mediaName });
    setTitle(''); setDescription(''); setType('milestone'); upload.clearMedia();
    setDate(new Date().toISOString().split('T')[0]); setIsAdding(false);
    addToast({ message: 'Evento adicionado!', type: 'success' });
  };

  const openEdit = (ev: TimelineEvent) => {
    setEditing(ev); setETitle(ev.title); setEDesc(ev.description); setEDate(ev.date); setEType(ev.type);
    eUpload.setMedia(ev.mediaUrl || '', ev.mediaType, ev.mediaName);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !eTitle) return;
    updateTimelineEvent(editing.id, { title: eTitle, description: eDesc, date: eDate, type: eType, mediaUrl: eUpload.mediaUrl, mediaType: eUpload.mediaType, mediaName: eUpload.mediaName });
    setEditing(null); eUpload.clearMedia();
    addToast({ message: 'Evento atualizado!', type: 'success' });
  };

  const TypeSelect = ({ value, onChange }: { value: string; onChange: (v: any) => void }) => (
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white/70 dark:bg-gray-800/70 border border-white/80 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 dark:text-gray-200">
      <option value="milestone">Marco Importante</option>
      <option value="trip">Viagem</option>
      <option value="date">Encontro Especial</option>
    </select>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Linha do Tempo</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">A história do nosso relacionamento.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-2"><Plus size={18} />Novo Evento</Button>
      </div>

      <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Buscar eventos..." />

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleAdd} className="glass-panel p-6 rounded-2xl shadow-lg border border-white/80 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Adicionar Evento</h3>
                <button type="button" onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Título</label>
                  <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-white/70 dark:bg-gray-800/70 border border-white/80 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 dark:text-gray-200" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Data</label>
                  <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white/70 dark:bg-gray-800/70 border border-white/80 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 dark:text-gray-200" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Tipo</label>
                  <TypeSelect value={type} onChange={setType} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Descrição</label>
                  <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-white/70 dark:bg-gray-800/70 border border-white/80 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none text-gray-800 dark:text-gray-200" />
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

      {sorted.length === 0 ? <EmptyState type="timeline" searchQuery={searchQuery} /> : (
        <div className="relative border-l-2 border-rose-200 dark:border-rose-800 ml-4 md:ml-8 py-4 space-y-12">
          <AnimatePresence>
            {sorted.map((event, index) => (
              <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.1 }} className="relative pl-8 md:pl-12 group" layout>
                <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-rose-50 dark:border-gray-900 flex items-center justify-center text-white shadow-md ${getColor(event.type)}`}>
                  {getIcon(event.type)}
                </div>
                <div className="glass-panel p-6 rounded-2xl hover:shadow-lg transition-shadow relative">
                  <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(event)} className="text-gray-400 hover:text-rose-500 cursor-pointer"><Edit3 size={16} /></button>
                    <button onClick={() => setDeleteId(event.id)} className="text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 size={16} /></button>
                  </div>
                  <span className="text-sm font-bold text-rose-500 uppercase tracking-wider">{format(parseISO(event.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}</span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{event.description}</p>
                  {event.mediaUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 max-w-lg">
                      {event.mediaType === 'video' ? <video src={event.mediaUrl} controls className="w-full max-h-64 object-contain" /> :
                       event.mediaType === 'document' ? <a href={event.mediaUrl} download={event.mediaName} className="flex items-center gap-3 p-3 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"><FileText size={24} className="text-rose-500" /><span className="text-sm font-medium truncate">{event.mediaName || 'Arquivo'}</span></a> :
                       <img src={event.mediaUrl} alt={event.title} className="w-full max-h-64 object-cover" />}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Editar Evento</h2>
                <button onClick={() => { setEditing(null); eUpload.clearMedia(); }} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={24} /></button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 overflow-y-auto flex-1 space-y-4">
                <input type="text" required value={eTitle} onChange={e => setETitle(e.target.value)} placeholder="Título" className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 dark:text-gray-200" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" required value={eDate} onChange={e => setEDate(e.target.value)} className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 dark:text-gray-200" />
                  <TypeSelect value={eType} onChange={setEType} />
                </div>
                <textarea rows={3} value={eDesc} onChange={e => setEDesc(e.target.value)} placeholder="Descrição" className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none text-gray-800 dark:text-gray-200" />
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

      <ConfirmDialog open={!!deleteId} message="Tem certeza que deseja excluir este evento?" onConfirm={() => { if (deleteId) { deleteTimelineEvent(deleteId); setDeleteId(null); addToast({ message: 'Evento removido.', type: 'info' }); } }} onCancel={() => setDeleteId(null)} />
    </motion.div>
  );
};
