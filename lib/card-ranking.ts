import { Card } from '@/types';

export function calculateCardWeight(card: Card): number {
  const totalAttempts = card.correctCount + card.incorrectCount;
  if (totalAttempts === 0) return 1; // New cards have normal weight
  
  const successRate = card.correctCount / totalAttempts;
  
  // Cards with lower success rates get higher weights (shown more frequently)
  // Weight ranges from 0.1 (very successful) to 3.0 (very unsuccessful)
  if (successRate >= 0.9) return 0.1;
  if (successRate >= 0.8) return 0.3;
  if (successRate >= 0.7) return 0.5;
  if (successRate >= 0.6) return 0.8;
  if (successRate >= 0.5) return 1.0;
  if (successRate >= 0.4) return 1.5;
  if (successRate >= 0.3) return 2.0;
  if (successRate >= 0.2) return 2.5;
  return 3.0;
}

export function shuffleCardsWithWeights(cards: Card[]): Card[] {
  const weightedCards: Card[] = [];
  
  cards.forEach(card => {
    const weight = calculateCardWeight(card);
    const copies = Math.ceil(weight);
    
    for (let i = 0; i < copies; i++) {
      weightedCards.push(card);
    }
  });
  
  // Shuffle the weighted array
  for (let i = weightedCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [weightedCards[i], weightedCards[j]] = [weightedCards[j], weightedCards[i]];
  }
  
  // Remove duplicates while maintaining weighted order
  const uniqueCards: Card[] = [];
  const seen = new Set<string>();
  
  for (const card of weightedCards) {
    if (!seen.has(card.id)) {
      uniqueCards.push(card);
      seen.add(card.id);
    }
  }
  
  return uniqueCards;
}