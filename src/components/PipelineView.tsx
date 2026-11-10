import React, { useState } from 'react';
import { Lead } from '../types';
import { MOCK_LEADS } from '../data/mockData';

interface PipelineViewProps {
  onSelectLead: (lead: Lead) => void;
  onTriggerAiAction: (title: string, prompt: string) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  onSelectLead,
  onTriggerAiAction
}) => {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  const columns: { id: Lead['status']; label: string; count: number }[] = [
    { id: 'new', label: 'New Leads', count: leads.filter((l) => l.status === 'new').length },
    { id: 'negotiation', label: 'In Negotiation', count: leads.filter((l) => l.status === 'negotiation').length },
    { id: 'closing', label: 'Closing', count: leads.filter((l) => l.status === 'closing').length },
  ];

  const handleDragStart = (id: string) => {
    setDraggedLeadId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Lead['status']) => {
    if (!draggedLeadId) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === draggedLeadId ? { ...l, status } : l))
    );
    setDraggedLeadId(null);
  };

  const handleMoveStatus = (id: string, nextStatus: Lead['status'], e: React.MouseEvent) => {
    e.stopPropagation();
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l)));
  };

  return (
    <div className="space-y-lg animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-[28px] font-bold text-on-surface tracking-tight">
            Active Pipeline
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Review your high-priority leads. Click any card to inspect details or drag to change stage.
          </p>
        </div>
        <div className="flex gap-sm">
          <button
            onClick={() => {
              const newLead: Lead = {
                id: `lead-${Date.now()}`,
                name: 'New Prospective Client',
                phone: '+1 (555) 000-1111',
                email: 'client@example.com',
                intent: 'High Intent',
                status: 'new',
                inquiry: 'Looking for residential property',
                budget: '$1,000,000',
                preferredLocation: 'Downtown',
                lastContact: 'Just now',
                assignedTo: 'Elena R.'
              };
              setLeads([newLead, ...leads]);
            }}
            className="px-md py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-[#172e6e] transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add Lead
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-start">
        {columns.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.id);
          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.id)}
              className="bg-surface-container-highest rounded-lg p-sm min-h-[620px] flex flex-col transition-colors border border-transparent hover:border-outline-variant/60"
            >
              <div className="flex justify-between items-center mb-sm px-xs pt-1">
                <h3 className="font-label-md text-[13px] font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                  {col.label}
                </h3>
                <span className="bg-surface-container text-on-surface-variant font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold">
                  {col.count}
                </span>
              </div>

              <div className="space-y-sm flex-1">
                {colLeads.map((lead) => {
                  const isHighIntent = lead.intent === 'High Intent' || lead.intent === 'VIP';
                  const isRivera = lead.name === 'The Rivera Family';

                  return (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={() => handleDragStart(lead.id)}
                      onClick={() => onSelectLead(lead)}
                      className={`bg-surface-container-lowest p-md rounded-lg border border-outline-variant shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group relative ${
                        isRivera ? 'ring-2 ring-primary-fixed-dim bg-primary/2' : 'hover:border-primary/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-sm">
                        <span className={`font-label-md text-label-md px-2 py-0.5 rounded-full text-xs font-semibold ${
                          lead.intent === 'VIP'
                            ? 'bg-tertiary-fixed text-tertiary font-bold'
                            : isHighIntent
                            ? 'bg-primary-fixed/80 text-primary'
                            : 'bg-surface-container text-secondary'
                        }`}>
                          {lead.intent}
                        </span>
                        <span className="font-label-sm text-[11px] text-outline">
                          {lead.lastContact}
                        </span>
                      </div>

                      <p className="font-headline-md text-[16px] font-bold text-on-surface group-hover:text-primary transition-colors">
                        {lead.name}
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 line-clamp-2">
                        {lead.inquiry}
                      </p>

                      <div className="mt-3 pt-2 border-t border-outline-variant/40 flex justify-between items-center text-xs text-secondary">
                        <span className="flex items-center gap-1 truncate font-medium">
                          <span className="material-symbols-outlined text-[14px]">sell</span>
                          {lead.budget}
                        </span>
                        <span className="font-label-sm text-[11px] bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant">
                          {lead.assignedTo}
                        </span>
                      </div>

                      {/* Hover action bar */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-surface-container-lowest/90 p-1 rounded shadow-xs border border-outline-variant">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onTriggerAiAction(
                              `Follow-up with ${lead.name}`,
                              `Generate a personalized follow-up message and property briefing for ${lead.name} regarding their inquiry: "${lead.inquiry}" with budget ${lead.budget}.`
                            );
                          }}
                          className="p-1 text-primary hover:bg-primary-fixed rounded"
                          title="Generate AI Follow-up"
                        >
                          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        </button>
                        {col.id !== 'closing' && (
                          <button
                            onClick={(e) => handleMoveStatus(lead.id, col.id === 'new' ? 'negotiation' : 'closing', e)}
                            className="p-1 text-secondary hover:text-on-surface hover:bg-surface-container rounded"
                            title="Advance Stage"
                          >
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {colLeads.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-outline-variant/50 rounded-lg flex flex-col items-center justify-center text-outline text-xs">
                    <span className="material-symbols-outlined text-[24px] mb-1 opacity-50">inbox</span>
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
