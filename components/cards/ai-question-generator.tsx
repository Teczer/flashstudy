'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Loader2, AlertCircle, Info } from 'lucide-react';
import { generateQuestions, validateApiKey } from '@/lib/openai';
import { GeneratedQuestion } from '@/types';
import { toast } from 'sonner';

interface AIQuestionGeneratorProps {
  collectionTitle?: string;
  onQuestionsGenerated: (questions: GeneratedQuestion[]) => void;
}

export function AIQuestionGenerator({
  collectionTitle,
  onQuestionsGenerated,
}: AIQuestionGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(validateApiKey());

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Veuillez entrer un sujet', {
        description: 'Décrivez le type de questions que vous souhaitez générer.',
      });
      return;
    }

    if (!hasApiKey) {
      toast.error('Clé API OpenAI requise', {
        description: 'Veuillez configurer votre clé API OpenAI pour utiliser cette fonctionnalité.',
      });
      return;
    }

    setIsGenerating(true);

    try {
      const questions = await generateQuestions(
        prompt.trim(),
        parseInt(questionCount),
        collectionTitle
      );

      onQuestionsGenerated(questions);
      
      toast.success('Questions générées avec succès!', {
        description: `${questions.length} questions générées avec l'IA.`,
      });

      // Clear the form
      setPrompt('');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Échec de la génération des questions', {
        description: error instanceof Error ? error.message : 'Veuillez réessayer.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card 
      className="p-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200/50 dark:border-purple-800/50"
      data-ai-generator
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Générateur de Questions IA
            </h3>
            <p className="text-sm text-muted-foreground">
              Générez des cartes mémoire automatiquement avec ChatGPT
            </p>
          </div>
        </div>

        <Separator className="bg-purple-200/50 dark:bg-purple-800/50" />

        {/* API Key Status */}
        {!hasApiKey && (
          <div className="flex items-start space-x-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Clé API OpenAI Requise
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Pour utiliser la génération de questions IA, veuillez ajouter votre clé API OpenAI dans la variable d'environnement{' '}
                <code className="px-1 py-0.5 bg-amber-100 dark:bg-amber-900/50 rounded text-xs">
                  NEXT_PUBLIC_OPENAI_API_KEY
                </code>
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="prompt" className="text-sm font-medium">
                Sujet/Prompt de Question *
              </Label>
              <Textarea
                id="prompt"
                placeholder="ex: Équations d'algèbre de base, Vocabulaire français pour débutants, Événements clés de la Seconde Guerre mondiale, Fondamentaux JavaScript..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="resize-none"
                disabled={isGenerating || !hasApiKey}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="count" className="text-sm font-medium">
                Nombre de Questions
              </Label>
              <Select
                value={questionCount}
                onValueChange={setQuestionCount}
                disabled={isGenerating || !hasApiKey}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} question{num !== 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 rounded-lg">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">Conseils pour de meilleurs résultats :</p>
              <ul className="space-y-1 text-xs">
                <li>• Soyez spécifique sur le sujet et le niveau de difficulté</li>
                <li>• Incluez le contexte comme "pour débutants" ou "niveau avancé"</li>
                <li>• Mentionnez le format préféré (choix multiples, réponse courte, etc.)</li>
              </ul>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim() || !hasApiKey}
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération de {questionCount} questions...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Générer avec ChatGPT
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}