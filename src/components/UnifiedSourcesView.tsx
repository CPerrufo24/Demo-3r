import React from 'react';
import type { ViewMode } from '../types';
import { SOURCE_CONNECTIONS, SYNC_EVENTS } from '../data/mockData';
import { SourceBadge } from './SourceBadge';

interface UnifiedSourcesViewProps {
  onSelectView: (view: ViewMode) => void;
  onOpenImport: () => void;
}

const CONNECTION_ICON: Record<string, string> = {
  hubspot: 'hub',
  easybroker: 'real_estate_agent',
  manual: 'bolt',
};

export const UnifiedSourcesView: React.FC<UnifiedSourcesViewProps> = ({ onSelectView, onOpenImport }) => {
  const totalRecords = SOURCE_CONNECTIONS.reduce((sum, c) => sum + c.recordCount, 0);

  return (
    <div className="space-y-lg animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-[28px] font-bold text-on-surface tracking-tight">
            Fuentes Unificadas
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 max-w-2xl">
            HubSpot sigue siendo tu CRM principal y EasyBroker sigue distribuyendo tu inventario a los portales — pero
            tú ya no cambias de pestaña entre ellos. Todo se lee y se trabaja desde un solo lugar.
          </p>
        </div>
        <button
          onClick={onOpenImport}
          className="px-md py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-[#172e6e] transition-all active:scale-95 shadow-sm cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">sync_alt</span>
          Migrar desde tu CRM actual
        </button>
      </div>

      {/* Headline stat */}
      <div className="bg-primary text-on-primary rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-80">Un solo lugar de trabajo</p>
          <p className="text-2xl font-bold mt-1">{totalRecords} registros unificados de {SOURCE_CONNECTIONS.length} sistemas</p>
        </div>
        <div className="text-xs font-semibold bg-white/15 px-3 py-1.5 rounded-full">
          0 cambios de pestaña hoy
        </div>
      </div>

      {/* Connection cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {SOURCE_CONNECTIONS.map((conn) => (
          <div
            key={conn.source}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-2xs p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[22px]">{CONNECTION_ICON[conn.source]}</span>
                </div>
                <div>
                  <SourceBadge source={conn.source} />
                </div>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block animate-pulse" />
                Conectado
              </span>
            </div>

            <p className="text-xs text-secondary leading-snug">{conn.role}</p>

            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-on-surface">{conn.recordCount}</span>
              <span className="text-xs text-secondary">{conn.recordLabel}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/50 text-[11px] text-outline">
              <span>Última sincronización: {conn.lastSync}</span>
            </div>

            <button
              onClick={() => onSelectView(conn.source === 'easybroker' ? 'listings' : 'pipeline')}
              className="mt-1 text-xs font-bold text-primary hover:text-primary-container transition-colors flex items-center gap-1 cursor-pointer"
            >
              Ver registros
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        ))}
      </div>

      {/* Live sync feed */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-2xs p-5">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-outline-variant/60">
          <h3 className="font-headline-md text-[16px] font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">sync</span>
            Actividad de sincronización
          </h3>
          <span className="text-[11px] text-outline font-medium">en vivo</span>
        </div>
        <div className="space-y-2.5">
          {SYNC_EVENTS.map((event) => (
            <div key={event.id} className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <SourceBadge source={event.source} />
                <span className="text-on-surface truncate">{event.message}</span>
              </div>
              <span className="text-outline shrink-0">{event.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
