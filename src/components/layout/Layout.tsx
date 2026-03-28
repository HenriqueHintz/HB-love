import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Heart, LayoutDashboard, Image as ImageIcon, Trophy, Clock, Menu, X, Sun, Moon, LogOut, Download, Upload, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';
import { ToastContainer } from '../ui/Toast';

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useStore(state => state.theme);
  const toggleTheme = useStore(state => state.toggleTheme);
  const toasts = useStore(state => state.toasts);
  const removeToast = useStore(state => state.removeToast);
  const exportData = useStore(state => state.exportData);
  const importData = useStore(state => state.importData);
  const addToast = useStore(state => state.addToast);
  const navigate = useNavigate();

  const navItems = [
    { to: '/painel', icon: LayoutDashboard, label: 'Painel de Metas' },
    { to: '/memorias', icon: ImageIcon, label: 'Memórias' },
    { to: '/conquistas', icon: Trophy, label: 'Conquistas' },
    { to: '/linha-do-tempo', icon: Clock, label: 'Linha do Tempo' },
    { to: '/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nossa-jornada-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ message: 'Backup exportado com sucesso!', type: 'success' });
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
        const success = importData(reader.result as string);
        if (success) {
          addToast({ message: 'Dados importados com sucesso!', type: 'success' });
        } else {
          addToast({ message: 'Erro ao importar. Verifique o arquivo.', type: 'error' });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleLogout = () => {
    useStore.setState({ isAuthenticated: false });
    navigate('/');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      {/* Ambient background blurs for cinematic noir feel */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#D4A574]/5 rounded-full blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-[#C97B8B]/5 rounded-full blur-[100px]" />
      </div>
      {/* Mobile header bar */}
      <div className="md:hidden flex items-center justify-between p-4 glass-panel border-b border-app-border-light sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full shadow-lg overflow-hidden border-2 border-[#D4A574]/25">
            <img src="/foto_01.jpg" alt="Casal" className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-app-text text-sm">H & B</span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-xl hover:bg-app-surface-light text-app-text-secondary cursor-pointer"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 sidebar-overlay md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-64 glass-panel border-r border-app-border-light flex flex-col p-6 shrink-0 transition-transform duration-300 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full shadow-xl overflow-hidden border-2 border-[#D4A574]/25">
              <img src="/foto_01.jpg" alt="Casal" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-semibold text-app-text leading-tight">Henrique & Brenda</h1>
              <p className="text-xs text-app-text-muted">Nossa Jornada Juntos</p>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="md:hidden text-app-text-muted hover:text-app-text-secondary cursor-pointer"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-[#D4A574]/10 text-[#D4A574] shadow-sm border border-[#D4A574]/30" 
                  : "text-app-text-secondary hover:bg-app-surface hover:text-app-text/80"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer actions */}
        <div className="border-t border-app-border-light pt-4 mt-4 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-app-text-muted hover:bg-app-surface hover:text-app-text-secondary transition-colors cursor-pointer"
              title="Exportar dados"
            >
              <Download size={14} />
              Exportar
            </button>
            <button
              onClick={handleImport}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-app-text-muted hover:bg-app-surface hover:text-app-text-secondary transition-colors cursor-pointer"
              title="Importar dados"
            >
              <Upload size={14} />
              Importar
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-app-text-muted hover:bg-app-surface hover:text-app-text-secondary transition-colors cursor-pointer"
              title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              {theme === 'light' ? 'Escuro' : 'Claro'}
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-app-text-muted hover:bg-app-surface hover:text-app-text-secondary transition-colors cursor-pointer"
              title="Sair"
            >
              <LogOut size={14} />
              Sair
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
