import React from 'react';
import type { DataSource } from '../types';
import { SOURCE_LABEL } from '../types';

const SOURCE_STYLE: Record<DataSource, { icon: string; classes: string }> = {
  hubspot: { icon: 'hub', classes: 'bg-[#FFE9E1] text-[#FF6F41] border-[#FFCBB8]' },
  easybroker: { icon: 'real_estate_agent', classes: 'bg-[#DEF7F5] text-[#0F8A81] border-[#B9EAE5]' },
  manual: { icon: 'bolt', classes: 'bg-primary-fixed/80 text-primary border-primary/20' },
};

interface SourceBadgeProps {
  source: DataSource;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, className = '' }) => {
  const style = SOURCE_STYLE[source];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${style.classes} ${className}`}
      title={`Sincronizado desde ${SOURCE_LABEL[source]}`}
    >
      <span className="material-symbols-outlined text-[12px]">{style.icon}</span>
      {SOURCE_LABEL[source]}
    </span>
  );
};
