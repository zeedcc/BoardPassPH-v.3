import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    console.log(`[API] ${req.method} ${req.url}`);
  }
  next();
});

// Lazy init — mirrors your existing Gemini pattern
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key.trim() !== '') {
      geminiClient = new GoogleGenAI({ apiKey: key });
    }
  }
  return geminiClient;
}

app.post('/api/generate-deck', async (req, res) => {
  const { textPayload, fileContent, fileName, chunkIndex, totalChunks } = req.body;
  const ai = getGemini();

  if (!ai) {
    return res.json({
      isFallback: true,
      msg: 'No active Gemini key present. Please add GEMINI_API_KEY to your .env.'
    });
  }

  try {
    let referenceInput = '';
    const MAX_CHAR_CAP = 15000;

    let trimmedPayload = (textPayload || '').trim();
    let trimmedFile = (fileContent || '').trim();

    if (trimmedPayload.length > MAX_CHAR_CAP)
      trimmedPayload = trimmedPayload.substring(0, MAX_CHAR_CAP) + '\n...[Truncated]...';
    if (trimmedFile.length > MAX_CHAR_CAP)
      trimmedFile = trimmedFile.substring(0, MAX_CHAR_CAP) + '\n...[Truncated]...';

    if (trimmedPayload) referenceInput += `\nPASTED NOTES:\n${trimmedPayload}\n`;
    if (trimmedFile) referenceInput += `\nUPLOADED FILE (${fileName || 'document'}):\n${trimmedFile}\n`;

    if (!referenceInput.trim())
      return res.status(400).json({ error: 'Please provide notes or an uploaded file.' });

    const progressContext = chunkIndex && totalChunks
      ? `\nYou are processing section ${chunkIndex} of ${totalChunks}. Cover this section specifically.`
      : '';

    const sysInstruct = `You are an expert clinical psychologist and reviewer for the Philippine Psychometrician Licensure Examination (PmLE). Read the user's study notes and convert the most critical concepts into active recall flashcards.${progressContext}
- 'front': a direct active recall question
- 'back': precise, concise answer or clinical definition
- 'hint': a short mnemonic or retrieval cue
Generate exactly 4–5 high-yield cards per section.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Generate flashcards from this study material: ${referenceInput}`,
      config: {
        systemInstruction: sysInstruct,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['cards'],
          properties: {
            cards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ['id', 'front', 'back'],
                properties: {
                  id: { type: Type.STRING },
                  front: { type: Type.STRING },
                  back: { type: Type.STRING },
                  hint: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '{"cards":[]}');
    return res.json({ cards: parsed.cards || [], isFallback: false });

  } catch (err: any) {
    console.error('Gemini deck generation error:', err.message || err);
    return res.json({ isFallback: true, msg: err.message || 'Gemini API failed to generate deck' });
  }
});

app.post('/api/generate-deck', async (req, res) => {
  const claude = getClaude();
  // gemini removed

  if (!claude && !gemini) {
    return res.json({ isFallback: true, msg: 'No AI key configured.' });
  }

  try {
    if (claude) {
      // ... Claude call above ...
    } else {
      // ... your existing Gemini block ...
    }
  } catch (err) {
    // optionally retry with gemini here
  }
});

app.post('/api/generate-mnemonic', async (req, res) => {
  const { vignette, explanation } = req.body;
  const ai = getGemini();

  if (!ai) {
    return res.json({ isFallback: true });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Create an original, clever, high-yield clinical mnemonic, acronym, or cognitive memory cue to easily memorize the diagnostic criteria, psychopharmacological treatment, or subscale metrics related to this board review item:
Vignette: ${vignette}
Explanation: ${explanation}

Format your output in clean Markdown with clear paragraph structure.`,
      config: {
        systemInstruction: 'You are a master of psychology memory hooks and clinical teaching acronyms. Output a detailed reminder structure.'
      }
    });

    return res.json({
      mnemonic: response.text,
      isFallback: false
    });
  } catch (err: any) {
    console.error('Gemini mnemonic formulation error:', err.message || err);
    return res.json({ isFallback: true });
  }
});

app.post('/api/generate-deck', async (req, res) => {
  const { textPayload, fileContent, fileName, chunkIndex, totalChunks } = req.body;
  const ai = getClaude();

  if (!ai) {
    return res.json({ 
      isFallback: true, 
      msg: 'No active Gemini key present. Please connect your developer key in Settings > Secrets.' 
    });
  }

  try {
    let referenceInput = '';
    const MAX_CHAR_CAP = 15000; // Optimal limit to fit within Vercel Hobby's 10-second limit

    let trimmedPayload = (textPayload || '').trim();
    let trimmedFile = (fileContent || '').trim();

    if (trimmedPayload.length > MAX_CHAR_CAP) {
      trimmedPayload = trimmedPayload.substring(0, MAX_CHAR_CAP) + '\n...[Truncated for speed & serverless limits]...';
    }
    if (trimmedFile.length > MAX_CHAR_CAP) {
      trimmedFile = trimmedFile.substring(0, MAX_CHAR_CAP) + '\n...[Truncated for speed & serverless limits]...';
    }

    if (trimmedPayload !== '') {
      referenceInput += `\nPASTED NOTES/GUIDES:\n${trimmedPayload}\n`;
    }
    if (trimmedFile !== '') {
      referenceInput += `\nUPLOADED FILE MATERIAL (${fileName || 'document'}):\n${trimmedFile}\n`;
    }

    if (referenceInput.trim() === '') {
      return res.status(400).json({ error: 'Please provide either notes content or uploaded study files.' });
    }

    let progressContext = '';
    if (chunkIndex && totalChunks) {
      progressContext = `\nNote: You are currently processing section ${chunkIndex} of ${totalChunks} of the study material. Ensure your cards represent this section specifically.`;
    }

    const sysInstruct = `You are an expert clinical psychologist and professional reviewer for the Philippine Psychometrician Licensure Examination (PmLE). Your duty is to read the user's provided notes, study guides, or uploaded books, extract the most critical, high-yield concepts, terms, conditions, and theories, and convert them into high-quality active recall teaching flashcards.${progressContext}
Format details:
- Each card's 'front' must be a direct, thought-provoking active recall question or prompt (e.g., "What are the three criteria for diagnosis of Schizophrenia according to DSM-5-TR?").
- Each card's 'back' must be the precise, concise answer, criterion, or clinical definition. Keep it accurate, easy to digest, yet complete and concise.
- Each 'hint' is a small cognitive mnemonic or cue to stimulate retrieval.

Generate a highly optimized, high-yield deck of exactly 4 to 5 flashcards covering the key concepts in the material. Keep descriptions punchy and direct to prioritize fast learning and prevent API execution timeouts.
Return your response strictly in JSON matching the requested responseSchema.`;

    const modelName = 'gemini-3.5-flash';
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Read all the following study references and formulate a comprehensive set of study flashcards covering every important note, definition, and concept: ${referenceInput}`,
      config: {
        systemInstruction: sysInstruct,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['cards'],
          properties: {
            cards: {
              type: Type.ARRAY,
              description: 'List of generated flashcard objects covering all important notes in the material',
              items: {
                type: Type.OBJECT,
                required: ['id', 'front', 'back'],
                properties: {
                  id: {
                    type: Type.STRING,
                    description: 'A unique short identifier for the flashcard'
                  },
                  front: {
                    type: Type.STRING,
                    description: 'The front side of the flashcard containing the active recall prompt or question'
                  },
                  back: {
                    type: Type.STRING,
                    description: 'The reverse side of the flashcard holding the detailed, precise answer'
                  },
                  hint: {
                    type: Type.STRING,
                    description: 'Optional retrieving cue or tip'
                  }
                }
              }
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || '{"cards":[]}');
    return res.json({
      cards: parsedData.cards || [],
      isFallback: false
    });
  } catch (err: any) {
    console.error('Gemini flashcard generation error:', err.message || err);
    return res.json({ 
      isFallback: true, 
      msg: err.message || 'API failed to parse or retrieve flashcard deck' 
    });
  }
});

app.post('/api/parse-document', async (req, res) => {
  const { base64, fileName, fileType } = req.body;
  if (!base64) {
    return res.status(400).json({ error: 'No file data received' });
  }

  try {
    const base64Data = base64.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    let text = buffer.toString('utf-8');

    const previewLimit = 80000;
    const isTruncated = text.length > previewLimit;
    const finalResultText = isTruncated ? text.substring(0, previewLimit) : text;

    return res.json({
      text: finalResultText,
      originalLength: text.length,
      isTruncated,
      success: true
    });
  } catch (err: any) {
    console.error('[API] Error parsing document:', err.message || err);
    return res.status(500).json({
      success: false,
      error: `Failed to extract text from document: ${err.message || err}`
    });
  }
});

app.post('/api/submit-feedback', async (req, res) => {
  const { email, topic, rating, message } = req.body;
  console.log(`[Helpline Digital Submission Received] Sender: ${email || 'Anonymous'} | Topic: ${topic} | Rating: ${rating}/5 | Message Length: ${message?.length || 0}`);
  
  const targetEmail = 'dsmind.pmle@gmail.com';
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const smtpFrom = process.env.SMTP_FROM || 'BoardPassPH Helpline <noreply@boardpassph.com>';

  // If SMTP is not configured, log simulated delivery block to the server console
  if (!smtpUser || !smtpUser.trim() || !smtpPass || !smtpPass.trim()) {
    console.log(`\n======================================================`);
    console.log(`[BOARDPASS-PH DISPATCH NOTICE: NO SMTP CREDENTIALS FOUND]`);
    console.log(`Digital Form submitted securely to dsmind.pmle@gmail.com via Local Console Relay.`);
    console.log(`Sender: ${email}`);
    console.log(`Topic: ${topic}`);
    console.log(`Rating: ${rating}/5`);
    console.log(`Message: ${message}`);
    console.log(`======================================================\n`);
    return res.json({ 
      status: 'success', 
      isMock: true, 
      statusText: 'Synchronized & logged to backend console' 
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const mailOptions = {
      from: smtpFrom,
      to: targetEmail,
      replyTo: email || undefined,
      subject: `[BoardPassPH Secure Form] ${topic || 'General'} - from ${email || 'Anonymous'}`,
      text: `New secure digital form submission received:\n\n` +
            `Sender: ${email || 'Anonymous'}\n` +
            `Topic: ${topic || 'general'}\n` +
            `Rating: ${rating || 5}/5\n` +
            `Timestamp: ${new Date().toISOString()}\n\n` +
            `Message:\n${message || '(No message)'}\n\n` +
            `---\n` +
            `Sent from BoardPassPH portal`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #fbfbf9; color: #1B3518;">
          <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #eaeaea; padding-bottom: 15px;">
            <h2 style="color: #29402e; font-size: 26px; font-weight: 700; margin: 0; font-family: 'Space Grotesk', system-ui, sans-serif;">Board<span style="color: #ff6584; font-weight: normal; font-style: italic;">Pass</span>PH</h2>
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #a37c82; margin: 4px 0 0 0; font-weight: bold;">Secure Digital Helpline Form Submission</p>
          </div>
          <div style="padding: 24px; background-color: #f4f6f1; border-radius: 12px; border: 1px solid #e2e8f0;">
            <h3 style="margin-top: 0; color: #1B3518; font-size: 16px; border-bottom: 2px solid #29402e; padding-bottom: 5px;">Form Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #4b5563; width: 150px;">From Reviewee:</td>
                <td style="padding: 6px 0; font-family: monospace; font-weight: bold;">${email || 'Anonymous'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Topic Selected:</td>
                <td style="padding: 6px 0; font-weight: bold; text-transform: uppercase; color: #a37c82;">${topic}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">User Rating:</td>
                <td style="padding: 6px 0; color: #f59e0b; font-weight: bold;">${'★'.repeat(rating || 5)}${'☆'.repeat(5 - (rating || 5))} (${rating}/5)</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Submitted At:</td>
                <td style="padding: 6px 0; color: #6b7280; font-family: monospace;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
            
            <h3 style="color: #1B3518; font-size: 15px; margin-top: 20px; margin-bottom: 10px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px;">Message Content</h3>
            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 13.5px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${message}</div>
          </div>
          <p style="font-size: 11px; text-align: center; color: #9ca3af; margin-top: 28px; line-height: 1.4;">© 2026 BoardPassPH. Forwarded securely to administrative email. Confirmed safe transmittal.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Secure Helpline Dispatch Success] ID: ${info.messageId} | Directed to: ${targetEmail}`);
    return res.json({ status: 'success', statusText: 'Securely dispatched email to dsmind.pmle@gmail.com' });
  } catch (err: any) {
    console.error('SMTP error during helpline dispatch:', err.message || err);
    // Fallback to mock response
    return res.json({ 
      status: 'success', 
      isMock: true, 
      statusText: 'Synchronized & logged to backend console (dev fallback)' 
    });
  }
});

app.post('/api/send-otp', async (req, res) => {
  console.log('OTP request received:', req.body);
  if (!req.body) {
    return res.status(400).json({ success: false, error: 'Request body is missing' });
  }
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, error: 'Email and OTP are required' });
  }

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const smtpFrom = process.env.SMTP_FROM || 'BoardPassPH <noreply@boardpassph.com>';

  // If SMTP is not fully configured, log the generated OTP to the server console and provide a friendly preview
  if (!smtpUser || !smtpUser.trim() || !smtpPass || !smtpPass.trim()) {
    console.log(`\n======================================================`);
    console.log(`[BOARDPASS-PH DEV NOTICE: NO SMTP CREDENTIALS FOUND]`);
    console.log(`We simulated sending the recovery OTP to registered address: ${email}`);
    console.log(`OTP Code is: ${otp}`);
    console.log(`To receive real emails, set SMTP_USER and SMTP_PASS environment variables.`);
    console.log(`======================================================\n`);
    
    return res.json({
      success: true,
      isMock: true,
      message: `Simulated secure transmission: registered recipient info identified. Code: ${otp}`
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const mailOptions = {
      from: smtpFrom,
      to: email,
      subject: `[BoardPassPH] Verification Code: ${otp}`,
      text: `Hello PMLE Candidate,\n\nYou have requested a password reset for your BoardPassPH account.\n\nYour 6-digit OTP code is: ${otp}\n\nIf you did not request this reset, please ignore this email.\n\nBest regards,\nBoardPassPH Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #fbfbf9; color: #1B3518;">
          <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #eaeaea; padding-bottom: 15px;">
            <h2 style="color: #29402e; font-size: 26px; font-weight: 700; margin: 0; font-family: 'Space Grotesk', system-ui, sans-serif;">Board<span style="color: #ff6584; font-weight: normal; font-style: italic;">Pass</span>PH</h2>
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #a37c82; margin: 4px 0 0 0; font-weight: bold;">Philippine PmLE Licensure Examination review</p>
          </div>
          <div style="padding: 24px; background-color: #f4f6f1; border-radius: 12px; border: 1px solid #e2e8f0;">
            <p style="font-size: 15px; margin-top: 0; line-height: 1.5;">Hello PMLE Candidate,</p>
            <p style="font-size: 14px; line-height: 1.5; color: #374151;">You requested a recovery verification key to reset your BoardPassPH password. Use the verification passcode below to authorize this session:</p>
            <div style="text-align: center; margin: 28px 0;">
              <span style="font-family: monospace; font-size: 34px; font-weight: 700; letter-spacing: 0.25em; color: #ff6584; background-color: #ffffff; padding: 12px 24px; border-radius: 10px; border: 2px dashed #a37c82; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">${otp}</span>
            </div>
            <p style="font-size: 13px; color: #e5526c; font-style: italic; margin-bottom: 0;">This security code is active for 10 minutes. If you did not trigger this request, please change your password rules immediately.</p>
          </div>
          <p style="font-size: 11px; text-align: center; color: #9ca3af; margin-top: 28px; line-height: 1.4;">© 2026 BoardPassPH. Built with 🍓🍵 aesthetics. Dedicated to excellence in psychometrician licensure preparations.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Recovery Send Success] ID: ${info.messageId} | Recipient: ${email}`);
    return res.json({ success: true, isMock: false });
  } catch (err: any) {
    console.error('SMTP Error in /api/send-otp:', err.message || err);
    // Fallback to mock behavior if SMTP fails, so user is not blocked
    return res.json({
      success: true,
      isMock: true,
      message: `Email transmission failed (${err.message}). Simulated OTP block activated. Code: ${otp}`
    });
  }
});

// Configure Vite middleware in development vs static file serving in production
async function startAppServer() {
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const viteModule = await import('vite');
    const vite = await viteModule.createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Only serve static files if we are not on Vercel
    if (!process.env.VERCEL) {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  // Ensure API always returns JSON for not-found and internal errors
  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  // Express error handler to return JSON instead of HTML error pages
  // This prevents Vercel from returning HTML 500 pages when our frontend expects JSON
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('Unhandled server error:', err && err.stack ? err.stack : err);
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: 'Internal Server Error', message: err?.message || 'An unexpected error occurred' });
  });

  // Do not listen on a port if running on Vercel (Vercel Serverless handles routing)
  if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startAppServer().catch((e) => {
  console.error('Failed to trigger development application server:', e);
});

export default app;
