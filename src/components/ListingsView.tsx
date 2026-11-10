import React, { useState } from 'react';
import { Listing } from '../types';
import { MOCK_LISTINGS } from '../data/mockData';

interface ListingsViewProps {
  onOpenNewListing: () => void;
  onTriggerAiAction: (title: string, prompt: string) => void;
  highlightListingId?: string | null;
}

export const ListingsView: React.FC<ListingsViewProps> = ({
  onOpenNewListing,
  onTriggerAiAction,
  highlightListingId
}) => {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = listings.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  const handleApplyPriceSuggestion = (id: string, newPrice?: number) => {
    if (!newPrice) return;
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: newPrice, status: 'active' } : item))
    );
    alert(`Price updated successfully to $${newPrice.toLocaleString()}!`);
  };

  return (
    <div className="space-y-lg animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-[28px] font-bold text-on-surface tracking-tight">
            Property Listings
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Manage your real estate portfolio, pricing strategies, and AI valuation insights.
          </p>
        </div>
        <div className="flex gap-sm">
          <button
            onClick={() =>
              onTriggerAiAction(
                'Portfolio Valuation & Comps Audit',
                'Analyze our 156 active listings and identify any properties with high days on market that require immediate pricing adjustments or marketing boosts.'
              )
            }
            className="px-md py-sm rounded-lg border border-primary/40 text-primary bg-primary-fixed/30 font-label-md text-label-md hover:bg-primary-fixed/50 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            AI Portfolio Audit
          </button>
          <button
            onClick={onOpenNewListing}
            className="px-md py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-[#172e6e] transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Listing
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-3 items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-2xs">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-outline mr-1 uppercase tracking-wider">Type:</span>
          {['all', 'Single Family', 'Condo', 'Multi-Family', 'Commercial'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-primary text-on-primary shadow-2xs'
                  : 'bg-surface-container-low text-secondary hover:bg-surface-container'
              }`}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-outline mr-1 uppercase tracking-wider">Status:</span>
          {[
            { id: 'all', label: 'All Statuses' },
            { id: 'active', label: 'Active' },
            { id: 'at_risk', label: 'At Risk / Needs Review' },
            { id: 'pending', label: 'Pending' },
            { id: 'sold', label: 'Sold' },
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setFilterStatus(status.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === status.id
                  ? 'bg-secondary-container text-on-secondary-container shadow-2xs'
                  : 'bg-surface-container-low text-secondary hover:bg-surface-container'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {filtered.map((item) => {
          const isHighlighted = highlightListingId === item.id;
          const hasAi = !!item.aiRecommendation;
          const isRisk = item.status === 'at_risk';

          return (
            <div
              key={item.id}
              className={`bg-surface-container-lowest rounded-xl border overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${
                isHighlighted
                  ? 'ring-2 ring-primary border-primary bg-primary/2 animate-pulse'
                  : isRisk
                  ? 'border-error/60'
                  : 'border-outline-variant hover:border-primary/40'
              }`}
            >
              <div>
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                      item.status === 'active'
                        ? 'bg-[#dcfce7] text-[#16a34a]'
                        : item.status === 'at_risk'
                        ? 'bg-error text-on-error animate-bounce'
                        : item.status === 'pending'
                        ? 'bg-tertiary-fixed text-tertiary'
                        : 'bg-surface-container-high text-on-surface'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                    <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-semibold px-2.5 py-1 rounded-full text-xs shadow-sm">
                      {item.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-on-surface/80 backdrop-blur-sm text-on-primary px-3 py-1 rounded-lg font-mono text-xs font-bold">
                    {item.daysOnMarket} DOM
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-headline-md text-[18px] font-bold text-on-surface leading-tight">
                      {item.address}
                    </h3>
                    <span className="font-headline-md text-[18px] font-bold text-primary shrink-0">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="font-body-md text-xs text-secondary">{item.title}</p>

                  <div className="flex items-center gap-4 text-xs text-on-surface-variant pt-1 border-t border-outline-variant/40">
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[16px]">bed</span>
                      {item.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[16px]">shower</span>
                      {item.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[16px]">square_foot</span>
                      {item.sqft.toLocaleString()} SqFt
                    </span>
                  </div>

                  {item.clientName && (
                    <p className="text-[11px] text-outline pt-1">
                      Seller: <strong className="text-secondary">{item.clientName}</strong>
                    </p>
                  )}
                </div>
              </div>

              {/* AI Recommendation Box if any */}
              {hasAi && item.aiRecommendation && (
                <div className="p-3 mx-3 mb-3 bg-[#E0E7FF]/70 rounded-lg border border-[#c7d2fe] text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#3730A3]">
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    AI Pricing & Marketing Insight
                  </div>
                  <p className="text-on-surface leading-relaxed">{item.aiRecommendation.message}</p>
                  
                  <div className="flex justify-end gap-2 pt-1">
                    {item.aiRecommendation.suggestedPrice && (
                      <button
                        onClick={() => handleApplyPriceSuggestion(item.id, item.aiRecommendation?.suggestedPrice)}
                        className="px-2.5 py-1 bg-[#3730A3] text-on-primary rounded font-bold hover:bg-[#312e81] transition-colors cursor-pointer shadow-2xs"
                      >
                        Apply Price: ${item.aiRecommendation.suggestedPrice.toLocaleString()}
                      </button>
                    )}
                    <button
                      onClick={() =>
                        onTriggerAiAction(
                          `Strategic Review: ${item.address}`,
                          `Analyze ${item.address} (${item.title}, ${item.bedrooms} bed, ${item.sqft} sqft) listed at $${item.price.toLocaleString()} with ${item.daysOnMarket} days on market. Generate marketing action plan and seller briefing.`
                        )
                      }
                      className="px-2.5 py-1 bg-surface-container-lowest border border-outline-variant text-on-surface rounded font-medium hover:bg-surface-container-low transition-colors cursor-pointer"
                    >
                      Inspect AI Plan
                    </button>
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="p-3 bg-surface-container-low/60 border-t border-outline-variant/60 flex justify-between items-center text-xs">
                <button
                  onClick={() => alert(`Opening virtual 3D tour and floor plan for ${item.address}.`)}
                  className="text-secondary hover:text-primary font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                  Virtual Tour
                </button>
                <button
                  onClick={() =>
                    onTriggerAiAction(
                      `Listing Copy: ${item.address}`,
                      `Write an MLS listing description and luxury Instagram caption for ${item.address}: ${item.title}, $${item.price.toLocaleString()}.`
                    )
                  }
                  className="text-primary hover:text-primary-container font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  AI Copywriter
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
