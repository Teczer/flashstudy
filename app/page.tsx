'use client';

import { useState, useCallback, useMemo } from 'react';
import { Collection } from '@/types';
import { Header } from '@/components/layout/header';
import { FoldersSidebar } from '@/components/folders/folders-sidebar';
import { CollectionsGrid } from '@/components/collections/collections-grid';
import { CollectionDetail } from '@/components/collection-detail/collection-detail';
import { PracticeSession } from '@/components/practice/practice-session';
import { CustomDndContext } from '@/components/dnd/dnd-context';
import { useCollections } from '@/hooks/use-collections';
import { useFolders } from '@/hooks/use-folders';
import { toast } from 'sonner';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type View = 'collections' | 'collection-detail' | 'practice';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('collections');
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const {
    collections,
    loading: collectionsLoading,
    addCollectionToFolder,
  } = useCollections();
  const { folders, loading: foldersLoading } = useFolders();

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

  const handleFolderSelect = useCallback((folderId: string | null) => {
    setSelectedFolderId(folderId);
  }, []);

  const handleCollectionDrop = useCallback(
    (collectionId: string, folderId?: string) => {
      const collection = collections.find((c) => c.id === collectionId);

      if (!collection || !folderId) return;

      // Check if collection is already in this folder
      if (collection.folderIds.includes(folderId)) {
        toast.info('Already in folder', {
          description: `"${collection.title}" is already in this folder.`,
        });
        return;
      }

      // Add collection to folder
      addCollectionToFolder(collectionId, folderId);
      const folder = folders.find((f) => f.id === folderId);

      toast.success('Added to folder!', {
        description: `"${collection.title}" added to ${folder?.name || 'folder'} ✅`,
      });
    },
    [collections, folders, addCollectionToFolder]
  );

  // Memoize folder name and description to prevent recalculation
  const selectedFolderInfo = useMemo(() => {
    if (selectedFolderId === null) {
      return {
        name: 'All',
        description: 'All your flashcard collections in one place',
      };
    }
    const folder = folders.find((f) => f.id === selectedFolderId);
    return {
      name: folder ? folder.name : 'Unknown Folder',
      description: folder
        ? `Collections organized in the ${folder.name} folder`
        : 'Unknown folder',
    };
  }, [selectedFolderId, folders]);

  // Show loading state while data is being fetched to prevent hydration mismatch
  // IMPORTANT: This must come AFTER all hooks to maintain hook order consistency
  if (collectionsLoading || foldersLoading) {
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
    <CustomDndContext>
      <div className="min-h-screen bg-background">
        {currentView === 'collections' && (
          <>
            <Header />
            <div className="flex">
              {/* <SortableContext
                items={folders.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <FoldersSidebar
                  collections={collections}
                  selectedFolderId={selectedFolderId}
                  onFolderSelect={handleFolderSelect}
                  onCollectionDrop={handleCollectionDrop}
                />
              </SortableContext> */}

              <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
                <div className="mb-8 text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {selectedFolderInfo.name}
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto sm:mx-0">
                    {selectedFolderInfo.description}
                  </p>
                </div>
                <div className="w-full">
                  <CollectionsGrid
                    onPractice={handlePractice}
                    onViewCollection={handleViewCollection}
                    selectedFolderId={selectedFolderId}
                  />
                </div>
              </main>
            </div>
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
    </CustomDndContext>
  );
}
