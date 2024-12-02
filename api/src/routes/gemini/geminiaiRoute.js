import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({
      message: 'Error with Gemini API integration.',
      error: error.message,
    });
  }
});

export default router;
