import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, context } = req.body ?? {};
    const client = getAiClient();

    if (!client) {
      return res.status(503).json({
        error: 'Gemini API key not configured or offline',
        reply: 'Using offline strategic analysis engine.'
      });
    }

    const systemInstruction = `Eres el Asistente de Inteligencia de Ventas IA de EstatePro CRM (3R Connect).
Eres un experto estratega inmobiliario, analista de mercado y redactor que asiste a asesores inmobiliarios senior.
Analiza la solicitud del usuario en el contexto de su pipeline de leads o su inventario de propiedades.
Entrega copy accionable y persuasivo, análisis comparativo de mercado, o puntos de conversación para negociación.
Mantén un tono profesional, conciso y ejecutivo.
Responde siempre en español (México), sin importar en qué idioma esté escrita la solicitud.
Formatea la salida con claridad. Si generas un activo específico (mensaje de WhatsApp, descripción de propiedad, o CMA), da una breve oración introductoria y luego el contenido.`;

    const response = await client.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Context: ${context || 'General Real Estate'}\nRequest: ${prompt}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || 'Análisis completado.';

    let title = 'Análisis Estratégico IA';
    const p = (prompt || '').toLowerCase();
    if (p.includes('whatsapp')) title = 'Seguimiento de WhatsApp Redactado';
    else if (p.includes('description') || p.includes('copy') || p.includes('descripción')) title = 'Descripción y Copy de Propiedad';
    else if (p.includes('briefing') || p.includes('visit') || p.includes('visita')) title = 'Briefing de Propiedad y Cliente';
    else if (p.includes('comps') || p.includes('market') || p.includes('mercado')) title = 'Análisis Comparativo de Mercado (CMA)';

    res.json({
      reply: `Aquí tienes el análisis generado por la IA para tu solicitud:`,
      title,
      content: reply
    });
  } catch (error: any) {
    console.error('Error generating AI content:', error);
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
}
