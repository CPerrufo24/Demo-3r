import React from 'react';
import { motion } from 'motion/react';
import { ViewMode, ActivityItem, InsightCard } from '../types';
import { MOCK_INSIGHTS, MOCK_ACTIVITIES } from '../data/mockData';
import { useLanguage } from '../lib/i18n.tsx';

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
  const { t } = useLanguage();
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
            {t('overview.title')}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
            {t('overview.subtitle')}
          </p>
        </div>
        <div className="flex gap-sm shrink-0">
          <button
            onClick={() => alert(t('overview.exportAlert'))}
            className="px-md py-sm rounded-lg border border-outline-variant text-secondary bg-surface font-label-md text-label-md hover:bg-surface-container-low transition-all active:scale-95 cursor-pointer shadow-2xs"
          >
            {t('overview.exportReport')}
          </button>
          <button
            onClick={onOpenNewListing}
            className="px-md py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-[#172e6e] transition-all active:scale-95 shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            {t('overview.newListing')}
          </button>
        </div>
      </div>

      {/* Bento Grid Layout for Insights and Activity Feed — the actions ARE the dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md items-stretch">
        {/* Actionable Insights Area (Spans 2 columns) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-md min-h-[420px]">
          {MOCK_INSIGHTS.map((insight, index) => {
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
              <motion.div
                key={insight.id}
                onClick={() => handleInsightClick(insight)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -2 }}
                className={`bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs p-lg flex flex-col justify-between transition-shadow duration-200 cursor-pointer group hover:shadow-md ${borderColor}`}
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
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs p-lg flex flex-col min-h-[420px]">
          <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm shrink-0">
            <h3 className="font-headline-md text-[18px] font-bold text-on-surface">{t('overview.recentActivity')}</h3>
            <button
              onClick={() => onSelectView('pipeline')}
              className="text-primary hover:text-primary-container font-label-md text-label-md transition-colors flex items-center gap-0.5"
            >
              {t('overview.viewAll')}
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
                          <strong className="text-on-surface">Sarah Jenkins</strong> cerró un trato en 124 Maple St.
                        </>
                      ) : act.title.includes('Unit 4B') ? (
                        <>
                          Nueva visita agendada para <strong className="text-on-surface">Unit 4B, The Vista</strong>.
                        </>
                      ) : act.title.includes('88 Oak Ave') ? (
                        <>
                          La IA sugirió un ajuste de precio para <strong className="text-on-surface">88 Oak Ave</strong> según tendencias de mercado.
                        </>
                      ) : act.title.includes('Michael T.') ? (
                        <>
                          Nuevo lead asignado a <strong className="text-on-surface">Michael T.</strong>
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

      {/* Slim metrics strip — the underlying numbers, kept secondary to the actions above */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-outline-variant rounded-xl border border-outline-variant bg-surface-container-lowest/60">
        <button
          onClick={() => onSelectView('pipeline')}
          className="p-sm sm:p-md text-left hover:bg-surface-container-low/60 transition-colors cursor-pointer"
        >
          <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{t('overview.metricLeads')}</p>
          <p className="mt-0.5"><span className="font-headline-md text-[20px] font-bold text-on-surface">24</span> <span className="text-[11px] font-semibold text-[#16a34a]">↑12%</span></p>
        </button>
        <button
          onClick={() => alert(t('overview.appointmentsAlert'))}
          className="p-sm sm:p-md text-left hover:bg-surface-container-low/60 transition-colors cursor-pointer"
        >
          <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{t('overview.metricAppointments')}</p>
          <p className="mt-0.5"><span className="font-headline-md text-[20px] font-bold text-on-surface">12</span> <span className="text-[11px] font-semibold text-[#16a34a]">↑3%</span></p>
        </button>
        <button
          onClick={() => onSelectView('listings')}
          className="p-sm sm:p-md text-left hover:bg-surface-container-low/60 transition-colors cursor-pointer"
        >
          <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{t('overview.metricActiveListings')}</p>
          <p className="mt-0.5"><span className="font-headline-md text-[20px] font-bold text-on-surface">156</span> <span className="text-[11px] text-secondary">· $45.2M</span></p>
        </button>
        <button
          onClick={() => onSelectView('reports')}
          className="p-sm sm:p-md text-left hover:bg-surface-container-low/60 transition-colors cursor-pointer"
        >
          <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{t('overview.metricConversion')}</p>
          <p className="mt-0.5"><span className="font-headline-md text-[20px] font-bold text-on-surface">4.2%</span> <span className="text-[11px] font-semibold text-error">↓0.5%</span></p>
        </button>
      </div>
    </div>
  );
};
