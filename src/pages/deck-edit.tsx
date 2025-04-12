import { CreateCardDialog } from '@/components/create-card-dialog';
import { EditCardDialog } from '@/components/edit-card-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getDeck, saveDeck } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { Flashcard, FlashcardDeck } from '@/types';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function DeckEditPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (deckId) {
      const loadedDeck = getDeck(deckId);
      if (loadedDeck) {
        setDeck(loadedDeck);
        setName(loadedDeck.name);
        setDescription(loadedDeck.description);
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

  const handleSaveDeckInfo = () => {
    if (!deck) return;

    const updatedDeck: FlashcardDeck = {
      ...deck,
      name,
      description,
      lastModified: new Date(),
    };

    saveDeck(updatedDeck);
    setDeck(updatedDeck);

    toast({
      title: 'Success',
      description: 'Deck information has been updated.',
    });
  };

  const handleAddCard = (card: Flashcard) => {
    if (!deck) return;

    const updatedDeck: FlashcardDeck = {
      ...deck,
      cards: [...deck.cards, card],
      lastModified: new Date(),
    };

    saveDeck(updatedDeck);
    setDeck(updatedDeck);
  };

  const handleUpdateCard = (updatedCard: Flashcard) => {
    if (!deck) return;

    const updatedCards = deck.cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );

    const updatedDeck: FlashcardDeck = {
      ...deck,
      cards: updatedCards,
      lastModified: new Date(),
    };

    saveDeck(updatedDeck);
    setDeck(updatedDeck);
  };

  const handleDeleteCard = (cardId: string) => {
    if (!deck) return;

    const updatedCards = deck.cards.filter((card) => card.id !== cardId);

    const updatedDeck: FlashcardDeck = {
      ...deck,
      cards: updatedCards,
      lastModified: new Date(),
    };

    saveDeck(updatedDeck);
    setDeck(updatedDeck);

    toast({
      title: 'Card deleted',
      description: 'The flashcard has been removed from this deck.',
    });
  };

  if (!deck) {
    return <div className="container mx-auto py-6 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 mt-4">
      <div className="flex flex-col items-center w-full gap-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Deck</h1>
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          {/* // Deck Name */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="text-sm font-medium">
              Deck Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-2/3 sm:w-1/2 self-center"
            />
          </div>
          {/* // Deck Description */}

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-2/3 sm:w-1/2 self-center"
            />
          </div>

          <div className="flex justify-center">
            <Button onClick={handleSaveDeckInfo} className="mt-2">
              Save Deck Info
            </Button>
          </div>
        </div>

        <div className="w-2/3 bg-border h-[1px] sm:w-full"></div>

        <div className="flex flex-col gap-2 justify-between items-center sm:flex-row w-full">
          <h2
            className={cn('text-xl font-semibold', {
              'w-full': deck.cards.length === 0,
            })}
          >
            Flashcards ({deck.cards.length})
          </h2>
          {deck.cards.length > 0 && (
            <CreateCardDialog onCardCreate={handleAddCard} />
          )}
        </div>

        {deck.cards.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20 w-full">
            <h3 className="text-lg font-medium mb-2">No flashcards yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first flashcard to start building your deck.
            </p>
            <CreateCardDialog onCardCreate={handleAddCard} />
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2 text-start">Question</TableHead>
                  <TableHead className="w-1/2 text-start">Answer</TableHead>
                  <TableHead className="text-center">Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deck.cards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell className="w-1/2 text-start">
                      {card.question}
                    </TableCell>
                    <TableCell className="w-1/2 text-start">
                      {card.answer}
                    </TableCell>
                    <TableCell className="">
                      <div className="flex justify-end space-x-1">
                        <EditCardDialog
                          card={card}
                          onCardUpdate={handleUpdateCard}
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Flashcard
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this flashcard?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCard(card.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
