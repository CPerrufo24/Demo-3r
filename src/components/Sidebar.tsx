import React from 'react';
import { ViewMode } from '../types';
import { useLanguage } from '../lib/i18n.tsx';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onToggleAiPanel: () => void;
  aiPanelOpen: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  onToggleAiPanel,
  aiPanelOpen,
  isOpen,
  onClose
}) => {
  const { t } = useLanguage();

  const handleSelect = (view: ViewMode) => {
    onSelectView(view);
    onClose();
  };

  const navItems: { id: ViewMode; label: string; icon: string; fill?: boolean }[] = [
    { id: 'overview', label: t('nav.overview'), icon: 'dashboard', fill: currentView === 'overview' },
    { id: 'pipeline', label: t('nav.pipeline'), icon: 'account_tree', fill: currentView === 'pipeline' },
    { id: 'listings', label: t('nav.listings'), icon: 'home_work', fill: currentView === 'listings' },
    { id: 'clients', label: t('nav.clients'), icon: 'groups', fill: currentView === 'clients' },
    { id: 'sources', label: t('nav.sources'), icon: 'hub', fill: currentView === 'sources' },
    { id: 'reports', label: t('nav.reports'), icon: 'analytics', fill: currentView === 'reports' },
  ];

  return (
    <>
      {/* Mobile/split-screen backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-on-surface/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`bg-surface dark:bg-inverse-surface h-screen w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-outline flex flex-col p-md z-50 transition-transform duration-200 select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
      <div className="mb-lg px-sm flex items-start justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">
            EstatePro CRM
          </h1>
          <p className="font-body-md text-body-md text-secondary mt-xs">
            {t('sidebar.tagline')}
          </p>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <nav className="flex-1 space-y-sm overflow-y-auto pr-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all duration-150 active:scale-98 text-left ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-xs'
                  : 'text-secondary hover:bg-surface-container-low dark:hover:bg-surface-variant font-medium'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: item.fill ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-body-md text-body-md">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-sm pt-md border-t border-outline-variant">
        <button
          onClick={onToggleAiPanel}
          className={`w-full flex justify-center items-center gap-xs p-sm rounded-lg transition-all duration-150 active:scale-95 font-label-md text-label-md shadow-sm ${
            aiPanelOpen
              ? 'bg-primary-container text-on-primary-container ring-2 ring-primary-fixed-dim'
              : 'bg-primary text-on-primary hover:bg-[#172e6e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-sm text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          {t('sidebar.aiInsight')}
        </button>

        <div className="flex flex-col gap-xs pt-xs">
          <button
            onClick={() => alert(t('sidebar.settingsAlert'))}
            className="w-full flex items-center gap-sm p-sm text-secondary hover:bg-surface-container-low transition-colors rounded-lg text-left"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-body-md text-body-md">{t('sidebar.settings')}</span>
          </button>
          <button
            onClick={() => alert(t('sidebar.supportAlert'))}
            className="w-full flex items-center gap-sm p-sm text-secondary hover:bg-surface-container-low transition-colors rounded-lg text-left"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span className="font-body-md text-body-md">{t('sidebar.support')}</span>
          </button>
        </div>
      </div>
      </aside>
    </>
  );
};
