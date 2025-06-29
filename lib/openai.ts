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
  difficulty: 'easy' | 'intermediate' | 'hard',
  language: 'fr' | 'en' | 'es' | 'de',
  collectionTitle?: string
): Promise<GeneratedQuestion[]> {
  try {
    const languageInstructions = {
      fr: 'Générez les questions et réponses en français.',
      en: 'Generate questions and answers in English.',
      es: 'Genera las preguntas y respuestas en español.',
      de: 'Generieren Sie Fragen und Antworten auf Deutsch.',
    };

    const difficultyInstructions = {
      easy: {
        fr: 'Niveau facile - questions de base et concepts fondamentaux',
        en: 'Easy level - basic questions and fundamental concepts',
        es: 'Nivel fácil - preguntas básicas y conceptos fundamentales',
        de: 'Einfaches Niveau - grundlegende Fragen und fundamentale Konzepte',
      },
      intermediate: {
        fr: 'Niveau intermédiaire - questions modérément complexes nécessitant une compréhension approfondie',
        en: 'Intermediate level - moderately complex questions requiring deeper understanding',
        es: 'Nivel intermedio - preguntas moderadamente complejas que requieren comprensión profunda',
        de: 'Mittleres Niveau - mäßig komplexe Fragen, die tieferes Verständnis erfordern',
      },
      hard: {
        fr: 'Niveau difficile - questions avancées et complexes pour experts',
        en: 'Hard level - advanced and complex questions for experts',
        es: 'Nivel difícil - preguntas avanzadas y complejas para expertos',
        de: 'Schweres Niveau - fortgeschrittene und komplexe Fragen für Experten',
      },
    };

    const systemPrompt = `You are an expert educational content creator. Generate exactly ${count} high-quality flashcard questions and answers based on the user's prompt.

${languageInstructions[language]}
${difficultyInstructions[difficulty][language]}

Rules:
1. Return ONLY a valid JSON array of objects with "question" and "answer" properties
2. Each question should be clear, concise, and educational
3. Each answer should be accurate and complete but not overly long
4. Questions should vary in difficulty and style according to the specified difficulty level
5. Make questions engaging and memorable
6. No additional text, explanations, or formatting outside the JSON array
7. Ensure all content is in ${language === 'fr' ? 'French' : language === 'en' ? 'English' : language === 'es' ? 'Spanish' : 'German'}

Example format:
[
  {"question": "What is the capital of France?", "answer": "Paris"},
  {"question": "Who wrote Romeo and Juliet?", "answer": "William Shakespeare"}
]`;

    const userPrompt = `Generate ${count} flashcard questions about: ${prompt}${
      collectionTitle ? ` (for collection: "${collectionTitle}")` : ''
    }
    
Difficulty level: ${difficulty}
Language: ${language}`;

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