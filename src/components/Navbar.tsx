import React from 'react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleAiPanel: () => void;
  aiPanelOpen: boolean;
  onOpenNotifications: () => void;
  unreadCount?: number;
  onOpenDesignSystem?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onToggleAiPanel,
  aiPanelOpen,
  onOpenNotifications,
  unreadCount = 3,
  onOpenDesignSystem
}) => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 flex justify-between items-center px-lg z-40 bg-surface-container-lowest dark:bg-surface-dim border-b border-outline-variant dark:border-outline transition-all duration-200 select-none">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-sm text-outline font-label-md text-label-md">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search leads, listings, or clients..."
            className="w-full pl-[36px] pr-sm py-sm rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 font-body-md text-body-md outline-none transition-all text-on-surface"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-sm text-outline hover:text-on-surface p-1 flex items-center"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-md text-primary dark:text-primary-fixed">
        <button
          onClick={onOpenDesignSystem}
          className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-primary/30"
          title="View Executive Precision Design System & Color Palette"
        >
          <span className="material-symbols-outlined text-[16px]">palette</span>
          <span className="hidden sm:inline">Executive Palette</span>
        </button>

        <button
          onClick={onOpenNotifications}
          className="relative text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-all duration-200 p-xs rounded-full hover:bg-surface-container-low flex items-center justify-center"
          title="Notifications & Briefs"
        >
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container-lowest" />
          )}
        </button>

        <button
          onClick={onToggleAiPanel}
          className={`p-xs transition-all duration-200 flex items-center justify-center rounded-md ${
            aiPanelOpen
              ? 'text-primary border-b-2 border-primary pb-1 bg-primary/5 font-bold'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
          }`}
          title="Toggle Sales Intelligence Panel"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: aiPanelOpen ? "'FILL' 1" : "'FILL' 0" }}
          >
            auto_awesome
          </span>
        </button>

        <button
          onClick={() => alert('Agent Profile: Elena Rostova (Senior Vice President - Elite Realty Group)')}
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-all duration-200 p-xs rounded-full hover:bg-surface-container-low flex items-center justify-center overflow-hidden border border-outline-variant/60"
          title="View Agent Profile"
        >
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
            alt="Agent Profile"
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              // fallback to icon if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="material-symbols-outlined text-[26px] hidden">account_circle</span>
        </button>
      </div>
    </header>
  );
};
