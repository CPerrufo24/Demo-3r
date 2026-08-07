import type { LeadCriterionEvaluation, LeadCriterionStatus } from '../types';

export interface LeadCriterionDef {
  id: string;
  label: string;
  weight: number;
}

// Weights sum to 100. Mirrors Motor IN3's block-weight design (config/engine.config.ts)
// applied to a sales qualification funnel instead of a legal/market viability dictamen.
export const LEAD_CRITERIA: LeadCriterionDef[] = [
  { id: 'financing', label: 'Crédito o financiamiento aprobado', weight: 25 },
  { id: 'budget', label: 'Presupuesto confirmado', weight: 20 },
  { id: 'engagement', label: 'Visitas o interacciones realizadas', weight: 20 },
  { id: 'timeline', label: 'Urgencia / fecha límite definida', weight: 15 },
  { id: 'responsiveness', label: 'Responde activamente a seguimientos', weight: 10 },
  { id: 'fit', label: 'Coincide con inventario disponible', weight: 10 },
];

const SCORING_POINTS: Record<LeadCriterionStatus, number> = {
  CUMPLE: 100,
  CUMPLE_CON_OBSERVACIONES: 65,
  NO_CUMPLE: 0,
  SIN_INFORMACION: 30,
};

export type LeadTier = 'HOT' | 'WARM' | 'COOL' | 'COLD';

export const TIER_LABEL: Record<LeadTier, string> = {
  HOT: 'Listo para cerrar',
  WARM: 'Alta prioridad',
  COOL: 'Necesita nutrición',
  COLD: 'Baja prioridad',
};

export interface LeadScoreReason {
  criterionId: string;
  label: string;
  status: LeadCriterionStatus;
  positive: boolean;
  note?: string;
}

export interface LeadScoreResult {
  score: number;
  tier: LeadTier;
  reasons: LeadScoreReason[];
  recommendation: string;
}

function tierFromScore(score: number): LeadTier {
  if (score >= 85) return 'HOT';
  if (score >= 65) return 'WARM';
  if (score >= 40) return 'COOL';
  return 'COLD';
}

function buildRecommendation(tier: LeadTier, reasons: LeadScoreReason[]): string {
  const weakest = reasons.find((r) => r.status === 'NO_CUMPLE' || r.status === 'SIN_INFORMACION');

  switch (tier) {
    case 'HOT':
      return 'Llamar hoy antes de las 4 PM — alta probabilidad de cierre esta semana.';
    case 'WARM':
      return weakest
        ? `Dar seguimiento hoy y resolver: ${weakest.label.toLowerCase()}.`
        : 'Agendar visita en las próximas 48 horas para mantener el momentum.';
    case 'COOL':
      return 'Enviar contenido de nutrición (WhatsApp/email) antes de invertir tiempo en una llamada.';
    case 'COLD':
    default:
      return 'Baja prioridad esta semana — revisar en el próximo ciclo de campaña.';
  }
}

// Pure function, same shape as Motor IN3's calcIN3Score(): takes a list of
// per-criterion statuses (never computed by the AI) and always derives the
// same score from the same inputs. This is what makes the "92% — Llamar
// antes de las 4 PM" card explainable instead of a black-box AI guess.
export function calcLeadScore(evaluations: LeadCriterionEvaluation[]): LeadScoreResult {
  const evalMap = new Map(evaluations.map((e) => [e.criterionId, e]));

  let total = 0;
  const reasons: LeadScoreReason[] = LEAD_CRITERIA.map((criterion) => {
    const evaluation = evalMap.get(criterion.id);
    const status = evaluation?.status ?? 'SIN_INFORMACION';
    const points = SCORING_POINTS[status];
    total += (points / 100) * criterion.weight;

    return {
      criterionId: criterion.id,
      label: criterion.label,
      status,
      positive: status === 'CUMPLE' || status === 'CUMPLE_CON_OBSERVACIONES',
      note: evaluation?.note,
    };
  });

  const score = Math.round(total);
  const tier = tierFromScore(score);

  return {
    score,
    tier,
    reasons,
    recommendation: buildRecommendation(tier, reasons),
  };
}
