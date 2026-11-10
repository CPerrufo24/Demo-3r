import React from 'react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onToggleAiPanel: () => void;
  aiPanelOpen: boolean;
  onOpenDesignSystem?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  onToggleAiPanel,
  aiPanelOpen,
  onOpenDesignSystem
}) => {
  const navItems: { id: ViewMode; label: string; icon: string; fill?: boolean }[] = [
    { id: 'overview', label: 'Overview', icon: 'dashboard', fill: currentView === 'overview' },
    { id: 'pipeline', label: 'Pipeline', icon: 'account_tree', fill: currentView === 'pipeline' },
    { id: 'listings', label: 'Listings', icon: 'home_work', fill: currentView === 'listings' },
    { id: 'clients', label: 'Clients', icon: 'groups', fill: currentView === 'clients' },
    { id: 'reports', label: 'Reports', icon: 'analytics', fill: currentView === 'reports' },
  ];

  return (
    <aside className="bg-surface dark:bg-inverse-surface h-screen w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-outline flex flex-col p-md z-50 transition-colors duration-200 select-none">
      <div className="mb-lg px-sm">
        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">
          EstatePro CRM
        </h1>
        <p className="font-body-md text-body-md text-secondary mt-xs">
          Elite Realty Group
        </p>
      </div>

      <nav className="flex-1 space-y-sm overflow-y-auto pr-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
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
          AI Insight
        </button>

        <div className="flex flex-col gap-xs pt-xs">
          <button
            onClick={onOpenDesignSystem}
            className="w-full flex items-center gap-sm p-sm text-primary font-bold hover:bg-primary/10 transition-colors rounded-lg text-left bg-primary/5 border border-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">palette</span>
            <span className="font-body-md text-body-md">Color Palette</span>
          </button>
          <button
            onClick={onOpenDesignSystem || (() => alert('Settings: Custom preferences, AI model parameters, and API integration tools.'))}
            className="w-full flex items-center gap-sm p-sm text-secondary hover:bg-surface-container-low transition-colors rounded-lg text-left"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-body-md text-body-md">Settings</span>
          </button>
          <button
            onClick={() => alert('Support: 24/7 Elite Realty AI Concierge & Agent Helpline is active.')}
            className="w-full flex items-center gap-sm p-sm text-secondary hover:bg-surface-container-low transition-colors rounded-lg text-left"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span className="font-body-md text-body-md">Support</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
