import React from 'react';
import type { LeadTier } from '../lib/leadScoring';

const SIZE = 96;
const STROKE = 8;
const R = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

const TIER_STROKE: Record<LeadTier, string> = {
  HOT: '#16a34a',
  WARM: '#1E3A8A',
  COOL: '#64748B',
  COLD: '#94A3B8',
};

interface LeadScoreRingProps {
  score: number;
  tier: LeadTier;
}

// Same SVG-ring pattern as MarketHealthRadar.tsx — the Lead Score is a real
// computed number (calcLeadScore), so it earns a custom visualization
// instead of a flat text pill.
export const LeadScoreRing: React.FC<LeadScoreRingProps> = ({ score, tier }) => {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);
  const stroke = TIER_STROKE[tier];

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="shrink-0" role="img" aria-label={`Lead score ${clamped} de 100`}>
      <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="#E2E8F0" strokeWidth={STROKE} />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        fill="none"
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
      />
      <text
        x="50%"
        y="47%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="22"
        fontWeight="700"
        fill="#1D2939"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {clamped}
      </text>
      <text
        x="50%"
        y="66%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="9"
        fontWeight="600"
        fill="#64748B"
        fontFamily="Inter, system-ui, sans-serif"
      >
        / 100
      </text>
    </svg>
  );
};
