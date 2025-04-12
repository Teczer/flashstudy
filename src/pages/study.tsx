import { Flashcard } from '@/components/flashcard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { getDeck, saveDeck } from '@/lib/storage';
import { shuffleArray } from '@/lib/utils';
import { FlashcardDeck, Flashcard as FlashcardType } from '@/types';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function StudyPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [studyCards, setStudyCards] = useState<FlashcardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (deckId) {
      const loadedDeck = getDeck(deckId);
      if (loadedDeck) {
        if (loadedDeck.cards.length === 0) {
          navigate(`/deck/${deckId}`);
          toast({
            title: 'Cannot study',
            description: 'This deck has no flashcards. Add some cards first.',
            variant: 'destructive',
          });
          return;
        }

        setDeck(loadedDeck);
        const shuffled = shuffleArray([...loadedDeck.cards]);
        setStudyCards(shuffled);
      } else {
        navigate('/');
        toast({
          title: 'Error',
          description: 'Deck not found',
          variant: 'destructive',
        });
      }
    }
  }, [deckId, navigate, toast]);

  const handleNext = () => {
    if (currentCardIndex < studyCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setIsComplete(true);

      // Update last reviewed date for all cards in the deck
      if (deck) {
        const updatedCards = deck.cards.map((card) => ({
          ...card,
          lastReviewed: new Date(),
        }));

        const updatedDeck: FlashcardDeck = {
          ...deck,
          cards: updatedCards,
          lastModified: new Date(),
        };

        saveDeck(updatedDeck);
      }
    }
  };

  const handleCorrect = () => {
    setCorrectCount(correctCount + 1);
  };

  const handleIncorrect = () => {
    setIncorrectCount(incorrectCount + 1);
  };

  const handleRestart = () => {
    const shuffled = shuffleArray([...studyCards]);
    setStudyCards(shuffled);
    setCurrentCardIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIsComplete(false);
  };

  if (!deck || studyCards.length === 0) {
    return <div className="container mx-auto py-6 px-4">Loading...</div>;
  }

  const progress = Math.round(
    ((currentCardIndex + (isComplete ? 1 : 0)) / studyCards.length) * 100
  );

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/deck/${deckId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Deck
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{deck.name}</h1>
        <p className="text-muted-foreground">
          Studying {studyCards.length} flashcards
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            {isComplete
              ? 'Complete!'
              : `Card ${currentCardIndex + 1} of ${studyCards.length}`}
          </span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {!isComplete ? (
        <div className="mb-8">
          <Flashcard
            card={studyCards[currentCardIndex]}
            showControls={true}
            onNext={handleNext}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <h2 className="text-2xl font-bold mb-4">Study Session Complete!</h2>

          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">
                {correctCount}
              </p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-500">
                {incorrectCount}
              </p>
              <p className="text-sm text-muted-foreground">Incorrect</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{studyCards.length}</p>
              <p className="text-sm text-muted-foreground">Total Cards</p>
            </div>
          </div>

          <Button onClick={handleRestart}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Study Again
          </Button>
        </div>
      )}
    </div>
  );
}
