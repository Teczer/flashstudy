'use client';

import { useState } from 'react';
import { Collection } from '@/types';
import { CollectionCard } from './collection-card';
import { CollectionForm } from './collection-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { useCollections } from '@/hooks/use-collections';
import { useTranslation } from '@/lib/language-context';
import { toast } from 'sonner';

interface CollectionsGridProps {
  onPractice: (collection: Collection) => void;
  onViewCollection: (collection: Collection) => void;
}

export function CollectionsGrid({
  onPractice,
  onViewCollection,
}: CollectionsGridProps) {
  const { t } = useTranslation();
  const {
    collections,
    loading,
    createCollection,
    updateCollection,
    deleteCollection,
  } = useCollections();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<
    Collection | undefined
  >();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'created' | 'updated'>(
    'updated'
  );

  // Filter collections based on search
  const filteredCollections = collections.filter((collection) => {
    const matchesSearch =
      collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const sortedCollections = filteredCollections.sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'created':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'updated':
      default:
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    }
  });

  const handleSave = (title: string, description: string, color: string) => {
    if (editingCollection) {
      updateCollection(editingCollection.id, { title, description, color });
      setEditingCollection(undefined);
      toast.success(t('collections.updated'), {
        description: t('collections.updatedDescription', { title }),
      });
    } else {
      createCollection(title, description, color);
      toast.success(t('collections.created'), {
        description: t('collections.createdDescription', { title }),
      });
    }
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const collection = collections.find((c) => c.id === id);
    if (
      confirm(
        t('collections.deleteConfirm', {
          title: collection?.title,
          count: collection?.cards.length || 0,
        })
      )
    ) {
      deleteCollection(id);
      toast.success(t('collections.deleted'), {
        description: t('collections.deletedDescription', {
          title: collection?.title,
        }),
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-1 max-w-md items-center space-x-2 w-full lg:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('collections.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end">
          <Select
            value={sortBy}
            onValueChange={(value: any) => setSortBy(value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">{t('collections.sortUpdated')}</SelectItem>
              <SelectItem value="created">{t('collections.sortCreated')}</SelectItem>
              <SelectItem value="title">{t('collections.sortTitle')}</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{t('collections.newCollection')}</span>
          </Button>
        </div>
      </div>

      {/* Collections Grid */}
      {sortedCollections.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="mx-auto max-w-md">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-blue-600/10 flex items-center justify-center mb-6">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {searchTerm ? t('collections.noResults') : t('collections.empty')}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {searchTerm
                ? t('collections.noResultsDescription')
                : t('collections.emptyDescription')}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsFormOpen(true)}
                size="lg"
                className="px-8"
              >
                <Plus className="mr-2 h-5 w-5" />
                {t('collections.createCollection')}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPractice={onPractice}
              onView={onViewCollection}
            />
          ))}
        </div>
      )}

      {/* Collection Form */}
      <CollectionForm
        collection={editingCollection}
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingCollection(undefined);
        }}
        onSave={handleSave}
      />
    </div>
  );
}