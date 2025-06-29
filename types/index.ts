export interface Card {
  id: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  correctCount: number;
  incorrectCount: number;
  weight: number; // Higher weight = shown more frequently
  isGenerated?: boolean; // New property to track AI-generated cards
}

export interface Collection {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  cards: Card[];
  color: string;
}

export interface PracticeSession {
  collectionId: string;
  startTime: Date;
  endTime?: Date;
  totalCards: number;
  correctAnswers: number;
  incorrectAnswers: number;
  cardResults: Array<{
    cardId: string;
    correct: boolean;
  }>;
}

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

export interface GeneratedQuestion {
  question: string;
  answer: string;
  type?: string;
}

export interface ImageAnalysisResult {
  extractedText: string;
  confidence: number;
  detectedElements: {
    titles: string[];
    lists: string[];
    definitions: string[];
    keyPoints: string[];
  };
}

export interface ProcessedImage {
  id: string;
  file: File;
  preview: string;
  extractedText: string;
  analysisResult?: ImageAnalysisResult;
  status: 'processing' | 'completed' | 'error';
}

export const COLLECTION_COLORS = [
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EF4444', // Red
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#84CC16', // Lime
];

export const QUESTION_TYPES = [
  { value: 'mixed', label: 'Mixte' },
  { value: 'qcm', label: 'QCM (Choix multiples)' },
  { value: 'true-false', label: 'Vrai/Faux' },
  { value: 'short-answer', label: 'Réponse courte' },
  { value: 'definition', label: 'Définition' },
  { value: 'fill-blank', label: 'Texte à trous' },
];