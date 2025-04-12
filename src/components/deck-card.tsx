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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { deleteDeck } from '@/lib/storage';
import { formatDate } from '@/lib/utils';
import { FlashcardDeck } from '@/types';
import { BookOpen, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeckCardProps {
  deck: FlashcardDeck;
  onDelete: () => void;
}

export function DeckCard({ deck, onDelete }: DeckCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = () => {
    deleteDeck(deck.id);
    toast({
      title: 'Deck deleted',
      description: `"${deck.name}" has been deleted.`,
    });
    onDelete();
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span className="truncate">{deck.name}</span>
          <span className="text-sm font-normal text-muted-foreground ml-2">
            {deck.cards.length} cards
          </span>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {deck.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground">
          <p>Created: {formatDate(deck.createdAt)}</p>
          <p>Last modified: {formatDate(deck.lastModified)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/deck/${deck.id}`)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/study/${deck.id}`)}
          disabled={deck.cards.length === 0}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Study
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the "{deck.name}" deck and all its
                flashcards. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
