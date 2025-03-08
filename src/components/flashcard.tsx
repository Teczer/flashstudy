import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flashcard as FlashcardType } from "@/types";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  card: FlashcardType;
  showControls?: boolean;
  onNext?: () => void;
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

export function Flashcard({ 
  card, 
  showControls = false,
  onNext,
  onCorrect,
  onIncorrect
}: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleCorrect = () => {
    if (onCorrect) onCorrect();
    setFlipped(false);
    if (onNext) onNext();
  };

  const handleIncorrect = () => {
    if (onIncorrect) onIncorrect();
    setFlipped(false);
    if (onNext) onNext();
  };

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <div 
        className={cn(
          "relative w-full transition-transform duration-500 transform-style-3d cursor-pointer",
          flipped ? "rotate-y-180" : ""
        )}
        onClick={handleFlip}
      >
        {/* Front side - Question */}
        <Card className={cn(
          "absolute w-full h-full backface-hidden p-6 flex flex-col justify-between",
          !flipped ? "z-10" : "z-0"
        )}>
          <CardContent className="pt-6 flex-grow flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Question</h3>
              <p className="text-xl">{card.question}</p>
            </div>
          </CardContent>
          <div className="text-center text-sm text-muted-foreground mt-4">
            Click to reveal answer
          </div>
        </Card>

        {/* Back side - Answer */}
        <Card className={cn(
          "absolute w-full h-full backface-hidden p-6 rotate-y-180 flex flex-col justify-between",
          flipped ? "z-10" : "z-0"
        )}>
          <CardContent className="pt-6 flex-grow flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Answer</h3>
              <p className="text-xl">{card.answer}</p>
            </div>
          </CardContent>
          
          {showControls && (
            <div className="flex justify-center space-x-4 mt-4">
              <Button 
                variant="outline" 
                className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncorrect();
                }}
              >
                Incorrect
              </Button>
              <Button 
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCorrect();
                }}
              >
                Correct
              </Button>
            </div>
          )}
          
          {!showControls && (
            <div className="text-center text-sm text-muted-foreground mt-4">
              Click to see question
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}