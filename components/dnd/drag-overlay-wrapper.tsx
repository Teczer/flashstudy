'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Active,
  defaultDropAnimation,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  Over,
  useDndMonitor,
  DragOverEvent,
} from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import { Collection, Folder } from '@/types';
import { useCollections } from '@/hooks/use-collections';
import { useFolders } from '@/hooks/use-folders';
import { toast } from 'sonner';
import { BookOpen, FolderIcon, GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DragOverlayWrapper() {
  const { collections, addCollectionToFolder } = useCollections();
  const { folders, updateFolder } = useFolders();
  
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const [overItem, setOverItem] = useState<Over | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setDraggedItem(event.active);
  }

  function handleDragOver(event: DragOverEvent) {
    setOverItem(event.over);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      setDraggedItem(null);
      setOverItem(null);
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    // Collection vers Folder
    if (activeData?.type === 'collection' && overData?.type === 'folder') {
      const collection = collections.find(c => c.id === active.id);
      const folder = folders.find(f => f.id === over.id);
      
      if (collection && folder) {
        // Vérifier si la collection est déjà dans ce dossier
        if (collection.folderIds.includes(folder.id)) {
          toast.info('Already in folder', {
            description: `"${collection.title}" is already in "${folder.name}".`,
          });
        } else {
          addCollectionToFolder(collection.id, folder.id);
          toast.success('Added to folder!', {
            description: `"${collection.title}" added to "${folder.name}" ✅`,
          });
        }
      }
    }

    // Réordonnancement des dossiers
    if (activeData?.type === 'folder' && overData?.type === 'folder') {
      const draggedFolder = folders.find(f => f.id === active.id);
      const targetFolder = folders.find(f => f.id === over.id);
      
      if (draggedFolder && targetFolder && draggedFolder.id !== targetFolder.id) {
        // Créer un nouvel array avec l'ordre mis à jour
        const allFolders = [...folders];
        const draggedIndex = allFolders.findIndex(f => f.id === draggedFolder.id);
        const targetIndex = allFolders.findIndex(f => f.id === targetFolder.id);
        
        // Retirer le dossier déplacé de sa position actuelle
        const [movedFolder] = allFolders.splice(draggedIndex, 1);
        
        // Insérer le dossier à sa nouvelle position
        allFolders.splice(targetIndex, 0, movedFolder);
        
        // Mettre à jour l'ordre de tous les dossiers
        allFolders.forEach((folder, index) => {
          updateFolder(folder.id, { order: index + 1 });
        });
        
        toast.success('Folder reordered!', {
          description: `"${draggedFolder.name}" has been moved to its new position.`,
          duration: 2000,
        });
      }
    }

    setDraggedItem(null);
    setOverItem(null);
  }

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDragCancel: () => {
      setDraggedItem(null);
      setOverItem(null);
    },
  });

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  if (!draggedItem) return null;

  const activeData = draggedItem.data.current;
  
  // Rendu pour une collection
  if (activeData?.type === 'collection') {
    const collection = activeData.collection as Collection;
    
    return createPortal(
      <DragOverlay
        dropAnimation={dropAnimation}
        modifiers={[snapCenterToCursor]}
      >
        <div className="flex items-center gap-3 text-sm rounded-lg ring-2 ring-primary bg-card/90 backdrop-blur-sm border shadow-2xl p-4 w-max cursor-grabbing transform rotate-2 scale-105">
          <div 
            className="p-2 rounded-lg flex-shrink-0"
            style={{ backgroundColor: collection.color + '20' }}
          >
            <BookOpen 
              className="h-5 w-5" 
              style={{ color: collection.color }}
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold truncate max-w-[200px]">
              {collection.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {collection.cards.length} cards
            </p>
          </div>
        </div>
      </DragOverlay>,
      document.body
    );
  }

  // Rendu pour un dossier
  if (activeData?.type === 'folder') {
    const folder = activeData.folder as Folder;
    const collectionCount = collections.filter(c => c.folderIds.includes(folder.id)).length;
    
    return createPortal(
      <DragOverlay
        dropAnimation={dropAnimation}
        modifiers={[snapCenterToCursor]}
      >
        <div className="flex items-center space-x-3 p-3 bg-card/90 backdrop-blur-sm border rounded-lg shadow-2xl opacity-95 transform rotate-2 scale-105 cursor-grabbing">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
          <div 
            className="w-4 h-4 rounded flex-shrink-0 shadow-sm"
            style={{ backgroundColor: folder.color }}
          />
          <span className="font-medium">{folder.name}</span>
          <Badge variant="secondary" className="text-xs">
            {collectionCount}
          </Badge>
        </div>
      </DragOverlay>,
      document.body
    );
  }

  return null;
}