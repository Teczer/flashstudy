import OpenAI from 'openai';
import { GeneratedQuestion } from '@/types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, use server-side API routes
});

export async function generateQuestions(
  prompt: string,
  count: number,
  collectionTitle?: string
): Promise<GeneratedQuestion[]> {
  try {
    const systemPrompt = `You are an expert educational content creator. Generate exactly ${count} high-quality flashcard questions and answers based on the user's prompt.

Rules:
1. Return ONLY a valid JSON array of objects with "question" and "answer" properties
2. Each question should be clear, concise, and educational
3. Each answer should be accurate and complete but not overly long
4. Questions should vary in difficulty and style
5. Make questions engaging and memorable
6. No additional text, explanations, or formatting outside the JSON array

Example format:
[
  {"question": "What is the capital of France?", "answer": "Paris"},
  {"question": "Who wrote Romeo and Juliet?", "answer": "William Shakespeare"}
]`;

    const userPrompt = `Generate ${count} flashcard questions about: ${prompt}${
      collectionTitle ? ` (for collection: "${collectionTitle}")` : ''
    }`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Parse the JSON response
    const questions: GeneratedQuestion[] = JSON.parse(content);

    // Validate the response
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Validate each question object
    const validQuestions = questions.filter(
      (q) =>
        q &&
        typeof q.question === 'string' &&
        typeof q.answer === 'string' &&
        q.question.trim() &&
        q.answer.trim()
    );

    if (validQuestions.length === 0) {
      throw new Error('No valid questions generated');
    }

    return validQuestions.slice(0, count); // Ensure we don't exceed requested count
  } catch (error) {
    console.error('Error generating questions:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API key is not configured. Please add your API key to continue.');
      }
      if (error.message.includes('quota')) {
        throw new Error('OpenAI API quota exceeded. Please check your usage limits.');
      }
      if (error.message.includes('JSON')) {
        throw new Error('Failed to parse AI response. Please try again.');
      }
    }
    
    throw new Error('Failed to generate questions. Please try again.');
  }
}

export function validateApiKey(): boolean {
  return !!process.env.NEXT_PUBLIC_OPENAI_API_KEY;
}