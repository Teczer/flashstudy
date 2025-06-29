'use client';

import { useState, useEffect } from 'react';
import { Folder } from '@/types';
import { storage } from '@/lib/storage';

export function useFolders() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedFolders = storage.getFolders();
    setFolders(loadedFolders);
    setLoading(false);
  }, []);

  const saveFolders = (newFolders: Folder[]) => {
    setFolders(newFolders);
    storage.saveFolders(newFolders);
  };

  const createFolder = (name: string, color: string): Folder => {
    const maxOrder = Math.max(...folders.map(f => f.order), 0);
    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name,
      color,
      createdAt: new Date(),
      updatedAt: new Date(),
      order: maxOrder + 1,
    };

    const newFolders = [...folders, newFolder];
    saveFolders(newFolders);
    return newFolder;
  };

  const updateFolder = (id: string, updates: Partial<Folder>) => {
    const newFolders = folders.map(folder =>
      folder.id === id
        ? { ...folder, ...updates, updatedAt: new Date() }
        : folder
    );
    saveFolders(newFolders);
  };

  const deleteFolder = (id: string) => {
    const newFolders = folders.filter(folder => folder.id !== id);
    saveFolders(newFolders);
  };

  const reorderFolders = (folderId: string, newOrder: number) => {
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return;

    const otherFolders = folders.filter(f => f.id !== folderId);
    const reorderedFolders = otherFolders.map(f => {
      if (f.order >= newOrder) {
        return { ...f, order: f.order + 1 };
      }
      return f;
    });

    const updatedFolder = { ...folder, order: newOrder };
    const newFolders = [...reorderedFolders, updatedFolder].sort((a, b) => a.order - b.order);
    console.log("newFolders",)
    saveFolders(newFolders);
  };

  return {
    folders: folders.sort((a, b) => a.order - b.order),
    loading,
    createFolder,
    updateFolder,
    deleteFolder,
    reorderFolders,
  };
}