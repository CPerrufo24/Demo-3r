import React from 'react';
import { Lead } from '../types';
import { calcLeadScore, TIER_LABEL } from '../lib/leadScoring';
import { SourceBadge } from './SourceBadge';
import { useLanguage } from '../lib/i18n.tsx';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onTriggerAiAction: (title: string, prompt: string) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  onClose,
  onTriggerAiAction
}) => {
  const { t } = useLanguage();
  if (!lead) return null;

  const { score, tier, reasons, recommendation } = calcLeadScore(lead.criteria);
  const tierColor =
    tier === 'HOT'
      ? 'text-[#16a34a] bg-[#dcfce7] border-[#16a34a]/30'
      : tier === 'WARM'
      ? 'text-primary bg-primary-fixed/80 border-primary/30'
      : tier === 'COOL'
      ? 'text-secondary bg-surface-container border-outline-variant'
      : 'text-outline bg-surface-container-low border-outline-variant';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl max-w-lg w-full p-6 space-y-5">
        <div className="flex justify-between items-start border-b border-outline-variant/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-lg">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-md text-[20px] font-bold text-on-surface">{lead.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  lead.intent === 'VIP' ? 'bg-tertiary-fixed text-tertiary font-bold' : 'bg-primary-fixed text-primary'
                }`}>
                  {t(`intent.${lead.intent}`)}
                </span>
                <SourceBadge source={lead.source} />
              </div>
              <p className="text-xs text-secondary mt-0.5">{lead.email} • {lead.phone}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-full hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4 text-sm">
          {/* Lead Score & Explicability */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">{t('leadDetail.score')}</span>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${tierColor}`}>
                {TIER_LABEL[tier]}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-on-surface">{score}</span>
              <span className="text-sm text-secondary font-semibold">/ 100</span>
            </div>
            <ul className="space-y-1.5 mb-3">
              {reasons.map((reason) => (
                <li key={reason.criterionId} className="flex items-start gap-2 text-xs">
                  <span
                    className={`material-symbols-outlined text-[14px] mt-0.5 shrink-0 ${
                      reason.positive ? 'text-[#16a34a]' : 'text-error'
                    }`}
                  >
                    {reason.positive ? 'check_circle' : 'cancel'}
                  </span>
                  <span className="text-on-surface-variant leading-snug">
                    <span className="font-semibold text-on-surface">{reason.label}</span>
                    {reason.note ? ` — ${reason.note}` : ''}
                  </span>
                </li>
              ))}
            </ul>
            <div className="bg-primary-fixed/40 border border-primary/20 rounded-lg px-3 py-2 flex items-start gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary mt-0.5">bolt</span>
              <p className="text-xs font-semibold text-primary leading-snug">{recommendation}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/50">
            <div>
              <span className="text-[11px] font-bold text-outline uppercase block">{t('leadDetail.currentStage')}</span>
              <span className="font-semibold text-primary">{t(`leadStatus.${lead.status}`)}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-outline uppercase block">{t('leadDetail.assignedAgent')}</span>
              <span className="font-semibold text-on-surface">{lead.assignedTo}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-outline uppercase block">{t('leadDetail.targetBudget')}</span>
              <span className="font-bold text-[#16a34a]">{lead.budget}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-outline uppercase block">{t('leadDetail.preferredArea')}</span>
              <span className="font-medium text-on-surface">{lead.preferredLocation}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-outline uppercase block mb-1">{t('leadDetail.inquiry')}</span>
            <p className="text-sm font-semibold text-on-surface bg-surface-container-lowest p-3 rounded-lg border border-outline-variant">
              {lead.propertyOfInterest ? `${lead.propertyOfInterest} — ` : ''}{lead.inquiry}
            </p>
          </div>

          {lead.notes && (
            <div>
              <span className="text-xs font-bold text-outline uppercase block mb-1">{t('leadDetail.notes')}</span>
              <p className="text-xs text-secondary bg-surface p-3 rounded-lg leading-relaxed">
                {lead.notes}
              </p>
            </div>
          )}

          <div className="bg-[#E0E7FF]/70 p-3.5 rounded-xl border border-[#c7d2fe] space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-[#3730A3] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                {t('leadDetail.aiTalkingPoints')}
              </span>
              <button
                onClick={() => {
                  onTriggerAiAction(
                    `Strategy Brief: ${lead.name}`,
                    `Generate a full negotiation strategy, suggested properties matching budget ${lead.budget}, and talking points for ${lead.name} regarding "${lead.inquiry}".`
                  );
                  onClose();
                }}
                className="text-[11px] font-bold text-primary hover:underline"
              >
                {t('leadDetail.openInAi')}
              </button>
            </div>
            <p className="text-xs text-on-surface leading-relaxed whitespace-pre-line">
              {t('leadDetail.talkingPointsBody').split('\n').map((line) => `• ${line}`).join('\n')}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-outline-variant/60 flex justify-between items-center">
          <button
            onClick={() => {
              onTriggerAiAction(
                `WhatsApp Follow-up: ${lead.name}`,
                `Draft a personalized WhatsApp follow-up for ${lead.name} regarding ${lead.inquiry}.`
              );
              onClose();
            }}
            className="px-3.5 py-2 rounded-lg bg-[#E0E7FF] text-[#3730A3] font-bold text-xs hover:bg-[#c7d2fe] transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            {t('leadDetail.whatsappCheckin')}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-[#172e6e] transition-colors cursor-pointer shadow-sm"
          >
            {t('leadDetail.closeDetails')}
          </button>
        </div>
      </div>
    </div>
  );
};
