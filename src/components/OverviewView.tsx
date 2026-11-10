import React from 'react';
import { ViewMode, ActivityItem, InsightCard } from '../types';
import { MOCK_INSIGHTS, MOCK_ACTIVITIES } from '../data/mockData';

interface OverviewViewProps {
  onSelectView: (view: ViewMode) => void;
  onOpenNewListing: () => void;
  onTriggerAiAction: (title: string, prompt: string) => void;
  onReviewListingPrice: (listingId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectView,
  onOpenNewListing,
  onTriggerAiAction,
  onReviewListingPrice
}) => {
  const [activities, setActivities] = React.useState<ActivityItem[]>(MOCK_ACTIVITIES);

  const handleDismissActivity = (id: string) => {
    setActivities((prev) => prev.filter((item) => item.id !== id));
  };

  const handleInsightClick = (insight: InsightCard) => {
    if (insight.aiPrompt) {
      onTriggerAiAction(insight.title, insight.aiPrompt);
    } else if (insight.targetView) {
      onSelectView(insight.targetView);
    }
  };

  return (
    <div className="space-y-lg animate-fadeIn pb-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-display text-[32px] sm:text-[36px] leading-tight font-bold text-on-surface tracking-tight">
            Morning Brief
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
            Here&apos;s what&apos;s happening with your real estate portfolio today.
          </p>
        </div>
        <div className="flex gap-sm shrink-0">
          <button
            onClick={() => alert('Exporting Morning Brief PDF Report to your desktop...')}
            className="px-md py-sm rounded-lg border border-outline-variant text-secondary bg-surface font-label-md text-label-md hover:bg-surface-container-low transition-all active:scale-95 cursor-pointer shadow-2xs"
          >
            Export Report
          </button>
          <button
            onClick={onOpenNewListing}
            className="px-md py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-[#172e6e] transition-all active:scale-95 shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Listing
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        {/* Metric 1 */}
        <div
          onClick={() => onSelectView('pipeline')}
          className="bg-surface-container-lowest/90 p-md rounded-xl border border-outline-variant/60 hover:border-primary/40 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm group"
        >
          <div className="flex justify-between items-start mb-sm">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider group-hover:text-primary transition-colors">
              Leads Generated
            </p>
            <span className="material-symbols-outlined text-secondary text-[20px] group-hover:text-primary transition-colors">
              person_add
            </span>
          </div>
          <div className="flex items-baseline gap-sm">
            <h3 className="font-headline-md text-[28px] font-bold text-on-surface">24</h3>
            <span className="font-label-sm text-label-sm text-[#16a34a] flex items-center font-semibold bg-[#dcfce7] px-1.5 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary mt-xs text-xs">vs. yesterday</p>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => alert('Opening appointments schedule: 12 viewings booked across 5 listings this week.')}
          className="bg-surface-container-lowest/90 p-md rounded-xl border border-outline-variant/60 hover:border-primary/40 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm group"
        >
          <div className="flex justify-between items-start mb-sm">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider group-hover:text-primary transition-colors">
              Total Appointments
            </p>
            <span className="material-symbols-outlined text-secondary text-[20px] group-hover:text-primary transition-colors">
              event
            </span>
          </div>
          <div className="flex items-baseline gap-sm">
            <h3 className="font-headline-md text-[28px] font-bold text-on-surface">12</h3>
            <span className="font-label-sm text-label-sm text-[#16a34a] flex items-center font-semibold bg-[#dcfce7] px-1.5 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 3%
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary mt-xs text-xs">scheduled this week</p>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onSelectView('listings')}
          className="bg-surface-container-lowest/90 p-md rounded-xl border border-outline-variant/60 hover:border-primary/40 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-sm relative z-10">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider group-hover:text-primary transition-colors">
              Active Listings
            </p>
            <span className="material-symbols-outlined text-secondary text-[20px] group-hover:text-primary transition-colors">
              real_estate_agent
            </span>
          </div>
          <div className="flex items-baseline gap-sm relative z-10">
            <h3 className="font-headline-md text-[28px] font-bold text-on-surface">156</h3>
          </div>
          <p className="font-body-md text-body-md text-secondary mt-xs text-xs relative z-10 font-medium">
            Total portfolio value: <span className="text-primary font-bold">$45.2M</span>
          </p>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => onSelectView('reports')}
          className="bg-surface-container-lowest/90 p-md rounded-xl border border-outline-variant/60 hover:border-primary/40 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm group"
        >
          <div className="flex justify-between items-start mb-sm">
            <div className="flex items-center gap-xs">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider group-hover:text-primary transition-colors">
                Conversion Rate
              </p>
            </div>
            <span className="material-symbols-outlined text-secondary text-[20px] group-hover:text-primary transition-colors">
              pie_chart
            </span>
          </div>
          <div className="flex items-baseline gap-sm">
            <h3 className="font-headline-md text-[28px] font-bold text-on-surface">4.2%</h3>
            <span className="font-label-sm text-label-sm text-error flex items-center font-semibold bg-error-container/60 px-1.5 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">arrow_downward</span> 0.5%
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary mt-xs text-xs">Lead to close ratio</p>
        </div>
      </div>

      {/* Bento Grid Layout for Insights and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md items-stretch">
        {/* Actionable Insights Area (Spans 2 columns) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-md min-h-[420px]">
          {MOCK_INSIGHTS.map((insight) => {
            const isError = insight.theme === 'error';
            const isTertiary = insight.theme === 'tertiary';

            const badgeBg = isError
              ? 'bg-error-container text-error'
              : isTertiary
              ? 'bg-tertiary-fixed text-tertiary'
              : 'bg-primary-fixed text-primary';

            const borderColor = isError
              ? 'hover:border-error/50'
              : isTertiary
              ? 'hover:border-tertiary/50'
              : 'hover:border-primary/50';

            const actionTextColor = isError
              ? 'text-error group-hover:text-on-error-container'
              : isTertiary
              ? 'text-tertiary group-hover:text-tertiary-container'
              : 'text-primary group-hover:text-primary-container';

            return (
              <div
                key={insight.id}
                onClick={() => handleInsightClick(insight)}
                className={`bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs p-lg flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:shadow-md ${borderColor}`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-md group-hover:scale-105 transition-transform ${badgeBg}`}>
                    <span className="material-symbols-outlined text-[24px]">
                      {insight.icon}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-[18px] font-bold text-on-surface mb-xs group-hover:text-primary transition-colors">
                    {insight.title}
                  </h3>
                  <p className="font-body-md text-body-md text-secondary mt-sm leading-relaxed">
                    {insight.description}
                  </p>
                </div>
                <div className={`mt-md flex items-center font-label-md text-label-md transition-colors ${actionTextColor}`}>
                  {insight.actionText}
                  <span className="material-symbols-outlined text-[18px] ml-xs group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs p-lg flex flex-col min-h-[420px]">
          <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm shrink-0">
            <h3 className="font-headline-md text-[18px] font-bold text-on-surface">Recent Activity</h3>
            <button
              onClick={() => onSelectView('pipeline')}
              className="text-primary hover:text-primary-container font-label-md text-label-md transition-colors flex items-center gap-0.5"
            >
              View All
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-sm space-y-md">
            {activities.map((act, index) => {
              const isLast = index === activities.length - 1;
              return (
                <div key={act.id} className="flex gap-sm relative">
                  <div className="relative flex flex-col items-center shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-2xs ${act.bgClass} ${act.colorClass}`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {act.icon}
                      </span>
                    </div>
                    {!isLast && (
                      <div className="w-px h-full bg-outline-variant absolute top-8 bottom-0 left-1/2 -translate-x-1/2" />
                    )}
                  </div>

                  <div className="pb-sm flex-1 min-w-0">
                    <p className="font-body-md text-body-md text-on-surface leading-snug">
                      {act.title.includes('Sarah Jenkins') ? (
                        <>
                          <strong className="text-on-surface">Sarah Jenkins</strong> closed a deal on 124 Maple St.
                        </>
                      ) : act.title.includes('Unit 4B') ? (
                        <>
                          New viewing scheduled for <strong className="text-on-surface">Unit 4B, The Vista</strong>.
                        </>
                      ) : act.title.includes('88 Oak Ave') ? (
                        <>
                          AI suggested a price adjustment for <strong className="text-on-surface">88 Oak Ave</strong> based on market trends.
                        </>
                      ) : act.title.includes('Michael T.') ? (
                        <>
                          New lead assigned to <strong className="text-on-surface">Michael T.</strong>
                        </>
                      ) : (
                        act.title
                      )}
                    </p>

                    {act.actions && act.actions.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {act.actions.map((actionBtn) => (
                          <button
                            key={actionBtn.label}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (actionBtn.actionType === 'review_price' && actionBtn.targetId) {
                                onReviewListingPrice(actionBtn.targetId);
                              } else if (actionBtn.actionType === 'dismiss') {
                                handleDismissActivity(act.id);
                              }
                            }}
                            className={
                              actionBtn.actionType === 'review_price'
                                ? 'px-2.5 py-1 bg-surface border border-outline-variant rounded text-xs font-label-md hover:bg-primary hover:text-on-primary hover:border-primary transition-all font-semibold shadow-2xs cursor-pointer'
                                : 'px-2.5 py-1 text-secondary text-xs font-label-md hover:text-on-surface hover:bg-surface-container-low rounded transition-colors cursor-pointer'
                            }
                          >
                            {actionBtn.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <p className="font-label-sm text-[11px] text-outline mt-xs">
                      {act.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
