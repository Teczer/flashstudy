'use client';

import { useState, useEffect } from 'react';
import { Collection, Card, GeneratedQuestion } from '@/types';
import { storage } from '@/lib/storage';
import { calculateCardWeight } from '@/lib/card-ranking';

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedCollections = storage.getCollections();
    setCollections(loadedCollections);
    setLoading(false);
  }, []);

  const saveCollections = (newCollections: Collection[]) => {
    setCollections(newCollections);
    storage.saveCollections(newCollections);
  };

  const createCollection = (
    title: string,
    description: string,
    color: string
  ): Collection => {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [],
      color,
    };

    const newCollections = [...collections, newCollection];
    saveCollections(newCollections);
    return newCollection;
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    const newCollections = collections.map((collection) =>
      collection.id === id
        ? { ...collection, ...updates, updatedAt: new Date() }
        : collection
    );
    saveCollections(newCollections);
  };

  const deleteCollection = (id: string) => {
    const newCollections = collections.filter(
      (collection) => collection.id !== id
    );
    saveCollections(newCollections);
  };

  const addCard = (
    collectionId: string,
    question: string,
    answer: string,
    isGenerated: boolean = false
  ): Card => {
    const newCard: Card = {
      id: crypto.randomUUID(),
      question,
      answer,
      createdAt: new Date(),
      updatedAt: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      weight: 1,
      isGenerated,
    };

    const newCollections = collections.map((collection) =>
      collection.id === collectionId
        ? {
            ...collection,
            cards: [...collection.cards, newCard],
            updatedAt: new Date(),
          }
        : collection
    );

    saveCollections(newCollections);
    return newCard;
  };

  const addGeneratedCards = (
    collectionId: string,
    questions: GeneratedQuestion[]
  ): Card[] => {
    const newCards: Card[] = questions.map((q) => ({
      id: crypto.randomUUID(),
      question: q.question,
      answer: q.answer,
      createdAt: new Date(),
      updatedAt: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      weight: 1,
      isGenerated: true,
    }));

    const newCollections = collections.map((collection) =>
      collection.id === collectionId
        ? {
            ...collection,
            cards: [...collection.cards, ...newCards],
            updatedAt: new Date(),
          }
        : collection
    );

    saveCollections(newCollections);
    return newCards;
  };

  const updateCard = (
    collectionId: string,
    cardId: string,
    updates: Partial<Card>
  ) => {
    const newCollections = collections.map((collection) =>
      collection.id === collectionId
        ? {
            ...collection,
            cards: collection.cards.map((card) =>
              card.id === cardId
                ? {
                    ...card,
                    ...updates,
                    updatedAt: new Date(),
                    weight: calculateCardWeight({ ...card, ...updates }),
                  }
                : card
            ),
            updatedAt: new Date(),
          }
        : collection
    );
    saveCollections(newCollections);
  };

  const deleteCard = (collectionId: string, cardId: string) => {
    const newCollections = collections.map((collection) =>
      collection.id === collectionId
        ? {
            ...collection,
            cards: collection.cards.filter((card) => card.id !== cardId),
            updatedAt: new Date(),
          }
        : collection
    );
    saveCollections(newCollections);
  };

  return {
    collections,
    loading,
    createCollection,
    updateCollection,
    deleteCollection,
    addCard,
    addGeneratedCards,
    updateCard,
    deleteCard,
  };
}