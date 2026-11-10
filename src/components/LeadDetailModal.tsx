import React from 'react';
import { Lead } from '../types';

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
  if (!lead) return null;

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
                  {lead.intent}
                </span>
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
          <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/50">
            <div>
              <span className="text-[11px] font-bold text-outline uppercase block">Current Stage</span>
              <span className="font-semibold text-primary capitalize">{lead.status.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-outline uppercase block">Assigned Agent</span>
              <span className="font-semibold text-on-surface">{lead.assignedTo}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-outline uppercase block">Target Budget</span>
              <span className="font-bold text-[#16a34a]">{lead.budget}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-outline uppercase block">Preferred Area</span>
              <span className="font-medium text-on-surface">{lead.preferredLocation}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-outline uppercase block mb-1">Inquiry / Property of Interest</span>
            <p className="text-sm font-semibold text-on-surface bg-surface-container-lowest p-3 rounded-lg border border-outline-variant">
              {lead.propertyOfInterest ? `${lead.propertyOfInterest} — ` : ''}{lead.inquiry}
            </p>
          </div>

          {lead.notes && (
            <div>
              <span className="text-xs font-bold text-outline uppercase block mb-1">Agent Notes & Qualifications</span>
              <p className="text-xs text-secondary bg-surface p-3 rounded-lg leading-relaxed">
                {lead.notes}
              </p>
            </div>
          )}

          <div className="bg-[#E0E7FF]/70 p-3.5 rounded-xl border border-[#c7d2fe] space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-[#3730A3] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                AI Strategic Talking Points
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
                Open in AI Panel
              </button>
            </div>
            <p className="text-xs text-on-surface leading-relaxed">
              • Pre-qualified buyer with high urgency. Prioritize viewings within the next 48 hours.<br/>
              • Focus on waterfront proximity and school district rating during property tour.
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
            WhatsApp Check-in
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-[#172e6e] transition-colors cursor-pointer shadow-sm"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
