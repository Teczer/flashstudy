'use client';

import { useState } from 'react';
import { Card } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CardFormProps {
  card?: Card;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (question: string, answer: string) => void;
}

export function CardForm({ card, open, onOpenChange, onSave }: CardFormProps) {
  const [question, setQuestion] = useState(card?.question || '');
  const [answer, setAnswer] = useState(card?.answer || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      onSave(question.trim(), answer.trim());
      if (!card) {
        setQuestion('');
        setAnswer('');
      }
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{card ? 'Edit Card' : 'Add New Card'}</DialogTitle>
          <DialogDescription>
            {card 
              ? 'Update the question and answer for this flashcard.'
              : 'Create a new flashcard by adding a question and its answer.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              placeholder="Enter the correct answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!question.trim() || !answer.trim()}>
              {card ? 'Update' : 'Add'} Card
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}