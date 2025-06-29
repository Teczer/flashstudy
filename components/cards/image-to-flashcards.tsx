'use client';

import { useState, useRef, useCallback } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Info,
  Eye,
  Trash2,
  Edit,
  Check,
  X,
  Sparkles,
  FileText,
  Zap,
} from 'lucide-react';
import { extractTextFromImage, generateQuestionsFromText } from '@/lib/image-processing';
import { GeneratedQuestion } from '@/types';
import { toast } from 'sonner';

interface ImageToFlashcardsProps {
  collectionTitle?: string;
  onQuestionsGenerated: (questions: GeneratedQuestion[]) => void;
}

interface ProcessedImage {
  id: string;
  file: File;
  preview: string;
  extractedText: string;
  status: 'processing' | 'completed' | 'error';
}

interface GeneratedCard {
  id: string;
  question: string;
  answer: string;
  type: string;
  isEditing: boolean;
}

export function ImageToFlashcards({
  collectionTitle,
  onQuestionsGenerated,
}: ImageToFlashcardsProps) {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [generatedCards, setGeneratedCards] = useState<GeneratedCard[]>([]);
  const [questionCount, setQuestionCount] = useState('10');
  const [questionType, setQuestionType] = useState('mixed');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newImages: ProcessedImage[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      extractedText: '',
      status: 'processing' as const,
    }));

    setImages((prev) => [...prev, ...newImages]);
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      let allExtractedText = '';
      const totalImages = newImages.length;

      for (let i = 0; i < newImages.length; i++) {
        const image = newImages[i];
        setProcessingProgress(((i + 1) / totalImages) * 100);

        try {
          const text = await extractTextFromImage(image.file);
          
          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id
                ? { ...img, extractedText: text, status: 'completed' }
                : img
            )
          );

          allExtractedText += text + '\n\n';
        } catch (error) {
          console.error('Error processing image:', error);
          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id ? { ...img, status: 'error' } : img
            )
          );
        }
      }

      setExtractedText(allExtractedText.trim());
      
      if (allExtractedText.trim()) {
        toast.success('Images traitées avec succès!', {
          description: `Texte extrait de ${totalImages} image(s).`,
        });
      } else {
        toast.warning('Aucun texte détecté', {
          description: 'Assurez-vous que vos images contiennent du texte lisible.',
        });
      }
    } catch (error) {
      console.error('Error processing images:', error);
      toast.error('Erreur lors du traitement des images', {
        description: 'Veuillez réessayer avec des images de meilleure qualité.',
      });
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  }, []);

  const handleGenerateCards = async () => {
    if (!extractedText.trim()) {
      toast.error('Aucun texte disponible', {
        description: 'Ajoutez des images avec du texte pour générer des cartes.',
      });
      return;
    }

    setIsGenerating(true);

    try {
      const questions = await generateQuestionsFromText(
        extractedText,
        parseInt(questionCount),
        questionType,
        collectionTitle
      );

      const cards: GeneratedCard[] = questions.map((q) => ({
        id: crypto.randomUUID(),
        question: q.question,
        answer: q.answer,
        type: q.type || questionType,
        isEditing: false,
      }));

      setGeneratedCards(cards);
      setShowPreview(true);

      toast.success('Cartes générées avec succès!', {
        description: `${cards.length} cartes créées à partir de vos images.`,
      });
    } catch (error) {
      console.error('Error generating cards:', error);
      toast.error('Erreur lors de la génération', {
        description: 'Impossible de générer les cartes. Veuillez réessayer.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditCard = (cardId: string) => {
    setGeneratedCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isEditing: true } : card
      )
    );
  };

  const handleSaveCard = (cardId: string, question: string, answer: string) => {
    setGeneratedCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, question, answer, isEditing: false }
          : card
      )
    );
  };

  const handleDeleteCard = (cardId: string) => {
    setGeneratedCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const handleConfirmCards = () => {
    const finalQuestions: GeneratedQuestion[] = generatedCards.map((card) => ({
      question: card.question,
      answer: card.answer,
      type: card.type,
    }));

    onQuestionsGenerated(finalQuestions);
    
    // Reset state
    setImages([]);
    setExtractedText('');
    setGeneratedCards([]);
    setShowPreview(false);

    toast.success('Cartes ajoutées à la collection!', {
      description: `${finalQuestions.length} cartes ont été créées.`,
    });
  };

  const removeImage = (imageId: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== imageId);
    });
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setExtractedText('');
    setGeneratedCards([]);
    setShowPreview(false);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200/50 dark:border-emerald-800/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Créer des cartes depuis des images
            </h3>
            <p className="text-sm text-muted-foreground">
              Analysez vos notes et documents avec l'IA pour créer des cartes automatiquement
            </p>
          </div>
        </div>

        <Separator className="bg-emerald-200/50 dark:bg-emerald-800/50" />

        {!showPreview ? (
          <>
            {/* Image Upload Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-dashed border-emerald-300 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                  disabled={isProcessing}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Sélectionner des images
                </Button>

                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-dashed border-emerald-300 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                  disabled={isProcessing}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Prendre une photo
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />

              {/* Processing Progress */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Traitement des images...</span>
                    <span className="font-medium">{Math.round(processingProgress)}%</span>
                  </div>
                  <Progress value={processingProgress} className="w-full" />
                </div>
              )}

              {/* Images Preview */}
              {images.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Images sélectionnées ({images.length})</h4>
                    <Button
                      onClick={clearAll}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Tout effacer
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-border">
                          <img
                            src={image.preview}
                            alt="Image sélectionnée"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-2 left-2">
                          {image.status === 'processing' && (
                            <Badge className="bg-yellow-500 text-white">
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Traitement...
                            </Badge>
                          )}
                          {image.status === 'completed' && (
                            <Badge className="bg-green-500 text-white">
                              <Check className="h-3 w-3 mr-1" />
                              Terminé
                            </Badge>
                          )}
                          {image.status === 'error' && (
                            <Badge className="bg-red-500 text-white">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Erreur
                            </Badge>
                          )}
                        </div>

                        {/* Remove Button */}
                        <Button
                          onClick={() => removeImage(image.id)}
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extracted Text Preview */}
              {extractedText && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Texte extrait
                  </Label>
                  <Textarea
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    rows={6}
                    className="resize-none font-mono text-sm"
                    placeholder="Le texte extrait de vos images apparaîtra ici..."
                  />
                </div>
              )}
            </div>

            {/* Generation Options */}
            {extractedText && (
              <>
                <Separator className="bg-emerald-200/50 dark:bg-emerald-800/50" />

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Options de génération
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="count" className="text-sm font-medium">
                        Nombre de cartes
                      </Label>
                      <Select
                        value={questionCount}
                        onValueChange={setQuestionCount}
                        disabled={isGenerating}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} carte{num !== 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-sm font-medium">
                        Type de questions
                      </Label>
                      <Select
                        value={questionType}
                        onValueChange={setQuestionType}
                        disabled={isGenerating}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mixed">Mixte</SelectItem>
                          <SelectItem value="qcm">QCM</SelectItem>
                          <SelectItem value="true-false">Vrai/Faux</SelectItem>
                          <SelectItem value="short-answer">Réponse courte</SelectItem>
                          <SelectItem value="definition">Définition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="flex items-start space-x-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-lg">
                    <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-emerald-700 dark:text-emerald-300">
                      <p className="font-medium mb-1">Conseils pour de meilleurs résultats :</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Utilisez des images nettes avec un bon contraste</li>
                        <li>• Assurez-vous que le texte est bien lisible</li>
                        <li>• Les notes manuscrites claires fonctionnent mieux</li>
                        <li>• Évitez les images floues ou mal éclairées</li>
                      </ul>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerateCards}
                    disabled={isGenerating || !extractedText.trim()}
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Générer les cartes avec l'IA
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          /* Preview Section */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">
                Prévisualisation des cartes ({generatedCards.length})
              </h4>
              <Button
                onClick={() => setShowPreview(false)}
                variant="outline"
                size="sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier les options
              </Button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {generatedCards.map((card, index) => (
                <CardPreview
                  key={card.id}
                  card={card}
                  index={index}
                  onEdit={() => handleEditCard(card.id)}
                  onSave={(question, answer) => handleSaveCard(card.id, question, answer)}
                  onDelete={() => handleDeleteCard(card.id)}
                />
              ))}
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={() => setShowPreview(false)}
                variant="outline"
                className="flex-1"
              >
                Retour
              </Button>
              <Button
                onClick={handleConfirmCards}
                disabled={generatedCards.length === 0}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                <Check className="mr-2 h-4 w-4" />
                Confirmer ({generatedCards.length} cartes)
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

// Card Preview Component
interface CardPreviewProps {
  card: GeneratedCard;
  index: number;
  onEdit: () => void;
  onSave: (question: string, answer: string) => void;
  onDelete: () => void;
}

function CardPreview({ card, index, onEdit, onSave, onDelete }: CardPreviewProps) {
  const [editQuestion, setEditQuestion] = useState(card.question);
  const [editAnswer, setEditAnswer] = useState(card.answer);

  const handleSave = () => {
    if (editQuestion.trim() && editAnswer.trim()) {
      onSave(editQuestion.trim(), editAnswer.trim());
    }
  };

  const handleCancel = () => {
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
    onEdit(); // This will set isEditing to false
  };

  return (
    <Card className="p-4 border-l-4 border-l-emerald-400">
      <div className="flex items-start justify-between mb-3">
        <Badge variant="secondary" className="text-xs">
          Carte {index + 1} • {card.type}
        </Badge>
        <div className="flex space-x-1">
          {!card.isEditing && (
            <Button onClick={onEdit} variant="ghost" size="sm">
              <Edit className="h-3 w-3" />
            </Button>
          )}
          <Button onClick={onDelete} variant="ghost" size="sm" className="text-red-600">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {card.isEditing ? (
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Question</Label>
            <Textarea
              value={editQuestion}
              onChange={(e) => setEditQuestion(e.target.value)}
              rows={2}
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Réponse</Label>
            <Textarea
              value={editAnswer}
              onChange={(e) => setEditAnswer(e.target.value)}
              rows={2}
              className="mt-1 text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave} size="sm" className="flex-1">
              <Check className="h-3 w-3 mr-1" />
              Sauvegarder
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
              <X className="h-3 w-3 mr-1" />
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Question</Label>
            <p className="text-sm mt-1">{card.question}</p>
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Réponse</Label>
            <p className="text-sm mt-1">{card.answer}</p>
          </div>
        </div>
      )}
    </Card>
  );
}