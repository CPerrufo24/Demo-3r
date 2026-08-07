import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialization of GoogleGenAI
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

  // API endpoint for AI Sales Intelligence
  app.post('/api/ai', async (req, res) => {
    try {
      const { prompt, context } = req.body;
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

      // Try to parse out title and content for copyable card
      let title = 'Análisis Estratégico IA';
      let content = reply;
      const p = prompt.toLowerCase();
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
  });

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'EstatePro CRM AI' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EstatePro CRM server running on http://localhost:${PORT}`);
  });
}

startServer();
