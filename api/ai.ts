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

    const systemInstruction = `You are the AI Sales Intelligence Assistant for EstatePro CRM (Elite Realty Group).
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

    let title = 'AI Strategic Analysis';
    const p = (prompt || '').toLowerCase();
    if (p.includes('whatsapp')) title = 'Drafted WhatsApp Follow-up';
    else if (p.includes('description') || p.includes('copy')) title = 'Listing Copy & Description';
    else if (p.includes('briefing') || p.includes('visit')) title = 'Property & Client Briefing';
    else if (p.includes('comps') || p.includes('market')) title = 'Comparative Market Analysis (CMA)';

    res.json({
      reply: `Here is the AI intelligence generated for your request:`,
      title,
      content: reply
    });
  } catch (error: any) {
    console.error('Error generating AI content:', error);
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
}
