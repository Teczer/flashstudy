import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface ExtractedContent {
  text: string;
  structure: {
    titles: string[];
    lists: string[];
    definitions: string[];
    keyPoints: string[];
  };
}

export interface GeneratedQuestionWithType {
  question: string;
  answer: string;
  type: string;
}

// Convert image file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = (error) => reject(error);
  });
}

// Extract text from image using OpenAI Vision API
export async function extractTextFromImage(file: File): Promise<string> {
  try {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    // Convert image to base64
    const base64Image = await fileToBase64(file);

    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this image and extract all visible text. Focus on:
              - Handwritten notes and text
              - Printed text and documents
              - Titles, headings, and important sections
              - Lists, definitions, and key concepts
              - Mathematical formulas or equations
              - Any educational content
              
              Please preserve the structure and organization of the content as much as possible. Return only the extracted text without additional commentary.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
                detail: 'high',
              },
            },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.1,
    });

    const extractedText = response.choices[0]?.message?.content;
    if (!extractedText) {
      throw new Error('No text could be extracted from the image');
    }

    return extractedText.trim();
  } catch (error) {
    console.error('Error extracting text from image:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API key is not configured properly');
      }
      if (error.message.includes('quota')) {
        throw new Error('OpenAI API quota exceeded');
      }
      if (error.message.includes('model')) {
        throw new Error('Vision model is not available');
      }
    }
    
    throw new Error('Failed to extract text from image. Please try again.');
  }
}

// Generate flashcards from extracted text
export async function generateQuestionsFromText(
  text: string,
  count: number,
  questionType: string = 'mixed',
  collectionTitle?: string
): Promise<GeneratedQuestionWithType[]> {
  try {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const typeInstructions = {
      mixed: 'Generate a variety of question types including multiple choice, true/false, short answer, and definitions.',
      qcm: 'Generate multiple choice questions with 4 options each. Format: "Question? A) Option1 B) Option2 C) Option3 D) Option4" and provide the correct answer.',
      'true-false': 'Generate true/false questions. Provide clear statements that can be definitively answered as true or false.',
      'short-answer': 'Generate questions that require brief, specific answers (1-3 words or short phrases).',
      definition: 'Generate definition-based questions asking "What is..." or "Define..." followed by key terms from the content.',
    };

    const systemPrompt = `You are an expert educational content creator. Generate exactly ${count} high-quality flashcard questions based on the provided text content.

Instructions:
- ${typeInstructions[questionType as keyof typeof typeInstructions] || typeInstructions.mixed}
- Focus on the most important concepts, facts, and key information
- Make questions clear, specific, and educational
- Ensure answers are accurate and complete
- Vary difficulty levels appropriately
- Return ONLY a valid JSON array of objects with "question", "answer", and "type" properties

Example format:
[
  {"question": "What is the capital of France?", "answer": "Paris", "type": "short-answer"},
  {"question": "The French Revolution began in 1789. True or False?", "answer": "True", "type": "true-false"}
]`;

    const userPrompt = `Generate ${count} flashcard questions from this content:

${text}

${collectionTitle ? `Context: This is for a collection titled "${collectionTitle}"` : ''}

Question type preference: ${questionType}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Parse the JSON response
    const questions: GeneratedQuestionWithType[] = JSON.parse(content);

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

    // Ensure type is set for each question
    return validQuestions.slice(0, count).map((q) => ({
      ...q,
      type: q.type || questionType,
    }));
  } catch (error) {
    console.error('Error generating questions from text:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API key is not configured properly');
      }
      if (error.message.includes('quota')) {
        throw new Error('OpenAI API quota exceeded');
      }
      if (error.message.includes('JSON')) {
        throw new Error('Failed to parse AI response. Please try again.');
      }
    }
    
    throw new Error('Failed to generate questions from text. Please try again.');
  }
}

// Analyze image content structure (advanced feature)
export async function analyzeImageStructure(file: File): Promise<ExtractedContent> {
  try {
    const base64Image = await fileToBase64(file);

    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this image and extract structured information. Identify and categorize:
              1. Titles and headings
              2. Lists and bullet points
              3. Definitions and key terms
              4. Important concepts and key points
              
              Return the analysis in JSON format with the following structure:
              {
                "text": "full extracted text",
                "structure": {
                  "titles": ["title1", "title2"],
                  "lists": ["list item 1", "list item 2"],
                  "definitions": ["term: definition"],
                  "keyPoints": ["key point 1", "key point 2"]
                }
              }`,
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
                detail: 'high',
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
      temperature: 0.1,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from analysis');
    }

    const analysis: ExtractedContent = JSON.parse(content);
    return analysis;
  } catch (error) {
    console.error('Error analyzing image structure:', error);
    
    // Fallback to simple text extraction
    const text = await extractTextFromImage(file);
    return {
      text,
      structure: {
        titles: [],
        lists: [],
        definitions: [],
        keyPoints: [],
      },
    };
  }
}