import { Collection, Card, PracticeSession, Folder } from '@/types';

const COLLECTIONS_KEY = 'flashstudy_collections';
const SESSIONS_KEY = 'flashstudy_sessions';
const FOLDERS_KEY = 'flashstudy_folders';

export const storage = {
  getCollections(): Collection[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(COLLECTIONS_KEY);
      if (!data) return [];
      const collections = JSON.parse(data);
      return collections.map((collection: any) => ({
        ...collection,
        createdAt: new Date(collection.createdAt),
        updatedAt: new Date(collection.updatedAt),
        // Handle migration from single folderId to folderIds array
        folderIds: collection.folderIds || (collection.folderId ? [collection.folderId] : []),
        cards: collection.cards.map((card: any) => ({
          ...card,
          createdAt: new Date(card.createdAt),
          updatedAt: new Date(card.updatedAt),
        })),
      }));
    } catch (error) {
      console.error('Error loading collections:', error);
      return [];
    }
  },

  saveCollections(collections: Collection[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    } catch (error) {
      console.error('Error saving collections:', error);
    }
  },

  getFolders(): Folder[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(FOLDERS_KEY);
      if (!data) return [];
      const folders = JSON.parse(data);
      return folders.map((folder: any) => ({
        ...folder,
        createdAt: new Date(folder.createdAt),
        updatedAt: new Date(folder.updatedAt),
        order: folder.order || 0, // Ensure order exists for legacy data
      }));
    } catch (error) {
      console.error('Error loading folders:', error);
      return [];
    }
  },

  saveFolders(folders: Folder[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
    } catch (error) {
      console.error('Error saving folders:', error);
    }
  },

  getSessions(): PracticeSession[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(SESSIONS_KEY);
      if (!data) return [];
      const sessions = JSON.parse(data);
      return sessions.map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
      }));
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  },

  saveSessions(sessions: PracticeSession[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  },
};