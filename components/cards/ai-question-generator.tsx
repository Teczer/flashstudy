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
import { useTranslation } from '@/lib/language-context';

interface AIQuestionGeneratorProps {
  collectionTitle?: string;
  onQuestionsGenerated: (questions: GeneratedQuestion[]) => void;
}

export function AIQuestionGenerator({
  collectionTitle,
  onQuestionsGenerated,
}: AIQuestionGeneratorProps) {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(validateApiKey());

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error(t('ai.errors.noPrompt'), {
        description: t('ai.errors.noPromptDescription'),
      });
      return;
    }

    if (!hasApiKey) {
      toast.error(t('ai.errors.noApiKey'), {
        description: t('ai.errors.noApiKeyDescription'),
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
      
      toast.success(t('ai.success.generated'), {
        description: t('ai.success.generatedDescription', { count: questions.length }),
      });

      // Clear the form
      setPrompt('');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(t('ai.errors.failed'), {
        description: error instanceof Error ? error.message : t('ai.errors.tryAgain'),
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200/50 dark:border-purple-800/50" data-ai-generator>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t('ai.title')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('ai.description')}
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
                {t('ai.apiKey.required')}
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {t('ai.apiKey.description')}{' '}
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
                {t('ai.form.prompt')} *
              </Label>
              <Textarea
                id="prompt"
                placeholder={t('ai.form.promptPlaceholder')}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="resize-none"
                disabled={isGenerating || !hasApiKey}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="count" className="text-sm font-medium">
                {t('ai.form.count')}
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
                      {t('ai.form.questionCount', { count: num })}
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
              <p className="font-medium mb-1">{t('ai.tips.title')}</p>
              <ul className="space-y-1 text-xs">
                <li>• {t('ai.tips.specific')}</li>
                <li>• {t('ai.tips.context')}</li>
                <li>• {t('ai.tips.format')}</li>
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
                {t('ai.generating', { count: questionCount })}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {t('ai.generate')}
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}