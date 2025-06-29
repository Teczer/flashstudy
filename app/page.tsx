'use client';

import { useState, useCallback, useMemo } from 'react';
import { Collection } from '@/types';
import { Header } from '@/components/layout/header';
import { CollectionsGrid } from '@/components/collections/collections-grid';
import { CollectionDetail } from '@/components/collection-detail/collection-detail';
import { PracticeSession } from '@/components/practice/practice-session';
import { useCollections } from '@/hooks/use-collections';
import { toast } from 'sonner';

type View = 'collections' | 'collection-detail' | 'practice';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('collections');
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  const {
    collections,
    loading: collectionsLoading,
  } = useCollections();

  // Memoize handlers to prevent recreation
  const handleViewCollection = useCallback((collection: Collection) => {
    setSelectedCollection(collection);
    setCurrentView('collection-detail');
  }, []);

  const handlePractice = useCallback((collection: Collection) => {
    if (collection.cards.length === 0) {
      toast.error('No cards available', {
        description: 'Add some cards to this collection before practicing.',
      });
      return;
    }

    setSelectedCollection(collection);
    setCurrentView('practice');
  }, []);

  const handlePracticeComplete = useCallback(
    (score: { correct: number; total: number }) => {
      toast.success('Practice session completed!', {
        description: `You got ${score.correct} out of ${score.total} cards correct.`,
      });
    },
    []
  );

  const handleBackToCollections = useCallback(() => {
    setCurrentView('collections');
    setSelectedCollection(null);
  }, []);

  const handleBackToDetail = useCallback(() => {
    setCurrentView('collection-detail');
  }, []);

  // Show loading state while data is being fetched to prevent hydration mismatch
  // IMPORTANT: This must come AFTER all hooks to maintain hook order consistency
  if (collectionsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your flashcards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'collections' && (
        <>
          <Header />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                All Collections
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto sm:mx-0">
                All your flashcard collections in one place
              </p>
            </div>
            <div className="w-full">
              <CollectionsGrid
                onPractice={handlePractice}
                onViewCollection={handleViewCollection}
              />
            </div>
          </main>
        </>
      )}

      {currentView === 'collection-detail' && selectedCollection && (
        <CollectionDetail
          collection={selectedCollection}
          onBack={handleBackToCollections}
          onPractice={handlePractice}
        />
      )}

      {currentView === 'practice' && selectedCollection && (
        <PracticeSession
          collection={selectedCollection}
          onComplete={handlePracticeComplete}
          onExit={handleBackToDetail}
        />
      )}
    </div>
  );
}