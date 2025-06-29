export interface Card {
  id: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  correctCount: number;
  incorrectCount: number;
  weight: number; // Higher weight = shown more frequently
}

export interface Collection {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  cards: Card[];
  color: string;
  folderIds: string[]; // Changed to array to support multiple folders
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  order: number; // For manual reordering
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

export const FOLDER_COLORS = [
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EF4444', // Red
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#84CC16', // Lime
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#8B5A2B', // Brown
  '#6B7280', // Gray
  '#DC2626', // Red-600
  '#059669', // Emerald-600
  '#7C3AED', // Violet-600
  '#DB2777', // Pink-600
];