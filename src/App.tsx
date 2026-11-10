import React, { useState } from 'react';
import { ViewMode, Lead, Listing } from './types';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { OverviewView } from './components/OverviewView';
import { PipelineView } from './components/PipelineView';
import { ListingsView } from './components/ListingsView';
import { ClientsView } from './components/ClientsView';
import { ReportsView } from './components/ReportsView';
import { SalesIntelligencePanel } from './components/SalesIntelligencePanel';
import { NewListingModal } from './components/NewListingModal';
import { LeadDetailModal } from './components/LeadDetailModal';
import { DesignSystemModal } from './components/DesignSystemModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [aiPanelOpen, setAiPanelOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isNewListingOpen, setIsNewListingOpen] = useState<boolean>(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');
  const [highlightListingId, setHighlightListingId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState<boolean>(false);

  const handleSelectView = (view: ViewMode) => {
    setCurrentView(view);
    if (highlightListingId && view !== 'listings') {
      setHighlightListingId(null);
    }
  };

  const handleToggleAiPanel = () => {
    setAiPanelOpen((prev) => !prev);
  };

  const handleTriggerAiAction = (title: string, prompt: string) => {
    setAiInitialQuery(prompt);
    setAiPanelOpen(true);
  };

  const handleReviewListingPrice = (listingId: string) => {
    setCurrentView('listings');
    setHighlightListingId(listingId);
  };

  const handleAddListing = (newListing: Listing) => {
    alert(`Listing "${newListing.title}" at ${newListing.address} created successfully!`);
    setCurrentView('listings');
    setHighlightListingId(newListing.id);
  };

  // When AI panel is open in Pipeline view (like Screen 1), we apply blur effect to main content
  const isScreen1Mode = aiPanelOpen && currentView === 'pipeline';

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
      {/* Top Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleAiPanel={handleToggleAiPanel}
        aiPanelOpen={aiPanelOpen}
        onOpenNotifications={() => setShowNotifications(!showNotifications)}
        unreadCount={3}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      />

      {/* Left Navigation Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={handleSelectView}
        onToggleAiPanel={handleToggleAiPanel}
        aiPanelOpen={aiPanelOpen}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      />

      {/* Main Content Canvas */}
      <main className="ml-64 mt-16 flex-1 relative flex min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Main Workspace Area (with blur if in Screen 1 Mode or normal) */}
        <div
          className={`flex-1 p-lg overflow-y-auto transition-all duration-300 w-full ${
            isScreen1Mode
              ? 'blur-[2px] opacity-60 pointer-events-none bg-surface-container-low select-none pr-[420px]'
              : aiPanelOpen
              ? 'pr-0 sm:pr-[420px]'
              : 'pr-0'
          }`}
        >
          <div className="max-w-container-max mx-auto">
            {currentView === 'overview' && (
              <OverviewView
                onSelectView={handleSelectView}
                onOpenNewListing={() => setIsNewListingOpen(true)}
                onTriggerAiAction={handleTriggerAiAction}
                onReviewListingPrice={handleReviewListingPrice}
              />
            )}

            {currentView === 'pipeline' && (
              <PipelineView
                onSelectLead={setSelectedLead}
                onTriggerAiAction={handleTriggerAiAction}
              />
            )}

            {currentView === 'listings' && (
              <ListingsView
                onOpenNewListing={() => setIsNewListingOpen(true)}
                onTriggerAiAction={handleTriggerAiAction}
                highlightListingId={highlightListingId}
              />
            )}

            {currentView === 'clients' && (
              <ClientsView
                onTriggerAiAction={handleTriggerAiAction}
              />
            )}

            {currentView === 'reports' && (
              <ReportsView
                onTriggerAiAction={handleTriggerAiAction}
              />
            )}
          </div>
        </div>

        {/* AI Sales Intelligence Command Center Overlay (Right Panel) */}
        <SalesIntelligencePanel
          isOpen={aiPanelOpen}
          onClose={() => setAiPanelOpen(false)}
          currentContext={currentView}
          initialQuery={aiInitialQuery}
        />
      </main>

      {/* Modals */}
      <NewListingModal
        isOpen={isNewListingOpen}
        onClose={() => setIsNewListingOpen(false)}
        onAddListing={handleAddListing}
        onTriggerAiAction={handleTriggerAiAction}
      />

      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onTriggerAiAction={handleTriggerAiAction}
      />

      <DesignSystemModal
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />

      {/* Notifications Popover */}
      {showNotifications && (
        <div className="fixed top-16 right-16 z-50 w-80 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-2xl p-4 animate-fadeIn">
          <div className="flex justify-between items-center border-b border-outline-variant/60 pb-2 mb-3">
            <h4 className="font-bold text-sm text-on-surface">Notifications & Briefs</h4>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-xs text-primary hover:underline font-semibold"
            >
              Mark all read
            </button>
          </div>
          <div className="space-y-3 text-xs">
            <div
              onClick={() => {
                setShowNotifications(false);
                handleSelectView('pipeline');
              }}
              className="p-2.5 rounded-lg bg-primary-fixed/40 border border-primary/20 cursor-pointer hover:bg-primary-fixed transition-colors"
            >
              <div className="font-bold text-primary flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[14px]">event_available</span>
                3 Buyers Ready for Tour
              </div>
              <p className="text-on-surface leading-tight">Sarah Jenkins and Michael Chang requested weekend viewings.</p>
            </div>
            <div
              onClick={() => {
                setShowNotifications(false);
                handleReviewListingPrice('list-3');
              }}
              className="p-2.5 rounded-lg bg-error-container/40 border border-error/20 cursor-pointer hover:bg-error-container transition-colors"
            >
              <div className="font-bold text-error flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[14px]">price_change</span>
                Price Adjustment Recommended
              </div>
              <p className="text-on-surface leading-tight">88 Oak Ave has been active for 48 days. AI suggested a 3% adjustment.</p>
            </div>
            <div
              onClick={() => {
                setShowNotifications(false);
                handleSelectView('listings');
              }}
              className="p-2.5 rounded-lg bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              <div className="font-bold text-secondary flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                1 Hot Listing at Risk
              </div>
              <p className="text-on-surface leading-tight">124 Maple St seller reported dissatisfaction with foot traffic.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
