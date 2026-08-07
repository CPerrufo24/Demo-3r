import React from 'react';
import type { Listing } from '../types';
import { MarketHealthRadar } from './MarketHealthRadar';
import { SourceBadge } from './SourceBadge';
import { useLanguage } from '../lib/i18n.tsx';

interface PropertyIntelligenceModalProps {
  listing: Listing | null;
  onClose: () => void;
  onTriggerAiAction: (title: string, prompt: string) => void;
}

export const PropertyIntelligenceModal: React.FC<PropertyIntelligenceModalProps> = ({
  listing,
  onClose,
  onTriggerAiAction,
}) => {
  const { t } = useLanguage();
  if (!listing) return null;

  const delta = listing.price - listing.marketAvgPrice;
  const deltaPct = (delta / listing.marketAvgPrice) * 100;
  const isAboveMarket = delta > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-start sticky top-0 bg-surface-container-lowest z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">insights</span>
              <h2 className="font-headline-md text-[19px] font-bold text-on-surface">{t('propertyIntel.title')}</h2>
              <SourceBadge source={listing.source} />
            </div>
            <p className="text-xs text-secondary mt-1">
              {listing.address} — {listing.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-full hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Price comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
              <span className="text-[11px] font-bold text-outline uppercase block">Precio actual</span>
              <span className="text-xl font-bold text-on-surface">${listing.price.toLocaleString()}</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
              <span className="text-[11px] font-bold text-outline uppercase block">Promedio de mercado</span>
              <span className="text-xl font-bold text-on-surface">${listing.marketAvgPrice.toLocaleString()}</span>
            </div>
            <div
              className={`p-4 rounded-xl border ${
                isAboveMarket ? 'bg-error-container/40 border-error/30' : 'bg-[#dcfce7]/60 border-[#16a34a]/30'
              }`}
            >
              <span className="text-[11px] font-bold text-outline uppercase block">Posición vs. mercado</span>
              <span className={`text-xl font-bold ${isAboveMarket ? 'text-error' : 'text-[#16a34a]'}`}>
                {isAboveMarket ? '+' : ''}
                {deltaPct.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Radar + estimate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <MarketHealthRadar health={listing.marketHealth} />
            <div className="space-y-3">
              <div className="bg-primary-fixed/40 border border-primary/20 p-4 rounded-xl">
                <span className="text-[11px] font-bold text-primary uppercase block mb-1">
                  Tiempo estimado de venta
                </span>
                <span className="text-2xl font-bold text-on-surface">{listing.estimatedDaysToSell} días</span>
                <p className="text-xs text-secondary mt-1">
                  Basado en velocidad de mercado, demanda y {listing.daysOnMarket} días activos hasta hoy.
                </p>
              </div>
              {listing.aiRecommendation && (
                <div className="bg-[#E0E7FF]/70 border border-[#c7d2fe] p-4 rounded-xl">
                  <span className="text-[11px] font-bold text-[#3730A3] uppercase block mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    Recomendación IA
                  </span>
                  <p className="text-xs text-on-surface leading-relaxed">{listing.aiRecommendation.message}</p>
                </div>
              )}
            </div>
          </div>

          {/* Comparables */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-outline mb-2">Comparables recientes</h3>
            <div className="border border-outline-variant rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-surface-container-low text-on-surface-variant">
                  <tr>
                    <th className="text-left font-bold px-3 py-2">Dirección</th>
                    <th className="text-right font-bold px-3 py-2">Precio cierre</th>
                    <th className="text-right font-bold px-3 py-2">$/sqft</th>
                    <th className="text-right font-bold px-3 py-2">DOM</th>
                  </tr>
                </thead>
                <tbody>
                  {listing.comparables.map((comp) => (
                    <tr key={comp.address} className="border-t border-outline-variant/60">
                      <td className="px-3 py-2 font-medium text-on-surface">{comp.address}</td>
                      <td className="px-3 py-2 text-right">${comp.price.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">${comp.pricePerSqft}</td>
                      <td className="px-3 py-2 text-right">{comp.daysOnMarket}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-outline-variant flex justify-end gap-2 sticky bottom-0 bg-surface-container-lowest">
          <button
            onClick={() => {
              onTriggerAiAction(
                `CMA: ${listing.address}`,
                `Analiza los comparables de ${listing.address} (listado en $${listing.price.toLocaleString()}, promedio de mercado $${listing.marketAvgPrice.toLocaleString()}) y genera una propuesta de ajuste de precio para el vendedor.`
              );
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-[#172e6e] transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            Generar CMA con IA
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-bold text-xs hover:bg-surface-container-high transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
