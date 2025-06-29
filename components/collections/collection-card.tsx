'use client';

import { useState, useCallback } from 'react';
import { Collection } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BookOpen,
  MoreVertical,
  Edit,
  Trash2,
  Play,
  Calendar,
  Hash,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CollectionCardProps {
  collection: Collection;
  onEdit: (collection: Collection) => void;
  onDelete: (id: string) => void;
  onPractice: (collection: Collection) => void;
  onView: (collection: Collection) => void;
}

// Helper function to determine if a color is light or dark for better contrast
function isLightColor(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance using the relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

export function CollectionCard({
  collection,
  onEdit,
  onDelete,
  onPractice,
  onView,
}: CollectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Optimized event handlers with useCallback
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleCardClick = useCallback(
    () => onView(collection),
    [onView, collection]
  );

  // Fixed event handlers with proper stopPropagation
  const handleEditClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit(collection);
    },
    [onEdit, collection]
  );

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(collection.id);
    },
    [onDelete, collection.id]
  );

  const handlePracticeClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onPractice(collection);
    },
    [onPractice, collection]
  );

  // Determine text color for practice button based on background color
  const practiceButtonTextColor = isLightColor(collection.color)
    ? '#000000'
    : '#ffffff';

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-0 shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div
        className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
        style={{ backgroundColor: collection.color }}
      />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div
              className="p-2 rounded-lg flex-shrink-0"
              style={{ backgroundColor: collection.color + '20' }}
            >
              <BookOpen
                className="h-5 w-5"
                style={{ color: collection.color }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                {collection.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Hash className="h-3 w-3 flex-shrink-0" />
                <span>{collection.cards.length} cards</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-opacity duration-200 flex-shrink-0 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuItem onClick={handleEditClick}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {collection.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {collection.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground min-w-0 flex-1">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">
              Updated{' '}
              {formatDistanceToNow(collection.updatedAt, { addSuffix: true })}
            </span>
          </div>

          {/* Enhanced Practice Button with better accessibility */}
          <Button
            size="sm"
            onClick={handlePracticeClick}
            disabled={collection.cards.length === 0}
            className="transition-all duration-200 px-4 py-2 min-w-[90px] font-medium flex-shrink-0"
            style={{
              backgroundColor: collection.color,
              color: practiceButtonTextColor,
              borderColor: collection.color,
            }}
          >
            <Play className="mr-2 h-3 w-3" />
            Practice
          </Button>
        </div>
      </div>
    </Card>
  );
}
