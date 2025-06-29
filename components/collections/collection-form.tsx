'use client';

import { useState, useEffect } from 'react';
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
import { Check } from 'lucide-react';

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLLECTION_COLORS[0]);

  // Reset form when collection changes or dialog opens
  useEffect(() => {
    if (open) {
      setTitle(collection?.title || '');
      setDescription(collection?.description || '');
      setSelectedColor(collection?.color || COLLECTION_COLORS[0]);
    }
  }, [collection, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim(), description.trim(), selectedColor);
      if (!collection) {
        // Only reset for new collections
        setTitle('');
        setDescription('');
        setSelectedColor(COLLECTION_COLORS[0]);
      }
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form to original values
    if (collection) {
      setTitle(collection.title);
      setDescription(collection.description || '');
      setSelectedColor(collection.color);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {collection ? 'Edit Collection' : 'Create New Collection'}
          </DialogTitle>
          <DialogDescription>
            {collection
              ? 'Update your flashcard collection details.'
              : 'Create a new flashcard collection to organize your study materials.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Collection Title *
            </Label>
            <Input
              id="title"
              placeholder="e.g., Mathematics, Spanish Vocabulary, History Facts"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description{' '}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of this collection..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="text-base resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Color Theme</Label>
            <div className="grid grid-cols-8 gap-3">
              {COLLECTION_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ${
                    selectedColor === color
                      ? 'ring-2 ring-offset-2 ring-offset-background scale-110'
                      : ''
                  }`}
                  style={
                    {
                      backgroundColor: color,
                      '--tw-ring-color': color,
                    } as React.CSSProperties
                  }
                  title={`Select ${color}`}
                >
                  {selectedColor === color && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-5 w-5 text-white drop-shadow-sm" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Choose a color theme for your collection
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim()}
              className="min-w-[100px]"
            >
              {collection ? 'Update' : 'Create'} Collection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
