import { FlashcardDeck } from '@/types';

const STORAGE_KEY = 'flashcard-decks';

export function getDecks(): FlashcardDeck[] {
  const storedDecks = localStorage.getItem(STORAGE_KEY);
  if (!storedDecks) return [];

  try {
    // Parse the JSON and convert date strings back to Date objects
    const decks: FlashcardDeck[] = JSON.parse(storedDecks);
    return decks.map((deck) => ({
      ...deck,
      createdAt: new Date(deck.createdAt),
      lastModified: new Date(deck.lastModified),
      cards: deck.cards.map((card) => ({
        ...card,
        createdAt: new Date(card.createdAt),
        lastReviewed: card.lastReviewed
          ? new Date(card.lastReviewed)
          : undefined,
      })),
    }));
  } catch (error) {
    console.error('Failed to parse stored decks:', error);
    return [];
  }
}

export function saveDeck(deck: FlashcardDeck): void {
  const decks = getDecks();
  const existingDeckIndex = decks.findIndex((d) => d.id === deck.id);

  if (existingDeckIndex >= 0) {
    // Update existing deck
    decks[existingDeckIndex] = {
      ...deck,
      lastModified: new Date(),
    };
  } else {
    // Add new deck
    decks.push(deck);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

export function deleteDeck(deckId: string): void {
  const decks = getDecks();
  const updatedDecks = decks.filter((deck) => deck.id !== deckId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks));
}

export function getDeck(deckId: string): FlashcardDeck | undefined {
  const decks = getDecks();
  return decks.find((deck) => deck.id === deckId);
}
