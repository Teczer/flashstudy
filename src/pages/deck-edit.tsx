import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeck, saveDeck } from "@/lib/storage";
import { Flashcard, FlashcardDeck } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateCardDialog } from "@/components/create-card-dialog";
import { EditCardDialog } from "@/components/edit-card-dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "@/components/ui/alert-dialog";

export function DeckEditPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (deckId) {
      const loadedDeck = getDeck(deckId);
      if (loadedDeck) {
        setDeck(loadedDeck);
        setName(loadedDeck.name);
        setDescription(loadedDeck.description);
      } else {
        navigate("/");
        toast({
          title: "Error",
          description: "Deck not found",
          variant: "destructive",
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
      title: "Success",
      description: "Deck information has been updated.",
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
    
    const updatedCards = deck.cards.map(card => 
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
    
    const updatedCards = deck.cards.filter(card => card.id !== cardId);
    
    const updatedDeck: FlashcardDeck = {
      ...deck,
      cards: updatedCards,
      lastModified: new Date(),
    };
    
    saveDeck(updatedDeck);
    setDeck(updatedDeck);
    
    toast({
      title: "Card deleted",
      description: "The flashcard has been removed from this deck.",
    });
  };

  if (!deck) {
    return <div className="container mx-auto py-6 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Decks
        </Button>
        
        <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Deck</h1>
        
        <div className="grid gap-4 mb-6">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Deck Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div>
            <Button onClick={handleSaveDeckInfo} className="mt-2">
              Save Deck Info
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-semibold">Flashcards ({deck.cards.length})</h2>
          <CreateCardDialog onCardCreate={handleAddCard} />
        </div>
        
        {deck.cards.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <h3 className="text-lg font-medium mb-2">No flashcards yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first flashcard to start building your deck.
            </p>
            <CreateCardDialog onCardCreate={handleAddCard} />
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Question</TableHead>
                  <TableHead className="w-[40%]">Answer</TableHead>
                  <TableHead className="w-[10%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deck.cards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell className="align-top">
                      <div className="line-clamp-3">{card.question}</div>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="line-clamp-3">{card.answer}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <EditCardDialog 
                          card={card} 
                          onCardUpdate={handleUpdateCard} 
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Flashcard</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this flashcard? This action cannot be undone.
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