'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { useTranslation } from '@/lib/i18n';
import { toast } from 'sonner';

interface AIQuestionGeneratorProps {
  collectionTitle?: string;
  onQuestionsGenerated: (questions: GeneratedQuestion[]) => void;
}

export function AIQuestionGenerator({
  collectionTitle,
  onQuestionsGenerated,
}: AIQuestionGeneratorProps) {
  const { t, language } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [difficulty, setDifficulty] = useState<'easy' | 'intermediate' | 'hard'>('intermediate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(validateApiKey());

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error(t.pleaseEnterPrompt, {
        description: t.pleaseEnterPromptDescription,
      });
      return;
    }

    if (!hasApiKey) {
      toast.error(t.openaiKeyRequiredError, {
        description: t.openaiKeyRequiredErrorDescription,
      });
      return;
    }

    setIsGenerating(true);

    try {
      const questions = await generateQuestions(
        prompt.trim(),
        parseInt(questionCount),
        difficulty,
        language,
        collectionTitle
      );

      onQuestionsGenerated(questions);
      
      toast.success(t.questionsGenerated, {
        description: `${questions.length} ${t.questionsGeneratedDescription}`,
      });

      // Clear the form
      setPrompt('');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(t.generationFailed, {
        description: error instanceof Error ? error.message : t.generationFailedDescription,
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
              {t.aiQuestionGenerator}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.aiQuestionGeneratorDescription}
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
                {t.openaiKeyRequired}
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {t.openaiKeyRequiredDescription}{' '}
                <code className="px-1 py-0.5 bg-amber-100 dark:bg-amber-900/50 rounded text-xs">
                  NEXT_PUBLIC_OPENAI_API_KEY
                </code>
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-sm font-medium">
                {t.questionTopic} *
              </Label>
              <Textarea
                id="prompt"
                placeholder={t.questionTopicPlaceholder}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="resize-none"
                disabled={isGenerating || !hasApiKey}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="count" className="text-sm font-medium">
                  {t.numberOfQuestions}
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

              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-sm font-medium">
                  {t.difficulty}
                </Label>
                <Select
                  value={difficulty}
                  onValueChange={(value: 'easy' | 'intermediate' | 'hard') => setDifficulty(value)}
                  disabled={isGenerating || !hasApiKey}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{t.easy}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="intermediate">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>{t.intermediate}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="hard">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>{t.hard}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 rounded-lg">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">{t.tipsTitle}</p>
              <ul className="space-y-1 text-xs">
                <li>{t.tip1}</li>
                <li>{t.tip2}</li>
                <li>{t.tip3}</li>
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
                {t.generating} {questionCount} questions...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {t.generateWithChatGPT}
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}