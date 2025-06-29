'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Collection, Card } from '@/types';
import { CardView } from '@/components/cards/card-view';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Home, X } from 'lucide-react';
import { shuffleCardsWithWeights } from '@/lib/card-ranking';
import { useCollections } from '@/hooks/use-collections';

interface PracticeSessionProps {
  collection: Collection;
  onComplete: (score: { correct: number; total: number }) => void;
  onExit: () => void;
}

// Memoized components for better performance
const MemoizedCardView = React.memo(CardView);
const MemoizedProgress = React.memo(Progress);

export function PracticeSession({ collection, onComplete, onExit }: PracticeSessionProps) {
  const { updateCard } = useCollections();
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [results, setResults] = useState<Array<{ cardId: string; correct: boolean }>>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  // Memoize shuffled cards to prevent unnecessary recalculations
  const shuffledCards = useMemo(() => {
    return shuffleCardsWithWeights(collection.cards);
  }, [collection.cards]);

  useEffect(() => {
    setCards(shuffledCards);
  }, [shuffledCards]);

  // Memoize current card and progress calculations
  const currentCard = useMemo(() => cards[currentCardIndex], [cards, currentCardIndex]);
  const progress = useMemo(() => 
    cards.length > 0 ? ((currentCardIndex) / cards.length) * 100 : 0, 
    [currentCardIndex, cards.length]
  );
  const remainingCards = useMemo(() => 
    cards.length - currentCardIndex - 1, 
    [cards.length, currentCardIndex]
  );

  // Optimized answer handler with useCallback to prevent re-renders
  const handleAnswer = useCallback((correct: boolean) => {
    if (!currentCard || isAnimating) return;

    setIsAnimating(true);

    // Batch state updates for better performance
    const updates = correct
      ? { correctCount: currentCard.correctCount + 1 }
      : { incorrectCount: currentCard.incorrectCount + 1 };
    
    updateCard(collection.id, currentCard.id, updates);

    // Use functional updates to avoid stale closures
    setResults(prev => [...prev, { cardId: currentCard.id, correct }]);
    
    if (correct) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }

    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (currentCardIndex + 1 >= cards.length) {
          setIsComplete(true);
          onComplete({ 
            correct: correct ? correctCount + 1 : correctCount, 
            total: cards.length 
          });
        } else {
          // Batch state updates
          setCurrentCardIndex(prev => prev + 1);
          setShowAnswer(false);
          setCardKey(prev => prev + 1);
        }
        setIsAnimating(false);
      }, 300); // Reduced timeout for snappier feel
    });
  }, [currentCard, isAnimating, collection.id, updateCard, currentCardIndex, cards.length, correctCount, onComplete]);

  // Optimized restart handler
  const handleRestart = useCallback(() => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setResults([]);
    setIsComplete(false);
    setIsAnimating(false);
    setCardKey(0);
    setCards(shuffleCardsWithWeights(collection.cards));
  }, [collection.cards]);

  // Optimized flip handler
  const handleFlip = useCallback(() => {
    setShowAnswer(prev => !prev);
  }, []);

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <X className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">No cards available</h2>
            <p className="text-muted-foreground leading-relaxed">
              Add some cards to this collection to start practicing.
            </p>
            <Button onClick={onExit} size="lg">
              <Home className="mr-2 h-4 w-4" />
              Back to Collections
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const percentage = Math.round((correctCount / cards.length) * 100);
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg">
          <div className="bg-card border rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Session Complete!</h2>
              <p className="text-muted-foreground text-lg">
                You've completed all cards in "{collection.title}"
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">
                {percentage}%
              </div>
              <div className="text-muted-foreground">
                {correctCount} out of {cards.length} correct
              </div>
              
              <MemoizedProgress value={percentage} className="w-full h-3" />
              
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">Correct: {correctCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="font-medium">Incorrect: {incorrectCount}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleRestart} variant="outline" size="lg" className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Practice Again
              </Button>
              <Button onClick={onExit} size="lg" className="flex-1">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold truncate">{collection.title}</h1>
              <p className="text-sm text-muted-foreground">
                Card {currentCardIndex + 1} of {cards.length}
              </p>
            </div>
            <Button variant="outline" onClick={onExit} size="sm">
              <X className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <MemoizedProgress value={progress} className="w-full" />
          </div>

          {/* Status Badges */}
          <div className="flex justify-center space-x-4 mt-4">
            <Badge className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              Correct: {correctCount}
            </Badge>
            <Badge className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold">
              Incorrect: {incorrectCount}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 font-semibold">
              Remaining: {remainingCards}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content - Fixed Height Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 280px)' }}>
          <div className="w-full max-w-2xl">
            {/* Card Stack Visual Effect - Optimized with transform3d for GPU acceleration */}
            <div className="relative mb-8">
              {/* Background cards to simulate realistic stack */}
              {remainingCards > 2 && (
                <div 
                  className="absolute inset-0 bg-card/30 rounded-xl border border-border/30"
                  style={{ 
                    width: '98%', 
                    height: '98%', 
                    left: '1%', 
                    top: '1%',
                    transform: 'translate3d(3px, 3px, 0) rotateZ(1deg)',
                    willChange: 'transform'
                  }}
                />
              )}
              {remainingCards > 1 && (
                <div 
                  className="absolute inset-0 bg-card/50 rounded-xl border border-border/40"
                  style={{ 
                    width: '99%', 
                    height: '99%', 
                    left: '0.5%', 
                    top: '0.5%',
                    transform: 'translate3d(1.5px, 1.5px, 0) rotateZ(0.5deg)',
                    willChange: 'transform'
                  }}
                />
              )}
              {remainingCards > 0 && (
                <div 
                  className="absolute inset-0 bg-card/70 rounded-xl border border-border/50"
                  style={{ 
                    width: '99.5%', 
                    height: '99.5%', 
                    left: '0.25%', 
                    top: '0.25%',
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'transform'
                  }}
                />
              )}
              
              {/* Current Card - Optimized with transform3d and will-change */}
              <div 
                className="relative transition-all duration-300 ease-out"
                style={{
                  transform: isAnimating 
                    ? 'translate3d(100%, 0, 0) rotateZ(12deg) scale(0.95)' 
                    : 'translate3d(0, 0, 0) rotateZ(0deg) scale(1)',
                  opacity: isAnimating ? 0 : 1,
                  willChange: 'transform, opacity'
                }}
              >
                <MemoizedCardView
                  key={cardKey}
                  card={currentCard}
                  showAnswer={showAnswer}
                  onFlip={handleFlip}
                  className="shadow-xl"
                />
              </div>
            </div>

            {/* Fixed Height Action Area - Prevents Layout Shift */}
            <div className="h-32 flex items-center justify-center">
              {showAnswer ? (
                <div className="flex justify-center space-x-6 w-full">
                  <Button
                    onClick={() => handleAnswer(false)}
                    variant="outline"
                    size="lg"
                    disabled={isAnimating}
                    className="flex-1 max-w-xs h-14 border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/50 transition-all duration-200"
                  >
                    <XCircle className="mr-3 h-5 w-5" />
                    <span className="font-semibold">Incorrect</span>
                  </Button>
                  <Button
                    onClick={() => handleAnswer(true)}
                    size="lg"
                    disabled={isAnimating}
                    className="flex-1 max-w-xs h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-200"
                  >
                    <CheckCircle className="mr-3 h-5 w-5" />
                    <span>Correct</span>
                  </Button>
                </div>
              ) : (
                <div className="text-center w-full">
                  <div className="bg-card border rounded-xl p-6 max-w-lg mx-auto">
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Think of your answer, then click the card to reveal the correct answer.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}