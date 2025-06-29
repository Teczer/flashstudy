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
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import { CardForm } from '@/components/cards/card-form';
import { AIQuestionGenerator } from '@/components/cards/ai-question-generator';
import { useCollections } from '@/hooks/use-collections';
import { useTranslation } from '@/lib/language-context';
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

export function CollectionDetail({
  collection: initialCollection,
  onBack,
  onPractice,
}: CollectionDetailProps) {
  const { t } = useTranslation();
  const { collections, addCard, addGeneratedCards, updateCard, deleteCard } =
    useCollections();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | undefined>();

  // Get the current collection from the collections state to ensure real-time updates
  const currentCollection =
    collections.find((c) => c.id === initialCollection.id) || initialCollection;

  const filteredCards = currentCollection.cards.filter(
    (card) =>
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCard = (question: string, answer: string) => {
    if (editingCard) {
      updateCard(currentCollection.id, editingCard.id, { question, answer });
      setEditingCard(undefined);
      toast.success(t('cards.updated'), {
        description: t('cards.updatedDescription'),
      });
    } else {
      addCard(currentCollection.id, question, answer, false);
      toast.success(t('cards.added'), {
        description: t('cards.addedDescription'),
      });
    }
  };

  const handleGeneratedQuestions = (questions: any[]) => {
    addGeneratedCards(currentCollection.id, questions);
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleDeleteCard = (cardId: string) => {
    if (confirm(t('cards.deleteConfirm'))) {
      deleteCard(currentCollection.id, cardId);
      toast.success(t('cards.deleted'), {
        description: t('cards.deletedDescription'),
      });
    }
  };

  const getSuccessRate = (card: Card) => {
    const total = card.correctCount + card.incorrectCount;
    if (total === 0) return 0;
    return Math.round((card.correctCount / total) * 100);
  };

  // Determine text color for practice button based on background color
  const practiceButtonTextColor = isLightColor(currentCollection.color)
    ? '#000000'
    : '#ffffff';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-start space-x-4 flex-1">
              <Button
                variant="ghost"
                onClick={onBack}
                size="sm"
                className="mt-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('common.back')}
              </Button>
              <div className="flex items-start space-x-3">
                <span className="relative flex size-3">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ backgroundColor: currentCollection.color }}
                  ></span>
                  <span
                    className="relative inline-flex size-3 rounded-full"
                    style={{ backgroundColor: currentCollection.color }}
                  ></span>
                </span>
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
                  color: practiceButtonTextColor,
                }}
              >
                <Play className="mr-2 h-4 w-4" />
                {t('common.practice')}
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>
                  {t('common.updated')}{' '}
                  {formatDistanceToNow(currentCollection.updatedAt, {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <Badge variant="secondary" className="flex-shrink-0">
                {t('common.cardsCount', {
                  count: currentCollection.cards.length,
                })}
              </Badge>
              {currentCollection.cards.some((card) => card.isGenerated) && (
                <Badge
                  variant="outline"
                  className="flex-shrink-0 border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {t('common.aiGenerated')}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* AI Question Generator */}
        <div className="mb-8">
          <AIQuestionGenerator
            collectionTitle={currentCollection.title}
            onQuestionsGenerated={handleGeneratedQuestions}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md w-full lg:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('cards.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button
            onClick={() => setIsFormOpen(true)}
            size="lg"
            className="w-full lg:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t('cards.addManually')}
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
                {searchTerm ? t('cards.noResults') : t('cards.empty')}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {searchTerm
                  ? t('cards.noResultsDescription')
                  : t('cards.emptyDescription')}
              </p>
              {!searchTerm && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    size="lg"
                    variant="outline"
                    className="px-8"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    {t('cards.addManually')}
                  </Button>
                  <Button
                    size="lg"
                    className="px-8"
                    style={{
                      backgroundColor: currentCollection.color,
                      color: practiceButtonTextColor,
                    }}
                    onClick={() => {
                      const generator = document.querySelector(
                        '[data-ai-generator]'
                      );
                      generator?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t('cards.generateWithAI')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">
                      {t('cards.question')}
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      {t('cards.answer')}
                    </TableHead>
                    <TableHead className="w-32 text-center">
                      {t('cards.successRate')}
                    </TableHead>
                    <TableHead className="w-32 text-center">
                      {t('cards.attempts')}
                    </TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCards.map((card) => {
                    const successRate = getSuccessRate(card);
                    const totalAttempts =
                      card.correctCount + card.incorrectCount;

                    return (
                      <TableRow
                        key={card.id}
                        className={
                          card.isGenerated
                            ? 'bg-purple-50/30 dark:bg-purple-950/10 border-l-4 border-l-purple-400 dark:border-l-purple-600'
                            : ''
                        }
                      >
                        <TableCell className="max-w-xs">
                          <div className="flex items-center space-x-2">
                            {card.isGenerated && (
                              <Sparkles className="h-4 w-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                            )}
                            <div className="truncate" title={card.question}>
                              {card.question}
                            </div>
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
                              <span className="font-medium">
                                {successRate}%
                              </span>
                              {successRate >= 70 ? (
                                <TrendingUp className="h-4 w-4 text-emerald-600" />
                              ) : successRate >= 40 ? (
                                <div className="animate-ping h-2 w-2 bg-yellow-500 rounded-full" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              {t('common.new')}
                            </span>
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
                              <DropdownMenuItem
                                onClick={() => handleEditCard(card)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                {t('common.edit')}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteCard(card.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {t('common.delete')}
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
