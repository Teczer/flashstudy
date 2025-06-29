'use client';

import { useState } from 'react';
import { Folder, Collection } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  FolderPlus, 
  MoreVertical, 
  Edit, 
  Trash2,
  Menu,
  Layers3,
  GripVertical,
  Search,
  X
} from 'lucide-react';
import { FolderForm } from './folder-form';
import { useFolders } from '@/hooks/use-folders';
import { cn } from '@/lib/utils';
import {
  useSortable,
} from '@dnd-kit/sortable';
import {
  useDroppable,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface FoldersSidebarProps {
  collections: Collection[];
  selectedFolderId: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onCollectionDrop: (collectionId: string, folderId?: string) => void;
}

interface SortableFolderItemProps {
  folder: Folder;
  isSelected: boolean;
  collectionCount: number;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function SortableFolderItem({
  folder,
  isSelected,
  collectionCount,
  onSelect,
  onEdit,
  onDelete,
}: SortableFolderItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setSortableNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: folder.id,
    data: {
      type: 'folder',
      folder,
    },
  });

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: folder.id,
    data: {
      type: 'folder',
      folder,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Combiner les refs
  const setNodeRef = (node: HTMLElement | null) => {
    setSortableNodeRef(node);
    setDroppableNodeRef(node);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 group relative",
        isSelected 
          ? "bg-primary/10 text-primary border border-primary/20" 
          : "hover:bg-accent",
        isDragging && "opacity-50 shadow-lg z-50",
        isOver && "ring-2 ring-primary/50 bg-primary/5"
      )}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 -m-2 rounded hover:bg-accent/50 transition-colors opacity-0 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </div>
        
        <div 
          className="w-4 h-4 rounded flex-shrink-0 shadow-sm"
          style={{ backgroundColor: folder.color }}
        />
        <span className="font-medium truncate">{folder.name}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="flex-shrink-0 text-xs">
          {collectionCount}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function FoldersSidebar({ 
  collections, 
  selectedFolderId, 
  onFolderSelect,
  onCollectionDrop 
}: FoldersSidebarProps) {
  const { folders, createFolder, updateFolder, deleteFolder } = useFolders();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | undefined>();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter folders based on search term
  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (name: string, color: string) => {
    if (editingFolder) {
      updateFolder(editingFolder.id, { name, color });
      setEditingFolder(undefined);
    } else {
      createFolder(name, color);
    }
  };

  const handleEdit = (folder: Folder) => {
    setEditingFolder(folder);
    setIsFormOpen(true);
  };

  const handleDelete = (folderId: string) => {
    if (confirm('Are you sure you want to delete this folder? Collections will remain in other folders they belong to.')) {
      deleteFolder(folderId);
      if (selectedFolderId === folderId) {
        onFolderSelect(null);
      }
    }
  };

  const getCollectionCount = (folderId?: string) => {
    if (folderId === undefined) {
      return collections.length;
    }
    return collections.filter(c => c.folderIds.includes(folderId)).length;
  };

  const allCount = getCollectionCount();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Folders</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsFormOpen(true)}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <FolderPlus className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search folders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-8 h-9"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm('')}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-accent"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-2">
          {/* All Collections - Always at the top, not draggable */}
          <div
            className={cn(
              "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 group relative",
              selectedFolderId === null 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "hover:bg-accent"
            )}
            onClick={() => onFolderSelect(null)}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="p-1.5 rounded-md bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex-shrink-0">
                  <Layers3 className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                </div>
              </div>
              <span className="font-medium truncate">All</span>
            </div>
            <Badge variant="secondary" className="ml-2 flex-shrink-0 text-xs">
              {allCount}
            </Badge>
          </div>

          {/* User Folders - Draggable */}
          {filteredFolders.length === 0 && searchTerm ? (
            <div className="text-center py-8 px-4">
              <div className="text-muted-foreground text-sm">
                No folders found matching "{searchTerm}"
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFolders.map((folder) => {
                const collectionCount = getCollectionCount(folder.id);
                return (
                  <SortableFolderItem
                    key={folder.id}
                    folder={folder}
                    isSelected={selectedFolderId === folder.id}
                    collectionCount={collectionCount}
                    onSelect={() => onFolderSelect(folder.id)}
                    onEdit={() => handleEdit(folder)}
                    onDelete={() => handleDelete(folder.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      <FolderForm
        folder={editingFolder}
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingFolder(undefined);
        }}
        onSave={handleSave}
      />
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Dialog open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <Button 
          variant="outline" 
          size="sm" 
          className="lg:hidden"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className="h-4 w-4 mr-2" />
          Folders
        </Button>
        <DialogContent className="w-80 h-[80vh] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Folders</DialogTitle>
          </DialogHeader>
          <SidebarContent />
        </DialogContent>
      </Dialog>
    </>
  );
}