import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Sun, Moon, Eye, Download, Upload, RotateCcw, Heart, Check, Image as ImageIcon, Type, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useStore } from '../store/useStore';

const ACCENT_COLORS = [
  { name: 'Rosa', value: 'rose', bg: 'bg-rose-500', ring: 'ring-rose-400' },
  { name: 'Violeta', value: 'violet', bg: 'bg-violet-500', ring: 'ring-violet-400' },
  { name: 'Azul', value: 'blue', bg: 'bg-blue-500', ring: 'ring-blue-400' },
  { name: 'Esmeralda', value: 'emerald', bg: 'bg-emerald-500', ring: 'ring-emerald-400' },
  { name: 'Âmbar', value: 'amber', bg: 'bg-amber-500', ring: 'ring-amber-400' },
  { name: 'Ciano', value: 'cyan', bg: 'bg-cyan-500', ring: 'ring-cyan-400' },
  { name: 'Fúcsia', value: 'fuchsia', bg: 'bg-fuchsia-500', ring: 'ring-fuchsia-400' },
  { name: 'Laranja', value: 'orange', bg: 'bg-orange-500', ring: 'ring-orange-400' },
];

const GRADIENT_PRESETS = [
  { name: 'Romance', value: 'romance', from: '#fff1f2', via: '#faf5ff', to: '#fdfbf7', darkFrom: '#1a1020', darkVia: '#0f172a', darkTo: '#1a1520' },
  { name: 'Oceano', value: 'ocean', from: '#ecfeff', via: '#eff6ff', to: '#f0fdf4', darkFrom: '#0c1a2a', darkVia: '#0f172a', darkTo: '#0a1a1a' },
  { name: 'Pôr do Sol', value: 'sunset', from: '#fff7ed', via: '#fef2f2', to: '#fdf4ff', darkFrom: '#1a150d', darkVia: '#1a1010', darkTo: '#1a0f1f' },
  { name: 'Floresta', value: 'forest', from: '#f0fdf4', via: '#ecfdf5', to: '#f0fdfa', darkFrom: '#0a1a0f', darkVia: '#0b1a13', darkTo: '#0a1a18' },
  { name: 'Lavanda', value: 'lavender', from: '#faf5ff', via: '#f5f3ff', to: '#fdf2f8', darkFrom: '#150f1f', darkVia: '#13101f', darkTo: '#1a0f18' },
  { name: 'Noite', value: 'midnight', from: '#f1f5f9', via: '#e2e8f0', to: '#f8fafc', darkFrom: '#020617', darkVia: '#0f172a', darkTo: '#020617' },
];

const TEXT_COLORS = [
  { name: 'Padrão', value: '', preview: '#334155' },
  { name: 'Branco', value: '#ffffff', preview: '#ffffff' },
  { name: 'Preto', value: '#0f172a', preview: '#0f172a' },
  { name: 'Rosa', value: '#be123c', preview: '#be123c' },
  { name: 'Azul', value: '#1e40af', preview: '#1e40af' },
  { name: 'Violeta', value: '#6d28d9', preview: '#6d28d9' },
  { name: 'Esmeralda', value: '#047857', preview: '#047857' },
  { name: 'Âmbar', value: '#92400e', preview: '#92400e' },
];

const applyAccentColor = (color: string) => {
  const root = document.documentElement;
  const colors: Record<string, Record<string, string>> = {
    rose: { '400': '#fb7185', '500': '#f43f5e', '600': '#e11d48' },
    violet: { '400': '#a78bfa', '500': '#8b5cf6', '600': '#7c3aed' },
    blue: { '400': '#60a5fa', '500': '#3b82f6', '600': '#2563eb' },
    emerald: { '400': '#34d399', '500': '#10b981', '600': '#059669' },
    amber: { '400': '#fbbf24', '500': '#f59e0b', '600': '#d97706' },
    cyan: { '400': '#22d3ee', '500': '#06b6d4', '600': '#0891b2' },
    fuchsia: { '400': '#e879f9', '500': '#d946ef', '600': '#c026d3' },
    orange: { '400': '#fb923c', '500': '#f97316', '600': '#ea580c' },
  };
  const c = colors[color] || colors.rose;
  root.style.setProperty('--accent-400', c['400']);
  root.style.setProperty('--accent-500', c['500']);
  root.style.setProperty('--accent-600', c['600']);
};

const applyGradient = (preset: string, isDark: boolean) => {
  const g = GRADIENT_PRESETS.find(p => p.value === preset) || GRADIENT_PRESETS[0];
  const from = isDark ? g.darkFrom : g.from;
  const via = isDark ? g.darkVia : g.via;
  const to = isDark ? g.darkTo : g.to;
  document.body.style.background = `linear-gradient(135deg, ${from} 0%, ${via} 50%, ${to} 100%)`;
  document.body.style.backgroundAttachment = 'fixed';
};

const applyBgImage = (url: string) => {
  if (url) {
    document.body.style.background = `url(${url}) center/cover no-repeat fixed`;
  }
};

const applyTextColor = (color: string) => {
  if (color) {
    document.body.style.color = color;
  } else {
    document.body.style.color = '';
  }
};

export const Configuracoes = () => {
  const theme = useStore(s => s.theme);
  const toggleTheme = useStore(s => s.toggleTheme);
  const exportData = useStore(s => s.exportData);
  const importData = useStore(s => s.importData);
  const addToast = useStore(s => s.addToast);

  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('accent-color') || 'rose');
  const [gradientPreset, setGradientPreset] = useState(() => localStorage.getItem('gradient-preset') || 'romance');
  const [bgImage, setBgImage] = useState(() => localStorage.getItem('bg-image') || '');
  const [bgMode, setBgMode] = useState<'gradient' | 'image'>(() => localStorage.getItem('bg-image') ? 'image' : 'gradient');
  const [textColor, setTextColor] = useState(() => localStorage.getItem('text-color') || '');
  const [coupleNames, setCoupleNames] = useState(() => localStorage.getItem('couple-names') || 'Henrique & Brenda');
  const [subtitle, setSubtitle] = useState(() => localStorage.getItem('couple-subtitle') || 'Nossa Jornada Juntos');

  const handleAccentChange = (color: string) => {
    setAccentColor(color);
    localStorage.setItem('accent-color', color);
    applyAccentColor(color);
    addToast({ message: 'Cor de destaque atualizada!', type: 'success' });
  };

  const handleGradientChange = (preset: string) => {
    setGradientPreset(preset);
    setBgMode('gradient');
    localStorage.setItem('gradient-preset', preset);
    localStorage.removeItem('bg-image');
    setBgImage('');
    applyGradient(preset, theme === 'dark');
    addToast({ message: 'Fundo alterado!', type: 'success' });
  };

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      addToast({ message: 'Imagem muito grande (máx. 10MB)', type: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      setBgImage(url);
      setBgMode('image');
      localStorage.setItem('bg-image', url);
      applyBgImage(url);
      addToast({ message: 'Imagem de fundo aplicada!', type: 'success' });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBgImage = () => {
    setBgImage('');
    setBgMode('gradient');
    localStorage.removeItem('bg-image');
    applyGradient(gradientPreset, theme === 'dark');
    addToast({ message: 'Imagem de fundo removida.', type: 'info' });
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    localStorage.setItem('text-color', color);
    applyTextColor(color);
    addToast({ message: 'Cor do texto atualizada!', type: 'success' });
  };

  const handleSaveNames = () => {
    localStorage.setItem('couple-names', coupleNames);
    localStorage.setItem('couple-subtitle', subtitle);
    addToast({ message: 'Nomes atualizados!', type: 'success' });
  };

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nossa-jornada-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ message: 'Backup exportado!', type: 'success' });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const ok = importData(reader.result as string);
        addToast({ message: ok ? 'Dados importados!' : 'Erro ao importar.', type: ok ? 'success' : 'error' });
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    localStorage.removeItem('accent-color');
    localStorage.removeItem('gradient-preset');
    localStorage.removeItem('bg-image');
    localStorage.removeItem('text-color');
    localStorage.removeItem('couple-names');
    localStorage.removeItem('couple-subtitle');
    document.documentElement.style.removeProperty('--accent-400');
    document.documentElement.style.removeProperty('--accent-500');
    document.documentElement.style.removeProperty('--accent-600');
    document.body.style.background = '';
    document.body.style.color = '';
    setAccentColor('rose');
    setGradientPreset('romance');
    setBgImage('');
    setBgMode('gradient');
    setTextColor('');
    setCoupleNames('Henrique & Brenda');
    setSubtitle('Nossa Jornada Juntos');
    addToast({ message: 'Configurações restauradas!', type: 'info' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Configurações</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Personalize o app do seu jeito.</p>
      </div>

      {/* Theme */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Eye size={20} className="text-rose-500" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Tema</h2>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { if (theme === 'dark') toggleTheme(); }} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all cursor-pointer ${theme === 'light' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
            <Sun size={18} /> Claro
          </button>
          <button onClick={() => { if (theme === 'light') toggleTheme(); }} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all cursor-pointer ${theme === 'dark' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-400' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
            <Moon size={18} /> Escuro
          </button>
        </div>
      </Card>

      {/* Accent Color */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Palette size={20} className="text-rose-500" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Cor de Destaque</h2>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {ACCENT_COLORS.map(c => (
            <button key={c.value} onClick={() => handleAccentChange(c.value)} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all cursor-pointer ${accentColor === c.value ? `ring-2 ${c.ring} bg-white/50 dark:bg-gray-700/50` : 'hover:bg-white/30 dark:hover:bg-gray-700/30'}`}>
              <div className={`w-8 h-8 rounded-full ${c.bg} shadow-md flex items-center justify-center`}>
                {accentColor === c.value && <Check size={14} className="text-white" />}
              </div>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{c.name}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Text Color */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Type size={20} className="text-purple-500" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Cor do Texto</h2>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {TEXT_COLORS.map(c => (
            <button key={c.name} onClick={() => handleTextColorChange(c.value)} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all cursor-pointer ${textColor === c.value ? 'ring-2 ring-rose-400 bg-white/50 dark:bg-gray-700/50' : 'hover:bg-white/30 dark:hover:bg-gray-700/30'}`}>
              <div className="w-8 h-8 rounded-full shadow-md flex items-center justify-center border-2 border-gray-200 dark:border-gray-600" style={{ backgroundColor: c.preview }}>
                {textColor === c.value && <Check size={14} className={c.value === '#ffffff' || c.value === '#fbbf24' ? 'text-gray-800' : 'text-white'} />}
              </div>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{c.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cor personalizada:</label>
          <input type="color" value={textColor || '#334155'} onChange={e => handleTextColorChange(e.target.value)} className="w-10 h-8 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer" />
        </div>
      </Card>

      {/* Background */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Palette size={20} className="text-purple-500" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Fundo</h2>
        </div>

        {/* BG Image upload */}
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon size={16} className="text-gray-500" />
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Imagem personalizada</label>
          </div>
          {bgImage ? (
            <div className="relative rounded-xl overflow-hidden h-24 group">
              <img src={bgImage} alt="Fundo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={handleRemoveBgImage} className="bg-red-500 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
              {bgMode === 'image' && <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center"><Check size={12} className="text-white" /></div>}
            </div>
          ) : (
            <label className="flex items-center justify-center h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 transition-colors">
              <div className="text-center">
                <ImageIcon size={24} className="mx-auto text-gray-400 mb-1" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Clique para enviar imagem (máx. 10MB)</span>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
            </label>
          )}
        </div>

        {/* Gradient presets */}
        <div className="flex items-center gap-3 mb-2">
          <Palette size={16} className="text-gray-500" />
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gradientes</label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {GRADIENT_PRESETS.map(g => (
            <button key={g.value} onClick={() => handleGradientChange(g.value)} className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${bgMode === 'gradient' && gradientPreset === g.value ? 'border-rose-400 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
              <div className="w-full h-12 rounded-lg shadow-inner" style={{ background: `linear-gradient(135deg, ${theme === 'dark' ? g.darkFrom : g.from} 0%, ${theme === 'dark' ? g.darkVia : g.via} 50%, ${theme === 'dark' ? g.darkTo : g.to} 100%)` }} />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{g.name}</span>
              {bgMode === 'gradient' && gradientPreset === g.value && <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center"><Check size={12} className="text-white" /></div>}
            </button>
          ))}
        </div>
      </Card>

      {/* Customization */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Heart size={20} className="text-rose-500" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Personalização</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Nomes do Casal</label>
            <input type="text" value={coupleNames} onChange={e => setCoupleNames(e.target.value)} className="w-full bg-white/70 dark:bg-gray-800/70 border border-white/80 dark:border-gray-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 dark:text-gray-200" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Subtítulo</label>
            <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full bg-white/70 dark:bg-gray-800/70 border border-white/80 dark:border-gray-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 dark:text-gray-200" />
          </div>
          <Button onClick={handleSaveNames} size="sm">Salvar Nomes</Button>
        </div>
      </Card>

      {/* Data */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Download size={20} className="text-blue-500" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Dados</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleExport} variant="secondary" className="gap-2"><Download size={16} />Exportar Backup</Button>
          <Button onClick={handleImport} variant="secondary" className="gap-2"><Upload size={16} />Importar Backup</Button>
          <Button onClick={handleReset} variant="ghost" className="gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><RotateCcw size={16} />Restaurar Padrão</Button>
        </div>
      </Card>
    </motion.div>
  );
};
