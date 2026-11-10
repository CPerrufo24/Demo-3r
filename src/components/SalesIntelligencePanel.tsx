import React, { useState } from 'react';
import { ViewMode, AiMessage } from '../types';
import { INITIAL_AI_MESSAGES } from '../data/mockData';

interface SalesIntelligencePanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext: ViewMode | string;
  initialQuery?: string;
}

export const SalesIntelligencePanel: React.FC<SalesIntelligencePanelProps> = ({
  isOpen,
  onClose,
  currentContext,
  initialQuery = ''
}) => {
  const [messages, setMessages] = useState<AiMessage[]>(INITIAL_AI_MESSAGES);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialQuery) {
      setInputValue(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const handleSendQuery = async (queryText?: string) => {
    const q = queryText || inputValue;
    if (!q.trim()) return;

    const userMsg: AiMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputValue('');
    setIsLoading(true);

    try {
      // Try calling our backend API
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q, context: currentContext })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: AiMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply || 'Analysis completed successfully.',
          actionTitle: data.title,
          actionContent: data.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API fallback');
      }
    } catch {
      // Intelligent fallback if offline or backend unavailable
      setTimeout(() => {
        let title = 'AI Strategic Analysis';
        let content = '• Market velocity remains high in Downtown (avg. 14 days on market).\n• Recommend pre-qualifying all cash buyers before scheduling private tours.\n• Property comps for 88 Oak Ave indicate strong resistance above $1.75M.';

        if (q.toLowerCase().includes('whatsapp') || q.toLowerCase().includes('follow-up')) {
          title = 'Drafted WhatsApp Follow-up';
          content = 'Hi Sarah! Hope you had a great week. We just listed a stunning 3-bedroom residence in Downtown with waterfront views that matches your criteria perfectly. Are you available this Saturday at 2:00 PM for a private walkthrough? Let me know!';
        } else if (q.toLowerCase().includes('briefing') || q.toLowerCase().includes('visit')) {
          title = 'Property Briefing - 124 Maple St.';
          content = '• 4 Beds, 3.5 Baths | 3,400 SqFt | Modern Architectural Residence\n• Key Selling Points: Chef’s kitchen with Sub-Zero appliances, heated saltwater pool, solar integrated roof.\n• Talking Point: Highlight recent neighborhood zoning approval for top-rated primary school district.';
        } else if (q.toLowerCase().includes('comps') || q.toLowerCase().includes('market')) {
          title = 'Comparative Market Analysis (CMA)';
          content = '• Subject: 88 Oak Ave ($1,780,000 / $370/sqft)\n• Comp 1: 92 Oak Ave - Closed at $1,710,000 ($355/sqft) in 18 days.\n• Comp 2: 45 Elm St - Closed at $1,740,000 ($362/sqft) in 31 days.\n• AI Verdict: Current list price is 4.2% above market equilibrium.';
        } else if (q.toLowerCase().includes('description') || q.toLowerCase().includes('listing')) {
          title = 'Optimized Listing Description';
          content = 'Step into unparalleled architectural elegance at 124 Maple Street. This exquisite 4-bedroom sanctuary blends seamless indoor-outdoor living with bespoke designer finishes. Featuring a soaring double-height grand salon, state-of-the-art culinary kitchen, and a private backyard oasis complete with a heated saltwater pool. Your dream home awaits.';
        } else if (q.toLowerCase().includes('summarize') || q.toLowerCase().includes('pipeline')) {
          title = 'Active Pipeline Executive Summary';
          content = '• Total Pipeline Value: $7,840,000 across 6 active opportunities.\n• Critical Stage: 2 High-Intent leads (Sarah Jenkins & Michael Chang) require immediate weekend tour scheduling.\n• Closing Warning: Escrow for 782 Pine Ave closing Friday; ensure title transfer docs are countersigned.';
        }

        const aiMsg: AiMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Based on your request regarding "${q.slice(0, 40)}...", I have processed the relevant real estate data and generated the following asset:`,
          actionTitle: title,
          actionContent: content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      }, 800);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const contextLabel = typeof currentContext === 'string'
    ? currentContext.charAt(0).toUpperCase() + currentContext.slice(1)
    : 'Pipeline';

  return (
    <aside className="fixed top-16 right-0 bottom-0 w-full sm:w-[420px] bg-surface-container-lowest shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.15)] border-l border-outline-variant flex flex-col z-50 transform transition-transform duration-300 animate-slideLeft">
      {/* Panel Header */}
      <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-sm">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-on-primary-container text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
          </div>
          <div>
            <h2 className="font-headline-md text-[18px] font-bold text-on-surface tracking-tight leading-snug">
              Sales Intelligence
            </h2>
            <span className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface-variant font-medium">
              <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse"></span>
              Context: {contextLabel}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-on-surface-variant hover:bg-surface-container-low p-1 rounded-full transition-colors cursor-pointer flex items-center"
          title="Close AI Panel"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Panel Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-md flex flex-col gap-sm bg-surface-bright/50">
        <h3 className="font-label-md text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-xs shrink-0">
          Prioritized Action List
        </h3>

        {/* Action 1 */}
        <button
          onClick={() => handleSendQuery('Generate WhatsApp Follow-up for Sarah Jenkins')}
          className="bg-surface-container-lowest rounded-lg border border-outline-variant p-md flex items-center justify-between shadow-xs hover:shadow-md transition-all group text-left w-full cursor-pointer shrink-0 hover:border-primary/40"
        >
          <div className="flex items-center gap-md min-w-0">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-colors shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container transition-colors text-[20px]">
                chat
              </span>
            </div>
            <div className="min-w-0">
              <h4 className="font-headline-md text-[15px] leading-[22px] font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                Generate WhatsApp Follow-up
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs truncate">
                Draft a personalized message
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
            arrow_forward
          </span>
        </button>

        {/* Action 2 */}
        <button
          onClick={() => handleSendQuery('Prepare Visit Briefing for 124 Maple St.')}
          className="bg-surface-container-lowest rounded-lg border border-outline-variant p-md flex items-center justify-between shadow-xs hover:shadow-md transition-all group text-left w-full cursor-pointer shrink-0 hover:border-primary/40"
        >
          <div className="flex items-center gap-md min-w-0">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-colors shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container transition-colors text-[20px]">
                assignment
              </span>
            </div>
            <div className="min-w-0">
              <h4 className="font-headline-md text-[15px] leading-[22px] font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                Prepare Visit Briefing
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs truncate">
                Compile property details
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
            arrow_forward
          </span>
        </button>

        {/* Action 3 */}
        <button
          onClick={() => handleSendQuery('Compare Market Comps for 88 Oak Ave')}
          className="bg-surface-container-lowest rounded-lg border border-outline-variant p-md flex items-center justify-between shadow-xs hover:shadow-md transition-all group text-left w-full cursor-pointer shrink-0 hover:border-primary/40"
        >
          <div className="flex items-center gap-md min-w-0">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-colors shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container transition-colors text-[20px]">
                insert_chart
              </span>
            </div>
            <div className="min-w-0">
              <h4 className="font-headline-md text-[15px] leading-[22px] font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                Compare Market Comps
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs truncate">
                Analyze similar listings
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
            arrow_forward
          </span>
        </button>

        {/* Action 4 */}
        <button
          onClick={() => handleSendQuery('Draft Property Description for luxury downtown penthouse')}
          className="bg-surface-container-lowest rounded-lg border border-outline-variant p-md flex items-center justify-between shadow-xs hover:shadow-md transition-all group text-left w-full cursor-pointer shrink-0 hover:border-primary/40"
        >
          <div className="flex items-center gap-md min-w-0">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-colors shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container transition-colors text-[20px]">
                edit_note
              </span>
            </div>
            <div className="min-w-0">
              <h4 className="font-headline-md text-[15px] leading-[22px] font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                Draft Property Description
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs truncate">
                Optimize listing text
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
            arrow_forward
          </span>
        </button>

        {/* Conversational Feed Divider */}
        <div className="mt-4 pt-3 border-t border-outline-variant/60 flex items-center justify-between shrink-0">
          <span className="font-label-md text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            AI Analysis Stream
          </span>
          {messages.length > 1 && (
            <button
              onClick={() => setMessages(INITIAL_AI_MESSAGES)}
              className="text-xs text-outline hover:text-error transition-colors"
            >
              Clear Chat
            </button>
          )}
        </div>

        {/* Messages List */}
        <div className="space-y-3 pb-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-xl p-3 text-sm shadow-2xs ${
                    isUser
                      ? 'bg-primary text-on-primary rounded-br-2xs'
                      : 'bg-surface-container-lowest border border-outline-variant/80 text-on-surface rounded-bl-2xs'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary mb-1 border-b border-outline-variant/40 pb-1">
                      <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                      Gemini Real Estate AI
                    </div>
                  )}
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                  {msg.actionTitle && msg.actionContent && (
                    <div className="mt-2 pt-2 border-t border-outline-variant/50 bg-surface-container-low/60 p-2.5 rounded-lg border border-outline-variant/40">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-on-surface">{msg.actionTitle}</span>
                        <button
                          onClick={() => handleCopy(msg.actionContent || '', msg.id)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-outline-variant text-[11px] font-medium text-secondary hover:text-primary hover:border-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {copiedId === msg.id ? 'check' : 'content_copy'}
                          </span>
                          {copiedId === msg.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-xs text-on-surface-variant whitespace-pre-line font-mono bg-surface-container-lowest p-2 rounded border border-outline-variant/30 leading-relaxed">
                        {msg.actionContent}
                      </p>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-outline mt-1 px-1">{msg.timestamp}</span>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-primary bg-primary-fixed/40 p-3 rounded-xl border border-primary/20 animate-pulse">
              <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
              Analyzing portfolio data and drafting strategic intelligence...
            </div>
          )}
        </div>
      </div>

      {/* Panel Footer - Input */}
      <div className="p-md border-t border-outline-variant bg-surface-container-lowest shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery();
          }}
          className="relative"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask AI to analyze a property or lead..."
            disabled={isLoading}
            className="w-full pl-sm pr-[44px] py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim transition-all bg-surface text-on-surface font-body-md text-body-md shadow-2xs outline-none"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary text-on-primary rounded-md hover:bg-[#172e6e] transition-colors disabled:opacity-40 disabled:hover:bg-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
        </form>
        <div className="flex justify-center gap-md mt-sm">
          <button
            type="button"
            onClick={() => handleSendQuery('Generate full executive portfolio report for today')}
            className="text-on-surface-variant font-label-sm text-xs hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">summarize</span>
            Generate Report
          </button>
          <button
            type="button"
            onClick={() => handleSendQuery('Summarize Active Pipeline opportunities and bottlenecks')}
            className="text-on-surface-variant font-label-sm text-xs hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">insights</span>
            Summarize Pipeline
          </button>
        </div>
      </div>
    </aside>
  );
};
