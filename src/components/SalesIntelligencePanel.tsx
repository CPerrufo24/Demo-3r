import React, { useState } from 'react';
import { ViewMode, AiMessage } from '../types';
import { INITIAL_AI_MESSAGES } from '../data/mockData';
import { useLanguage } from '../lib/i18n.tsx';

interface SalesIntelligencePanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext: ViewMode | string;
  initialQuery?: string;
}

const CONTEXT_LABEL_KEY: Record<string, string> = {
  overview: 'nav.overview',
  pipeline: 'nav.pipeline',
  listings: 'nav.listings',
  clients: 'nav.clients',
  sources: 'nav.sources',
  reports: 'nav.reports',
};

export const SalesIntelligencePanel: React.FC<SalesIntelligencePanelProps> = ({
  isOpen,
  onClose,
  currentContext,
  initialQuery = ''
}) => {
  const { t } = useLanguage();
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
          text: data.reply || 'Análisis completado exitosamente.',
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
        let title = 'Análisis Estratégico IA';
        let content = '• La velocidad de mercado sigue alta en Downtown (14 días promedio en mercado).\n• Se recomienda precalificar a todos los compradores de contado antes de agendar visitas privadas.\n• Los comparables de 88 Oak Ave muestran fuerte resistencia por encima de $1.75M.';

        if (q.toLowerCase().includes('whatsapp') || q.toLowerCase().includes('follow-up') || q.toLowerCase().includes('seguimiento')) {
          title = 'Seguimiento de WhatsApp Redactado';
          content = '¡Hola Sarah! Espero que hayas tenido una excelente semana. Acabamos de listar una impresionante residencia de 3 recámaras en Downtown con vista al malecón que coincide perfectamente con tus criterios. ¿Tienes disponibilidad este sábado a las 2:00 PM para un recorrido privado? ¡Avísame!';
        } else if (q.toLowerCase().includes('briefing') || q.toLowerCase().includes('visit') || q.toLowerCase().includes('visita')) {
          title = 'Briefing de Propiedad - 124 Maple St.';
          content = '• 4 Recámaras, 3.5 Baños | 3,400 pies² | Residencia Arquitectónica Moderna\n• Puntos Clave: Cocina de autor con electrodomésticos Sub-Zero, alberca climatizada, techo solar integrado.\n• Punto de Conversación: Destaca la reciente aprobación de zonificación para el distrito escolar mejor calificado.';
        } else if (q.toLowerCase().includes('comps') || q.toLowerCase().includes('market') || q.toLowerCase().includes('mercado')) {
          title = 'Análisis Comparativo de Mercado (CMA)';
          content = '• Sujeto: 88 Oak Ave ($1,780,000 / $370/pie²)\n• Comparable 1: 92 Oak Ave - Cerró en $1,710,000 ($355/pie²) en 18 días.\n• Comparable 2: 45 Elm St - Cerró en $1,740,000 ($362/pie²) en 31 días.\n• Veredicto IA: El precio de lista actual está 4.2% por encima del equilibrio de mercado.';
        } else if (q.toLowerCase().includes('description') || q.toLowerCase().includes('listing') || q.toLowerCase().includes('descripción')) {
          title = 'Descripción de Propiedad Optimizada';
          content = 'Entra a la elegancia arquitectónica inigualable de 124 Maple Street. Este exquisito santuario de 4 recámaras combina una vida interior-exterior fluida con acabados de diseñador a la medida. Cuenta con un gran salón de doble altura, cocina de última generación, y un oasis privado con alberca climatizada. Tu hogar soñado te espera.';
        } else if (q.toLowerCase().includes('summarize') || q.toLowerCase().includes('pipeline') || q.toLowerCase().includes('resumir')) {
          title = 'Resumen Ejecutivo del Pipeline Activo';
          content = '• Valor Total del Pipeline: $7,840,000 en 6 oportunidades activas.\n• Etapa Crítica: 2 leads de alta intención (Sarah Jenkins y Michael Chang) requieren visitas de fin de semana de inmediato.\n• Alerta de Cierre: El escrow de 782 Pine Ave cierra el viernes; asegura que los documentos de traspaso estén contrafirmados.';
        }

        const aiMsg: AiMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Con base en tu solicitud sobre "${q.slice(0, 40)}...", procesé los datos inmobiliarios relevantes y generé el siguiente activo:`,
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

  const contextKey = typeof currentContext === 'string' ? CONTEXT_LABEL_KEY[currentContext] : undefined;
  const contextLabel = contextKey ? t(contextKey) : t('nav.pipeline');

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
              {t('salesIntel.title')}
            </h2>
            <span className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface-variant font-medium">
              <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse"></span>
              {t('salesIntel.contextPrefix')} {contextLabel}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-on-surface-variant hover:bg-surface-container-low p-1 rounded-full transition-colors cursor-pointer flex items-center"
          title={t('salesIntel.close')}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Panel Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-md flex flex-col gap-sm bg-surface-bright/50">
        <h3 className="font-label-md text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-xs shrink-0">
          {t('salesIntel.actionListTitle')}
        </h3>

        {/* Action 1 */}
        <button
          onClick={() => handleSendQuery('Genera un seguimiento de WhatsApp para Sarah Jenkins')}
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
                {t('salesIntel.action1Title')}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs truncate">
                {t('salesIntel.action1Desc')}
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
            arrow_forward
          </span>
        </button>

        {/* Action 2 */}
        <button
          onClick={() => handleSendQuery('Prepara el briefing de visita para 124 Maple St.')}
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
                {t('salesIntel.action2Title')}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs truncate">
                {t('salesIntel.action2Desc')}
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
            arrow_forward
          </span>
        </button>

        {/* Action 3 */}
        <button
          onClick={() => handleSendQuery('Compara los comparables de mercado para 88 Oak Ave')}
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
                {t('salesIntel.action3Title')}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs truncate">
                {t('salesIntel.action3Desc')}
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
            arrow_forward
          </span>
        </button>

        {/* Action 4 */}
        <button
          onClick={() => handleSendQuery('Redacta la descripción de propiedad para un penthouse de lujo en Downtown')}
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
                {t('salesIntel.action4Title')}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs truncate">
                {t('salesIntel.action4Desc')}
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
            {t('salesIntel.streamTitle')}
          </span>
          {messages.length > 1 && (
            <button
              onClick={() => setMessages(INITIAL_AI_MESSAGES)}
              className="text-xs text-outline hover:text-error transition-colors"
            >
              {t('salesIntel.clearChat')}
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
                      {t('salesIntel.aiName')}
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
                          {copiedId === msg.id ? t('salesIntel.copied') : t('salesIntel.copy')}
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
              {t('salesIntel.analyzing')}
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
            placeholder={t('salesIntel.inputPlaceholder')}
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
            onClick={() => handleSendQuery('Genera el reporte ejecutivo completo del portafolio de hoy')}
            className="text-on-surface-variant font-label-sm text-xs hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">summarize</span>
            {t('salesIntel.generateReport')}
          </button>
          <button
            type="button"
            onClick={() => handleSendQuery('Resume las oportunidades activas del pipeline y sus cuellos de botella')}
            className="text-on-surface-variant font-label-sm text-xs hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">insights</span>
            {t('salesIntel.summarizePipeline')}
          </button>
        </div>
      </div>
    </aside>
  );
};
