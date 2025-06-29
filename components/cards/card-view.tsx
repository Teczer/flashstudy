'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/types';
import { Card as UICard } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardViewProps {
  card: Card;
  showAnswer?: boolean;
  onFlip?: () => void;
  className?: string;
}

export function CardView({
  card,
  showAnswer = false,
  onFlip,
  className,
}: CardViewProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when card changes or showAnswer prop changes
  useEffect(() => {
    setIsFlipped(showAnswer);
  }, [showAnswer, card.id]);

  // Optimized click handler with useCallback
  const handleClick = useCallback(() => {
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    onFlip?.();
  }, [isFlipped, onFlip]);

  return (
    <div
      className={cn('relative w-full aspect-[3/2] perspective-1000', className)}
    >
      <UICard
        className={cn(
          'absolute inset-0 w-full h-full cursor-pointer preserve-3d hover:shadow-xl',
          'transition-transform duration-500 ease-out',
          isFlipped && 'rotate-y-180'
        )}
        onClick={handleClick}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Front (Question) - Optimized with transform3d */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-blue-900/30 border-2 border-blue-200/50 dark:border-blue-800/50 rounded-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0) rotateY(0deg)',
          }}
        >
          <div className="text-center w-full flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-6 mx-auto">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                Q
              </span>
            </div>
            <p className="text-xl font-medium text-foreground leading-relaxed mb-8 break-words flex-1 flex items-center justify-center">
              {card.question}
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                Click to reveal answer
              </span>
            </div>
          </div>
        </div>

        {/* Back (Answer) - Optimized with transform3d */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-center p-8 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-emerald-950/30 dark:via-green-950/30 dark:to-emerald-900/30 border-2 border-emerald-200/50 dark:border-emerald-800/50 rounded-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0) rotateY(180deg)',
          }}
        >
          <div className="text-center w-full flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-6 mx-auto">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                A
              </span>
            </div>
            <p className="text-xl font-medium text-foreground leading-relaxed mb-8 break-words flex-1 flex items-center justify-center">
              {card.answer}
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
              <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                Click to flip back
              </span>
            </div>
          </div>
        </div>
      </UICard>
    </div>
  );
}
