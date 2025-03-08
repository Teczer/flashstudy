export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  createdAt: Date;
  lastReviewed?: Date;
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
  createdAt: Date;
  lastModified: Date;
}