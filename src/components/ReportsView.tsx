import React from 'react';
import { useLanguage } from '../lib/i18n.tsx';

interface ReportsViewProps {
  onTriggerAiAction: (title: string, prompt: string) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onTriggerAiAction }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-lg animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-[28px] font-bold text-on-surface tracking-tight">
            {t('reports.title')}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            {t('reports.subtitle')}
          </p>
        </div>
        <div className="flex gap-sm">
          <button
            onClick={() =>
              onTriggerAiAction(
                'AI Executive Forecast Report',
                'Synthesize portfolio performance: $45.2M total active inventory across 156 properties, 4.2% conversion rate, and 24 new leads today. Generate Q3 forecast for 3R Connect.'
              )
            }
            className="px-md py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-[#172e6e] transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            {t('reports.generateForecast')}
          </button>
        </div>
      </div>

      {/* Top Stat Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-2xs">
          <p className="text-xs font-bold text-outline uppercase tracking-wider mb-1">{t('reports.totalPortfolioValue')}</p>
          <h3 className="text-3xl font-bold text-primary">$45,200,000</h3>
          <p className="text-xs text-[#16a34a] font-semibold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            {t('reports.vsPrevQuarter')}
          </p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-2xs">
          <p className="text-xs font-bold text-outline uppercase tracking-wider mb-1">{t('reports.avgDom')}</p>
          <h3 className="text-3xl font-bold text-on-surface">26.4 {t('reports.days')}</h3>
          <p className="text-xs text-[#16a34a] font-semibold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
            {t('reports.fasterThanRegional')}
          </p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-2xs">
          <p className="text-xs font-bold text-outline uppercase tracking-wider mb-1">{t('reports.leadConversionVelocity')}</p>
          <h3 className="text-3xl font-bold text-on-surface">4.2%</h3>
          <p className="text-xs text-secondary font-medium mt-2">
            {t('reports.avgDaysToClose')}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        {/* Monthly Sales Volume */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-2xs flex flex-col justify-between h-[360px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline-md text-[18px] font-bold text-on-surface">{t('reports.monthlySales')}</h3>
              <p className="text-xs text-secondary">{t('reports.closedTransactionValue')}</p>
            </div>
            <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-2.5 py-1 rounded-full">
              {t('reports.recordGrowth')}
            </span>
          </div>

          <div className="flex items-end justify-between h-48 px-4 border-b border-outline-variant/60 pb-2 gap-4">
            {[
              { month: 'Mar', val: 5.2, height: '45%' },
              { month: 'Abr', val: 6.8, height: '60%' },
              { month: 'May', val: 5.9, height: '52%' },
              { month: 'Jun', val: 8.4, height: '75%' },
              { month: 'Jul', val: 9.1, height: '82%' },
              { month: 'Ago', val: 11.2, height: '100%' },
            ].map((bar) => (
              <div key={bar.month} className="flex flex-col items-center flex-1 h-full justify-end group">
                <span className="text-xs font-bold text-on-surface opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  ${bar.val}M
                </span>
                <div
                  style={{ height: bar.height }}
                  className="w-full bg-primary/80 group-hover:bg-primary rounded-t-md transition-all duration-300"
                />
                <span className="text-xs font-semibold text-secondary mt-2">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Conversion Pipeline Breakdown */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-2xs flex flex-col justify-between h-[360px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline-md text-[18px] font-bold text-on-surface">{t('reports.leadStageDistribution')}</h3>
              <p className="text-xs text-secondary">{t('reports.currentPipelineVolume')}</p>
            </div>
            <span className="text-xs font-bold bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full">
              184 {t('reports.totalLeads')}
            </span>
          </div>

          <div className="space-y-4 my-auto">
            {[
              { label: 'Nuevos Leads / Consultas', count: 86, pct: '46%', color: 'bg-primary' },
              { label: 'Calificados y en Recorrido', count: 52, pct: '28%', color: 'bg-tertiary-container' },
              { label: 'En Negociación / Ofertas', count: 32, pct: '17%', color: 'bg-[#3730A3]' },
              { label: 'Cerrando Escrow', count: 14, pct: '9%', color: 'bg-[#16a34a]' },
            ].map((stage) => (
              <div key={stage.label} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-on-surface">
                  <span>{stage.label}</span>
                  <span>{stage.count} ({stage.pct})</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full ${stage.color} rounded-full transition-all duration-500`} style={{ width: stage.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
