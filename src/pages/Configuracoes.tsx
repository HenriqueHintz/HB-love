import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Eye, Download, Upload, RotateCcw, Heart, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useStore } from '../store/useStore';

const applyBgImage = (url: string) => {
  if (url) {
    document.body.style.background = `url(${url}) center/cover no-repeat fixed`;
  }
};

export const Configuracoes = () => {
  const theme = useStore(s => s.theme);
  const toggleTheme = useStore(s => s.toggleTheme);
  const exportData = useStore(s => s.exportData);
  const importData = useStore(s => s.importData);
  const addToast = useStore(s => s.addToast);

  const [bgImage, setBgImage] = useState(() => {
    const saved = localStorage.getItem('bg-image');
    return saved !== null ? saved : '/foto_02.jpg';
  });
  const [coupleNames, setCoupleNames] = useState(() => localStorage.getItem('couple-names') || 'Henrique & Brenda');
  const [subtitle, setSubtitle] = useState(() => localStorage.getItem('couple-subtitle') || 'Nossa Jornada Juntos');

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
      localStorage.setItem('bg-image', url);
      applyBgImage(url);
      addToast({ message: 'Imagem de fundo aplicada!', type: 'success' });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBgImage = () => {
    setBgImage('');
    localStorage.setItem('bg-image', '');
    document.body.style.background = '#0A0A0C';
    addToast({ message: 'Imagem de fundo removida.', type: 'info' });
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
    localStorage.removeItem('bg-image');
    localStorage.removeItem('couple-names');
    localStorage.removeItem('couple-subtitle');
    document.body.style.background = `url('/foto_02.jpg') center/cover no-repeat fixed`;
    setBgImage('/foto_02.jpg');
    setCoupleNames('Henrique & Brenda');
    setSubtitle('Nossa Jornada Juntos');
    addToast({ message: 'Configurações restauradas!', type: 'info' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-[#F0EDE8]">Configurações</h1>
        <p className="text-[#5A5650] mt-1">Personalize o app do seu jeito.</p>
      </div>

      {/* Theme */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Eye size={20} className="text-[#5A5650]" />
          <h2 className="text-lg font-bold text-[#F0EDE8]">Tema</h2>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { if (theme === 'dark') toggleTheme(); }} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all cursor-pointer ${theme === 'light' ? 'border-white/6/30 bg-[#1C1C22] text-[#F0EDE8]' : 'border-white/6 text-[#5A5650] hover:border-[#D4A574]/25'}`}>
            <Sun size={18} /> Claro
          </button>
          <button onClick={() => { if (theme === 'light') toggleTheme(); }} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all cursor-pointer ${theme === 'dark' ? 'border-white/6/30 bg-[#1C1C22] text-[#F0EDE8]' : 'border-white/6 text-[#5A5650] hover:border-[#D4A574]/25'}`}>
            <Moon size={18} /> Escuro
          </button>
        </div>
      </Card>

      {/* Background Image */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <ImageIcon size={20} className="text-[#5A5650]" />
          <h2 className="text-lg font-bold text-[#F0EDE8]">Imagem de Fundo</h2>
        </div>
        {bgImage ? (
          <div className="relative rounded-xl overflow-hidden h-32 group">
            <img src={bgImage} alt="Fundo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={handleRemoveBgImage} className="bg-red-500/50/80 text-[#F0EDE8] p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-red-600/90">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ) : (
          <label className="flex items-center justify-center h-24 border-2 border-dashed border-[#D4A574]/25 rounded-xl cursor-pointer hover:bg-[#141418]/50 transition-colors">
            <div className="text-center">
              <ImageIcon size={24} className="mx-auto text-[#5A5650] mb-1" />
              <span className="text-xs text-[#5A5650]">Clique para enviar imagem (máx. 10MB)</span>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
          </label>
        )}
      </Card>

      {/* Personalization */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Heart size={20} className="text-[#5A5650]" />
          <h2 className="text-lg font-bold text-[#F0EDE8]">Personalização</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Nomes do Casal</label>
            <input type="text" value={coupleNames} onChange={e => setCoupleNames(e.target.value)} className="glass-input py-2.5" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#5A5650] mb-1 uppercase tracking-wider">Subtítulo</label>
            <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="glass-input py-2.5" />
          </div>
          <Button onClick={handleSaveNames} size="sm">Salvar Nomes</Button>
        </div>
      </Card>

      {/* Data */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Download size={20} className="text-[#5A5650]" />
          <h2 className="text-lg font-bold text-[#F0EDE8]">Dados</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleExport} variant="secondary" className="gap-2"><Download size={16} />Exportar Backup</Button>
          <Button onClick={handleImport} variant="secondary" className="gap-2"><Upload size={16} />Importar Backup</Button>
          <Button onClick={handleReset} variant="ghost" className="gap-2 text-red-400/70 hover:bg-red-500/50/10"><RotateCcw size={16} />Restaurar Padrão</Button>
        </div>
      </Card>
    </motion.div>
  );
};
