import { useState, useEffect } from "react";
import { CreateDeckDialog } from "@/components/create-deck-dialog";
import { DeckCard } from "@/components/deck-card";
import { getDecks } from "@/lib/storage";
import { FlashcardDeck } from "@/types";
import { BookOpen } from "lucide-react";

export function HomePage() {
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = () => {
    const storedDecks = getDecks();
    setDecks(storedDecks);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
          <p className="text-muted-foreground mt-1">
            Create and study flashcards to improve your learning.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <CreateDeckDialog />
        </div>
      </div>

      {decks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No flashcard decks yet</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Create your first deck to start organizing your flashcards for effective studying.
          </p>
          <CreateDeckDialog />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <DeckCard key={deck.id} deck={deck} onDelete={loadDecks} />
          ))}
        </div>
      )}
    </div>
  );
}