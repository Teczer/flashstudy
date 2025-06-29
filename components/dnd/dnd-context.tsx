'use client';

import React from 'react';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { DragOverlayWrapper } from './drag-overlay-wrapper';

interface CustomDndContextProps {
  children: React.ReactNode;
}

export function CustomDndContext({ children }: CustomDndContextProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter}
    >
      {children}
      <DragOverlayWrapper />
    </DndContext>
  );
}