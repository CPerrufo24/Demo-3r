import React from 'react';
import type { MarketHealth } from '../types';

const CX = 100;
const CY = 100;
const R = 70;

const AXES: { id: keyof MarketHealth; label: string; angle: number }[] = [
  { id: 'price', label: 'Precio', angle: -90 },
  { id: 'location', label: 'Ubicación', angle: -30 },
  { id: 'demand', label: 'Demanda', angle: 30 },
  { id: 'velocity', label: 'Velocidad', angle: 90 },
  { id: 'competition', label: 'Competencia', angle: 150 },
  { id: 'condition', label: 'Estado', angle: 210 },
];

const GRID_FRACTIONS = [0.33, 0.66, 1.0] as const;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function axisPoint(angle: number, radius: number): [number, number] {
  return [CX + radius * Math.cos(toRad(angle)), CY + radius * Math.sin(toRad(angle))];
}

function toSvgPoints(pts: [number, number][]): string {
  return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

interface MarketHealthRadarProps {
  health: MarketHealth;
}

// Adapted from Motor IN3's components/RadarChart.tsx — same 6-axis SVG
// hexagon, repurposed from legal/location/market/financial/product/risk
// blocks to a listing's pricing and demand signals.
export const MarketHealthRadar: React.FC<MarketHealthRadarProps> = ({ health }) => {
  const gridPolygons = GRID_FRACTIONS.map((frac) => toSvgPoints(AXES.map((ax) => axisPoint(ax.angle, R * frac))));

  const dataPoints: [number, number][] = AXES.map((ax) => {
    const score = health[ax.id] ?? 0;
    return axisPoint(ax.angle, (score / 100) * R);
  });

  return (
    <svg viewBox="0 0 200 200" className="w-full aspect-square max-w-[220px] mx-auto" aria-hidden="true">
      {gridPolygons.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
      ))}

      {AXES.map((ax) => {
        const [x, y] = axisPoint(ax.angle, R);
        return (
          <line key={ax.id} x1={CX} y1={CY} x2={x.toFixed(1)} y2={y.toFixed(1)} stroke="#E2E8F0" strokeWidth="0.8" />
        );
      })}

      <polygon
        points={toSvgPoints(dataPoints)}
        fill="rgba(30,58,138,0.12)"
        stroke="#1E3A8A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {dataPoints.map(([x, y], i) => (
        <circle key={AXES[i].id} cx={x.toFixed(1)} cy={y.toFixed(1)} r={3} fill="#1E3A8A" />
      ))}

      {AXES.map((ax) => {
        const [x, y] = axisPoint(ax.angle, R + 14);
        const anchor: 'middle' | 'start' | 'end' = x < CX - 5 ? 'end' : x > CX + 5 ? 'start' : 'middle';
        const baseline = y < CY - 5 ? 'auto' : y > CY + 5 ? 'hanging' : 'middle';
        return (
          <text
            key={ax.id}
            x={x.toFixed(1)}
            y={y.toFixed(1)}
            textAnchor={anchor}
            dominantBaseline={baseline}
            fontSize="9"
            fill="#475569"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="600"
          >
            {ax.label}
          </text>
        );
      })}
    </svg>
  );
};
