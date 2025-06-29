'use client';

import { useState, useEffect } from 'react';
import { Collection, Card } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ArrowLeft, 
  Plus, 
  Play, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { CardForm } from '@/components/cards/card-form';
import { useCollections } from '@/hooks/use-collections';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface CollectionDetailProps {
  collection: Collection;
  onBack: () => void;
  onPractice: (collection: Collection) => void;
}

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

export function CollectionDetail({ collection: initialCollection, onBack, onPractice }: CollectionDetailProps) {
  const { collections, addCard, updateCard, deleteCard } = useCollections();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | undefined>();

  // Get the current collection from the collections state to ensure real-time updates
  const currentCollection = collections.find(c => c.id === initialCollection.id) || initialCollection;

  const filteredCards = currentCollection.cards.filter(
    (card) =>
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCard = (question: string, answer: string) => {
    if (editingCard) {
      updateCard(currentCollection.id, editingCard.id, { question, answer });
      setEditingCard(undefined);
      toast.success('Card updated successfully!', {
        description: 'Your flashcard has been updated.',
      });
    } else {
      addCard(currentCollection.id, question, answer);
      toast.success('Card added successfully!', {
        description: 'Your new flashcard has been added to the collection.',
      });
    }
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleDeleteCard = (cardId: string) => {
    if (confirm('Are you sure you want to delete this card?')) {
      deleteCard(currentCollection.id, cardId);
      toast.success('Card deleted successfully!', {
        description: 'The flashcard has been removed from your collection.',
      });
    }
  };

  const getSuccessRate = (card: Card) => {
    const total = card.correctCount + card.incorrectCount;
    if (total === 0) return 0;
    return Math.round((card.correctCount / total) * 100);
  };

  // Determine text color for practice button based on background color
  const practiceButtonTextColor = isLightColor(currentCollection.color) ? '#000000' : '#ffffff';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-start space-x-4 flex-1">
              <Button variant="ghost" onClick={onBack} size="sm" className="mt-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-start space-x-3">
                <div 
                  className="w-5 h-5 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: currentCollection.color }}
                />
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1 break-words">
                    {currentCollection.title}
                  </h1>
                  {currentCollection.description && (
                    <p className="text-muted-foreground text-sm sm:text-base break-words">
                      {currentCollection.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Button
                onClick={() => onPractice(currentCollection)}
                disabled={currentCollection.cards.length === 0}
                size="lg"
                className="flex-1 sm:flex-none px-6"
                style={{ 
                  backgroundColor: currentCollection.color,
                  color: practiceButtonTextColor
                }}
              >
                <Play className="mr-2 h-4 w-4" />
                Practice
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>
                  Updated {formatDistanceToNow(currentCollection.updatedAt, { addSuffix: true })}
                </span>
              </div>
              <Badge variant="secondary" className="flex-shrink-0">
                {currentCollection.cards.length} cards
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Actions Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md w-full lg:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button onClick={() => setIsFormOpen(true)} size="lg" className="w-full lg:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Card
          </Button>
        </div>

        {/* Cards Table */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="mx-auto max-w-md">
              <div 
                className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: currentCollection.color + '20' }}
              >
                <Plus 
                  className="h-8 w-8" 
                  style={{ color: currentCollection.color }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {searchTerm ? 'No cards found' : 'No cards yet'}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {searchTerm 
                  ? 'Try adjusting your search terms to find what you\'re looking for.'
                  : 'Add your first flashcard to get started with this collection.'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setIsFormOpen(true)} 
                  size="lg" 
                  className="px-8"
                  style={{ 
                    backgroundColor: currentCollection.color,
                    color: practiceButtonTextColor
                  }}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Your First Card
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Question</TableHead>
                    <TableHead className="min-w-[200px]">Answer</TableHead>
                    <TableHead className="w-32 text-center">Success Rate</TableHead>
                    <TableHead className="w-32 text-center">Attempts</TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCards.map((card) => {
                    const successRate = getSuccessRate(card);
                    const totalAttempts = card.correctCount + card.incorrectCount;
                    
                    return (
                      <TableRow key={card.id}>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={card.question}>
                            {card.question}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={card.answer}>
                            {card.answer}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {totalAttempts > 0 ? (
                            <div className="flex items-center justify-center space-x-2">
                              <span className="font-medium">{successRate}%</span>
                              {successRate >= 70 ? (
                                <TrendingUp className="h-4 w-4 text-emerald-600" />
                              ) : successRate >= 40 ? (
                                <div className="h-4 w-4 bg-yellow-500 rounded-full" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">New</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {totalAttempts > 0 ? (
                            <span className="text-sm text-muted-foreground font-medium">
                              {card.correctCount}/{totalAttempts}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditCard(card)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteCard(card.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Card Form */}
        <CardForm
          card={editingCard}
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open);
            if (!open) setEditingCard(undefined);
          }}
          onSave={handleSaveCard}
        />
      </div>
    </div>
  );
}