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

      const systemInstruction = `You are the AI Sales Intelligence Assistant for EstatePro CRM (3R Connect).
You are an expert real estate strategist, market analyst, and copywriter assisting senior real estate agents.
Analyze the user's request in the context of their real estate pipeline or listings.
Provide actionable, high-converting copy, market comps analysis, or negotiation talking points.
Keep your tone professional, concise, and executive.
Format your output cleanly. If generating a specific asset (like a WhatsApp message, property description, or CMA), provide a short introductory sentence, and then the asset text.`;

      const response = await client.models.generateContent({
        model: 'gemini-flash-latest',
        contents: `Context: ${context || 'General Real Estate'}\nRequest: ${prompt}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || 'Analysis completed.';

      // Try to parse out title and content for copyable card
      let title = 'AI Strategic Analysis';
      let content = reply;
      if (prompt.toLowerCase().includes('whatsapp')) title = 'Drafted WhatsApp Follow-up';
      else if (prompt.toLowerCase().includes('description') || prompt.toLowerCase().includes('copy')) title = 'Listing Copy & Description';
      else if (prompt.toLowerCase().includes('briefing') || prompt.toLowerCase().includes('visit')) title = 'Property & Client Briefing';
      else if (prompt.toLowerCase().includes('comps') || prompt.toLowerCase().includes('market')) title = 'Comparative Market Analysis (CMA)';

      res.json({
        reply: `Here is the AI intelligence generated for your request:`,
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
