'use client';

import { useState } from 'react';
import { Folder, FOLDER_COLORS } from '@/types';
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
import { Label } from '@/components/ui/label';

interface FolderFormProps {
  folder?: Folder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string, color: string) => void;
}

export function FolderForm({
  folder,
  open,
  onOpenChange,
  onSave,
}: FolderFormProps) {
  const [name, setName] = useState(folder?.name || '');
  const [selectedColor, setSelectedColor] = useState(
    folder?.color || FOLDER_COLORS[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim(), selectedColor);
      if (!folder) {
        setName('');
        setSelectedColor(FOLDER_COLORS[0]);
      }
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {folder ? 'Edit Folder' : 'Create New Folder'}
          </DialogTitle>
          <DialogDescription>
            {folder
              ? 'Update your folder details.'
              : 'Create a new folder to organize your flashcard collections.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Folder Name</Label>
            <Input
              id="name"
              placeholder="e.g., Languages, Science, History"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label>Color Theme</Label>
            <div className="grid grid-cols-8 gap-2">
              {FOLDER_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 ${
                    selectedColor === color
                      ? 'ring-2 ring-offset-2 ring-offset-background scale-110'
                      : ''
                  }`}
                  style={{ 
                    backgroundColor: color,
                    '--tw-ring-color': color 
                  } as React.CSSProperties}
                  title={`Select ${color}`}
                />
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {folder ? 'Update' : 'Create'} Folder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}