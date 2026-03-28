import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, TrendingUp } from 'lucide-react';
import { KanbanBoard } from '../components/kanban/KanbanBoard';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { useStore } from '../store/useStore';
import { TaskModal } from '../components/kanban/TaskModal';
import { FloatingActionButton } from '../components/ui/FloatingActionButton';
import { getCategoryColor } from '../utils/categoryColors';

const CATEGORIES = [
  "ESPIRITUAL & BEM-ESTAR",
  "SAÚDE & ATIVIDADE FÍSICA",
  "LAZER & EXPERIÊNCIAS",
  "DATAS & CELEBRAÇÕES",
  "FINANÇAS & FUTURO",
  "COMUNICAÇÃO & CONEXÃO",
  "PLANEJAMENTO DE VIAGEM"
];

export const Painel = () => {
  const tasks = useStore(state => state.tasks);
  const addTask = useStore(state => state.addTask);
  const addToast = useStore(state => state.addToast);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('GERAL');
  const [filterCategory, setFilterCategory] = useState('TODAS');
  const [searchQuery, setSearchQuery] = useState('');

  // Progress stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Concluído').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Per-category stats
  const categoryStats = [...CATEGORIES, 'GERAL'].map(cat => {
    const catTasks = tasks.filter(t => t.category === cat);
    const done = catTasks.filter(t => t.status === 'Concluído').length;
    const total = catTasks.length;
    return {
      name: cat,
      total,
      done,
      percent: total > 0 ? Math.round((done / total) * 100) : 0,
      color: getCategoryColor(cat).dark,
    };
  }).filter(c => c.total > 0);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    addTask({
      title: newTaskTitle,
      category: newTaskCategory,
      status: 'Planejado'
    });
    
    setNewTaskTitle('');
    setIsAdding(false);
    addToast({ message: 'Meta adicionada!', type: 'success' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#F0EDE8]">Painel de Metas</h1>
          <p className="text-[#5A5650] mt-1">Organize e acompanhe nossos objetivos juntos.</p>
        </div>
        
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2 whitespace-nowrap">
          <Plus size={18} />
          Nova Meta
        </Button>
      </div>

      {/* Progress bar */}
      <div className="glass-panel rounded-2xl p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-[#9A9590]">
              <TrendingUp size={16} className="text-[#5A5650]" />
              Progresso Geral
            </div>
            <span className="text-sm font-bold text-[#9A9590]">
              {completedTasks} de {totalTasks} metas ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-[#1C1C22] rounded-full overflow-hidden">
            <div
              className="progress-fill h-full bg-[#D4A574]/20 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Per-category progress */}
        <div className="space-y-3 pt-2 border-t border-white/6">
          {categoryStats.map(cat => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-[#9A9590]">
                  {cat.name}
                </span>
                <span className="text-xs font-bold text-[#5A5650]">
                  {cat.done}/{cat.total}
                </span>
              </div>
              <div className="w-full h-2 bg-[#141418] rounded-full overflow-hidden">
                <div
                  className="progress-fill h-full rounded-full bg-[#D4A574]/15"
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar metas..."
          className="flex-1"
        />
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Filter size={16} className="text-[#5A5650]" />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full sm:w-auto pl-9 pr-8 py-2 glass-input text-sm appearance-none shadow-sm"
          >
            <option value="TODAS">Todas as Categorias</option>
            <option value="GERAL">Geral</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add form */}
      {isAdding && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-end overflow-hidden shadow-lg border border-white/6"
          onSubmit={handleAddTask}
        >
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Título da Meta</label>
            <input 
              type="text" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Ex: Viajar para Paris..."
              className="glass-input py-2.5 shadow-sm"
              autoFocus
            />
          </div>
          <div className="w-full md:w-64">
            <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Categoria</label>
            <select 
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="glass-input py-2.5 shadow-sm"
            >
              <option value="GERAL">Geral</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="py-2.5">Cancelar</Button>
            <Button type="submit" className="py-2.5">Adicionar</Button>
          </div>
        </motion.form>
      )}

      <KanbanBoard filterCategory={filterCategory} searchQuery={searchQuery} />

      <TaskModal />
      <FloatingActionButton onClick={() => setIsAdding(true)} />
    </motion.div>
  );
};
