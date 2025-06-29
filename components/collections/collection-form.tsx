'use client';

import { useState } from 'react';
import { Collection, COLLECTION_COLORS } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CollectionFormProps {
  collection?: Collection;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (title: string, description: string, color: string) => void;
}

export function CollectionForm({
  collection,
  open,
  onOpenChange,
  onSave,
}: CollectionFormProps) {
  const [title, setTitle] = useState(collection?.title || '');
  const [description, setDescription] = useState(collection?.description || '');
  const [selectedColor, setSelectedColor] = useState(
    collection?.color || COLLECTION_COLORS[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim(), description.trim(), selectedColor);
      if (!collection) {
        setTitle('');
        setDescription('');
        setSelectedColor(COLLECTION_COLORS[0]);
      }
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {collection ? 'Edit Collection' : 'Create New Collection'}
          </DialogTitle>
          <DialogDescription>
            {collection
              ? 'Update your flashcard collection details.'
              : 'Create a new flashcard collection to organize your study materials.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Mathematics, Spanish Vocabulary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this collection..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Color Theme</Label>
            <div className="flex flex-wrap gap-2">
              {COLLECTION_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-all duration-200 ${
                    selectedColor === color
                      ? 'ring-2 ring-offset-2 ring-offset-background scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ 
                    backgroundColor: color,
                    '--tw-ring-color': color 
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {collection ? 'Update' : 'Create'} Collection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}