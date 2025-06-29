import { Collection, Card, PracticeSession } from '@/types';

const COLLECTIONS_KEY = 'flashstudy_collections';
const SESSIONS_KEY = 'flashstudy_sessions';

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
