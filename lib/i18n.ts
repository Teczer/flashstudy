export type Language = 'fr' | 'en' | 'es' | 'de';

export interface Translations {
  // Header
  appTitle: string;
  
  // Collections
  allCollections: string;
  allCollectionsDescription: string;
  newCollection: string;
  createCollection: string;
  editCollection: string;
  deleteCollection: string;
  noCollections: string;
  noCollectionsDescription: string;
  searchCollections: string;
  recentlyUpdated: string;
  recentlyCreated: string;
  titleAZ: string;
  
  // Collection Detail
  back: string;
  practice: string;
  updated: string;
  cards: string;
  aiGenerated: string;
  searchCards: string;
  noCards: string;
  noCardsDescription: string;
  noCardsFound: string;
  noCardsFoundDescription: string;
  addManually: string;
  generateWithAI: string;
  
  // Collection Form
  collectionTitle: string;
  collectionTitlePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  optional: string;
  colorTheme: string;
  colorThemeDescription: string;
  cancel: string;
  update: string;
  create: string;
  
  // Card Form
  addNewCard: string;
  editCard: string;
  addNewCardDescription: string;
  editCardDescription: string;
  question: string;
  questionPlaceholder: string;
  answer: string;
  answerPlaceholder: string;
  addCard: string;
  updateCard: string;
  
  // AI Generator
  aiQuestionGenerator: string;
  aiQuestionGeneratorDescription: string;
  openaiKeyRequired: string;
  openaiKeyRequiredDescription: string;
  questionTopic: string;
  questionTopicPlaceholder: string;
  numberOfQuestions: string;
  difficulty: string;
  easy: string;
  intermediate: string;
  hard: string;
  tipsTitle: string;
  tip1: string;
  tip2: string;
  tip3: string;
  generateWithChatGPT: string;
  generating: string;
  
  // Practice
  sessionComplete: string;
  sessionCompleteDescription: string;
  correct: string;
  incorrect: string;
  remaining: string;
  progress: string;
  clickToReveal: string;
  clickToFlip: string;
  practiceAgain: string;
  home: string;
  exit: string;
  thinkAnswer: string;
  
  // Table
  successRate: string;
  attempts: string;
  new: string;
  edit: string;
  delete: string;
  
  // Toast Messages
  cardAdded: string;
  cardAddedDescription: string;
  cardUpdated: string;
  cardUpdatedDescription: string;
  cardDeleted: string;
  cardDeletedDescription: string;
  collectionCreated: string;
  collectionCreatedDescription: string;
  collectionUpdated: string;
  collectionUpdatedDescription: string;
  collectionDeletedTitle: string;
  collectionDeletedDescription: string;
  questionsGenerated: string;
  questionsGeneratedDescription: string;
  sessionCompleted: string;
  sessionCompletedDescription: string;
  pleaseEnterPrompt: string;
  pleaseEnterPromptDescription: string;
  openaiKeyRequiredError: string;
  openaiKeyRequiredErrorDescription: string;
  generationFailed: string;
  generationFailedDescription: string;
  noCardsAvailable: string;
  noCardsAvailableDescription: string;
  
  // Confirmations
  deleteCardConfirm: string;
  deleteCollectionConfirm: string;
  
  // Language
  language: string;
  french: string;
  english: string;
  spanish: string;
  german: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    // Header
    appTitle: 'Flashstudy',
    
    // Collections
    allCollections: 'Toutes les Collections',
    allCollectionsDescription: 'Toutes vos collections de cartes mémoire en un seul endroit',
    newCollection: 'Nouvelle Collection',
    createCollection: 'Créer une Collection',
    editCollection: 'Modifier la Collection',
    deleteCollection: 'Supprimer la Collection',
    noCollections: 'Aucune collection pour le moment',
    noCollectionsDescription: 'Créez votre première collection de cartes mémoire pour commencer.',
    searchCollections: 'Rechercher des collections...',
    recentlyUpdated: 'Récemment Mises à Jour',
    recentlyCreated: 'Récemment Créées',
    titleAZ: 'Titre A-Z',
    
    // Collection Detail
    back: 'Retour',
    practice: 'Pratiquer',
    updated: 'Mis à jour',
    cards: 'cartes',
    aiGenerated: 'IA Générée',
    searchCards: 'Rechercher des cartes...',
    noCards: 'Aucune carte pour le moment',
    noCardsDescription: 'Ajoutez votre première carte mémoire manuellement ou générez-les avec l\'IA.',
    noCardsFound: 'Aucune carte trouvée',
    noCardsFoundDescription: 'Essayez d\'ajuster vos termes de recherche pour trouver ce que vous cherchez.',
    addManually: 'Ajouter manuellement',
    generateWithAI: 'Générer avec l\'IA',
    
    // Collection Form
    collectionTitle: 'Titre de la Collection',
    collectionTitlePlaceholder: 'ex: Mathématiques, Vocabulaire Espagnol, Faits Historiques',
    description: 'Description',
    descriptionPlaceholder: 'Brève description de cette collection...',
    optional: '(optionnel)',
    colorTheme: 'Thème de Couleur',
    colorThemeDescription: 'Choisissez un thème de couleur pour votre collection',
    cancel: 'Annuler',
    update: 'Mettre à jour',
    create: 'Créer',
    
    // Card Form
    addNewCard: 'Ajouter une Nouvelle Carte',
    editCard: 'Modifier la Carte',
    addNewCardDescription: 'Créez une nouvelle carte mémoire en ajoutant une question et sa réponse.',
    editCardDescription: 'Mettez à jour la question et la réponse de cette carte mémoire.',
    question: 'Question',
    questionPlaceholder: 'Entrez votre question ici...',
    answer: 'Réponse',
    answerPlaceholder: 'Entrez la bonne réponse ici...',
    addCard: 'Ajouter',
    updateCard: 'Mettre à jour',
    
    // AI Generator
    aiQuestionGenerator: 'Générateur de Questions IA',
    aiQuestionGeneratorDescription: 'Générez des cartes mémoire automatiquement avec ChatGPT',
    openaiKeyRequired: 'Clé API OpenAI Requise',
    openaiKeyRequiredDescription: 'Pour utiliser la génération de questions IA, veuillez ajouter votre clé API OpenAI dans la variable d\'environnement',
    questionTopic: 'Sujet/Prompt de Question',
    questionTopicPlaceholder: 'ex: Équations d\'algèbre de base, Vocabulaire français pour débutants, Événements clés de la Seconde Guerre mondiale...',
    numberOfQuestions: 'Nombre de Questions',
    difficulty: 'Difficulté',
    easy: 'Facile',
    intermediate: 'Intermédiaire',
    hard: 'Difficile',
    tipsTitle: 'Conseils pour de meilleurs résultats :',
    tip1: '• Soyez spécifique sur le sujet et le niveau de difficulté',
    tip2: '• Incluez le contexte comme "pour débutants" ou "niveau avancé"',
    tip3: '• Mentionnez le format préféré (choix multiples, réponse courte, etc.)',
    generateWithChatGPT: 'Générer avec ChatGPT',
    generating: 'Génération de',
    
    // Practice
    sessionComplete: 'Session Terminée !',
    sessionCompleteDescription: 'Vous avez terminé toutes les cartes de',
    correct: 'Correct',
    incorrect: 'Incorrect',
    remaining: 'Restant',
    progress: 'Progression',
    clickToReveal: 'Cliquez pour révéler la réponse',
    clickToFlip: 'Cliquez pour retourner',
    practiceAgain: 'Pratiquer à Nouveau',
    home: 'Accueil',
    exit: 'Quitter',
    thinkAnswer: 'Pensez à votre réponse, puis cliquez sur la carte pour révéler la bonne réponse.',
    
    // Table
    successRate: 'Taux de réussite',
    attempts: 'Tentatives',
    new: 'Nouveau',
    edit: 'Modifier',
    delete: 'Supprimer',
    
    // Toast Messages
    cardAdded: 'Carte ajoutée avec succès!',
    cardAddedDescription: 'Votre nouvelle carte mémoire a été ajoutée à la collection.',
    cardUpdated: 'Carte mise à jour avec succès!',
    cardUpdatedDescription: 'Votre carte mémoire a été mise à jour.',
    cardDeleted: 'Carte supprimée avec succès!',
    cardDeletedDescription: 'La carte mémoire a été supprimée de votre collection.',
    collectionCreated: 'Collection créée!',
    collectionCreatedDescription: 'a été créée avec succès.',
    collectionUpdated: 'Collection mise à jour!',
    collectionUpdatedDescription: 'a été mise à jour avec succès.',
    collectionDeletedTitle: 'Collection supprimée!',
    collectionDeletedDescription: 'a été supprimée.',
    questionsGenerated: 'Questions générées avec succès!',
    questionsGeneratedDescription: 'questions générées avec l\'IA.',
    sessionCompleted: 'Session d\'entraînement terminée!',
    sessionCompletedDescription: 'Vous avez obtenu',
    pleaseEnterPrompt: 'Veuillez entrer un sujet',
    pleaseEnterPromptDescription: 'Décrivez le type de questions que vous souhaitez générer.',
    openaiKeyRequiredError: 'Clé API OpenAI requise',
    openaiKeyRequiredErrorDescription: 'Veuillez configurer votre clé API OpenAI pour utiliser cette fonctionnalité.',
    generationFailed: 'Échec de la génération des questions',
    generationFailedDescription: 'Veuillez réessayer.',
    noCardsAvailable: 'Aucune carte disponible',
    noCardsAvailableDescription: 'Ajoutez des cartes à cette collection avant de pratiquer.',
    
    // Confirmations
    deleteCardConfirm: 'Êtes-vous sûr de vouloir supprimer cette carte ?',
    deleteCollectionConfirm: 'Êtes-vous sûr de vouloir supprimer',
    
    // Language
    language: 'Langue',
    french: 'Français',
    english: 'Anglais',
    spanish: 'Espagnol',
    german: 'Allemand',
  },
  
  en: {
    // Header
    appTitle: 'Flashstudy',
    
    // Collections
    allCollections: 'All Collections',
    allCollectionsDescription: 'All your flashcard collections in one place',
    newCollection: 'New Collection',
    createCollection: 'Create Collection',
    editCollection: 'Edit Collection',
    deleteCollection: 'Delete Collection',
    noCollections: 'No collections yet',
    noCollectionsDescription: 'Create your first flashcard collection to get started.',
    searchCollections: 'Search collections...',
    recentlyUpdated: 'Recently Updated',
    recentlyCreated: 'Recently Created',
    titleAZ: 'Title A-Z',
    
    // Collection Detail
    back: 'Back',
    practice: 'Practice',
    updated: 'Updated',
    cards: 'cards',
    aiGenerated: 'AI Generated',
    searchCards: 'Search cards...',
    noCards: 'No cards yet',
    noCardsDescription: 'Add your first flashcard manually or generate them with AI.',
    noCardsFound: 'No cards found',
    noCardsFoundDescription: 'Try adjusting your search terms to find what you\'re looking for.',
    addManually: 'Add Manually',
    generateWithAI: 'Generate with AI',
    
    // Collection Form
    collectionTitle: 'Collection Title',
    collectionTitlePlaceholder: 'e.g., Mathematics, Spanish Vocabulary, History Facts',
    description: 'Description',
    descriptionPlaceholder: 'Brief description of this collection...',
    optional: '(optional)',
    colorTheme: 'Color Theme',
    colorThemeDescription: 'Choose a color theme for your collection',
    cancel: 'Cancel',
    update: 'Update',
    create: 'Create',
    
    // Card Form
    addNewCard: 'Add New Card',
    editCard: 'Edit Card',
    addNewCardDescription: 'Create a new flashcard by adding a question and its answer.',
    editCardDescription: 'Update the question and answer for this flashcard.',
    question: 'Question',
    questionPlaceholder: 'Enter your question here...',
    answer: 'Answer',
    answerPlaceholder: 'Enter the correct answer here...',
    addCard: 'Add',
    updateCard: 'Update',
    
    // AI Generator
    aiQuestionGenerator: 'AI Question Generator',
    aiQuestionGeneratorDescription: 'Generate flashcards automatically using ChatGPT',
    openaiKeyRequired: 'OpenAI API Key Required',
    openaiKeyRequiredDescription: 'To use AI question generation, please add your OpenAI API key to the environment variable',
    questionTopic: 'Question Topic/Prompt',
    questionTopicPlaceholder: 'e.g., Basic algebra equations, French vocabulary for beginners, World War 2 key events...',
    numberOfQuestions: 'Number of Questions',
    difficulty: 'Difficulty',
    easy: 'Easy',
    intermediate: 'Intermediate',
    hard: 'Hard',
    tipsTitle: 'Tips for better results:',
    tip1: '• Be specific about the topic and difficulty level',
    tip2: '• Include context like "for beginners" or "advanced level"',
    tip3: '• Mention the format you prefer (multiple choice, short answer, etc.)',
    generateWithChatGPT: 'Generate with ChatGPT',
    generating: 'Generating',
    
    // Practice
    sessionComplete: 'Session Complete!',
    sessionCompleteDescription: 'You\'ve completed all cards in',
    correct: 'Correct',
    incorrect: 'Incorrect',
    remaining: 'Remaining',
    progress: 'Progress',
    clickToReveal: 'Click to reveal answer',
    clickToFlip: 'Click to flip back',
    practiceAgain: 'Practice Again',
    home: 'Home',
    exit: 'Exit',
    thinkAnswer: 'Think of your answer, then click the card to reveal the correct answer.',
    
    // Table
    successRate: 'Success Rate',
    attempts: 'Attempts',
    new: 'New',
    edit: 'Edit',
    delete: 'Delete',
    
    // Toast Messages
    cardAdded: 'Card added successfully!',
    cardAddedDescription: 'Your new flashcard has been added to the collection.',
    cardUpdated: 'Card updated successfully!',
    cardUpdatedDescription: 'Your flashcard has been updated.',
    cardDeleted: 'Card deleted successfully!',
    cardDeletedDescription: 'The flashcard has been removed from your collection.',
    collectionCreated: 'Collection created!',
    collectionCreatedDescription: 'has been created successfully.',
    collectionUpdated: 'Collection updated!',
    collectionUpdatedDescription: 'has been updated successfully.',
    collectionDeletedTitle: 'Collection deleted!',
    collectionDeletedDescription: 'has been deleted.',
    questionsGenerated: 'Questions generated successfully!',
    questionsGeneratedDescription: 'questions generated using AI.',
    sessionCompleted: 'Practice session completed!',
    sessionCompletedDescription: 'You got',
    pleaseEnterPrompt: 'Please enter a prompt',
    pleaseEnterPromptDescription: 'Describe what type of questions you want to generate.',
    openaiKeyRequiredError: 'OpenAI API key required',
    openaiKeyRequiredErrorDescription: 'Please configure your OpenAI API key to use this feature.',
    generationFailed: 'Failed to generate questions',
    generationFailedDescription: 'Please try again.',
    noCardsAvailable: 'No cards available',
    noCardsAvailableDescription: 'Add some cards to this collection before practicing.',
    
    // Confirmations
    deleteCardConfirm: 'Are you sure you want to delete this card?',
    deleteCollectionConfirm: 'Are you sure you want to delete',
    
    // Language
    language: 'Language',
    french: 'French',
    english: 'English',
    spanish: 'Spanish',
    german: 'German',
  },
  
  es: {
    // Header
    appTitle: 'Flashstudy',
    
    // Collections
    allCollections: 'Todas las Colecciones',
    allCollectionsDescription: 'Todas tus colecciones de tarjetas de memoria en un lugar',
    newCollection: 'Nueva Colección',
    createCollection: 'Crear Colección',
    editCollection: 'Editar Colección',
    deleteCollection: 'Eliminar Colección',
    noCollections: 'Aún no hay colecciones',
    noCollectionsDescription: 'Crea tu primera colección de tarjetas de memoria para comenzar.',
    searchCollections: 'Buscar colecciones...',
    recentlyUpdated: 'Recientemente Actualizadas',
    recentlyCreated: 'Recientemente Creadas',
    titleAZ: 'Título A-Z',
    
    // Collection Detail
    back: 'Atrás',
    practice: 'Practicar',
    updated: 'Actualizado',
    cards: 'tarjetas',
    aiGenerated: 'Generado por IA',
    searchCards: 'Buscar tarjetas...',
    noCards: 'Aún no hay tarjetas',
    noCardsDescription: 'Añade tu primera tarjeta de memoria manualmente o genéralas con IA.',
    noCardsFound: 'No se encontraron tarjetas',
    noCardsFoundDescription: 'Intenta ajustar tus términos de búsqueda para encontrar lo que buscas.',
    addManually: 'Añadir Manualmente',
    generateWithAI: 'Generar con IA',
    
    // Collection Form
    collectionTitle: 'Título de la Colección',
    collectionTitlePlaceholder: 'ej: Matemáticas, Vocabulario Español, Hechos Históricos',
    description: 'Descripción',
    descriptionPlaceholder: 'Breve descripción de esta colección...',
    optional: '(opcional)',
    colorTheme: 'Tema de Color',
    colorThemeDescription: 'Elige un tema de color para tu colección',
    cancel: 'Cancelar',
    update: 'Actualizar',
    create: 'Crear',
    
    // Card Form
    addNewCard: 'Añadir Nueva Tarjeta',
    editCard: 'Editar Tarjeta',
    addNewCardDescription: 'Crea una nueva tarjeta de memoria añadiendo una pregunta y su respuesta.',
    editCardDescription: 'Actualiza la pregunta y respuesta de esta tarjeta de memoria.',
    question: 'Pregunta',
    questionPlaceholder: 'Introduce tu pregunta aquí...',
    answer: 'Respuesta',
    answerPlaceholder: 'Introduce la respuesta correcta aquí...',
    addCard: 'Añadir',
    updateCard: 'Actualizar',
    
    // AI Generator
    aiQuestionGenerator: 'Generador de Preguntas IA',
    aiQuestionGeneratorDescription: 'Genera tarjetas de memoria automáticamente usando ChatGPT',
    openaiKeyRequired: 'Clave API de OpenAI Requerida',
    openaiKeyRequiredDescription: 'Para usar la generación de preguntas IA, por favor añade tu clave API de OpenAI a la variable de entorno',
    questionTopic: 'Tema/Prompt de Pregunta',
    questionTopicPlaceholder: 'ej: Ecuaciones básicas de álgebra, Vocabulario francés para principiantes, Eventos clave de la Segunda Guerra Mundial...',
    numberOfQuestions: 'Número de Preguntas',
    difficulty: 'Dificultad',
    easy: 'Fácil',
    intermediate: 'Intermedio',
    hard: 'Difícil',
    tipsTitle: 'Consejos para mejores resultados:',
    tip1: '• Sé específico sobre el tema y nivel de dificultad',
    tip2: '• Incluye contexto como "para principiantes" o "nivel avanzado"',
    tip3: '• Menciona el formato que prefieres (opción múltiple, respuesta corta, etc.)',
    generateWithChatGPT: 'Generar con ChatGPT',
    generating: 'Generando',
    
    // Practice
    sessionComplete: '¡Sesión Completada!',
    sessionCompleteDescription: 'Has completado todas las tarjetas en',
    correct: 'Correcto',
    incorrect: 'Incorrecto',
    remaining: 'Restante',
    progress: 'Progreso',
    clickToReveal: 'Haz clic para revelar la respuesta',
    clickToFlip: 'Haz clic para voltear',
    practiceAgain: 'Practicar de Nuevo',
    home: 'Inicio',
    exit: 'Salir',
    thinkAnswer: 'Piensa en tu respuesta, luego haz clic en la tarjeta para revelar la respuesta correcta.',
    
    // Table
    successRate: 'Tasa de Éxito',
    attempts: 'Intentos',
    new: 'Nuevo',
    edit: 'Editar',
    delete: 'Eliminar',
    
    // Toast Messages
    cardAdded: '¡Tarjeta añadida con éxito!',
    cardAddedDescription: 'Tu nueva tarjeta de memoria ha sido añadida a la colección.',
    cardUpdated: '¡Tarjeta actualizada con éxito!',
    cardUpdatedDescription: 'Tu tarjeta de memoria ha sido actualizada.',
    cardDeleted: '¡Tarjeta eliminada con éxito!',
    cardDeletedDescription: 'La tarjeta de memoria ha sido eliminada de tu colección.',
    collectionCreated: '¡Colección creada!',
    collectionCreatedDescription: 'ha sido creada con éxito.',
    collectionUpdated: '¡Colección actualizada!',
    collectionUpdatedDescription: 'ha sido actualizada con éxito.',
    collectionDeletedTitle: '¡Colección eliminada!',
    collectionDeletedDescription: 'ha sido eliminada.',
    questionsGenerated: '¡Preguntas generadas con éxito!',
    questionsGeneratedDescription: 'preguntas generadas usando IA.',
    sessionCompleted: '¡Sesión de práctica completada!',
    sessionCompletedDescription: 'Obtuviste',
    pleaseEnterPrompt: 'Por favor introduce un prompt',
    pleaseEnterPromptDescription: 'Describe qué tipo de preguntas quieres generar.',
    openaiKeyRequiredError: 'Clave API de OpenAI requerida',
    openaiKeyRequiredErrorDescription: 'Por favor configura tu clave API de OpenAI para usar esta función.',
    generationFailed: 'Error al generar preguntas',
    generationFailedDescription: 'Por favor inténtalo de nuevo.',
    noCardsAvailable: 'No hay tarjetas disponibles',
    noCardsAvailableDescription: 'Añade algunas tarjetas a esta colección antes de practicar.',
    
    // Confirmations
    deleteCardConfirm: '¿Estás seguro de que quieres eliminar esta tarjeta?',
    deleteCollectionConfirm: '¿Estás seguro de que quieres eliminar',
    
    // Language
    language: 'Idioma',
    french: 'Francés',
    english: 'Inglés',
    spanish: 'Español',
    german: 'Alemán',
  },
  
  de: {
    // Header
    appTitle: 'Flashstudy',
    
    // Collections
    allCollections: 'Alle Sammlungen',
    allCollectionsDescription: 'Alle Ihre Karteikarten-Sammlungen an einem Ort',
    newCollection: 'Neue Sammlung',
    createCollection: 'Sammlung Erstellen',
    editCollection: 'Sammlung Bearbeiten',
    deleteCollection: 'Sammlung Löschen',
    noCollections: 'Noch keine Sammlungen',
    noCollectionsDescription: 'Erstellen Sie Ihre erste Karteikarten-Sammlung, um zu beginnen.',
    searchCollections: 'Sammlungen suchen...',
    recentlyUpdated: 'Kürzlich Aktualisiert',
    recentlyCreated: 'Kürzlich Erstellt',
    titleAZ: 'Titel A-Z',
    
    // Collection Detail
    back: 'Zurück',
    practice: 'Üben',
    updated: 'Aktualisiert',
    cards: 'Karten',
    aiGenerated: 'KI-Generiert',
    searchCards: 'Karten suchen...',
    noCards: 'Noch keine Karten',
    noCardsDescription: 'Fügen Sie Ihre erste Karteikarte manuell hinzu oder generieren Sie sie mit KI.',
    noCardsFound: 'Keine Karten gefunden',
    noCardsFoundDescription: 'Versuchen Sie, Ihre Suchbegriffe anzupassen, um zu finden, wonach Sie suchen.',
    addManually: 'Manuell Hinzufügen',
    generateWithAI: 'Mit KI Generieren',
    
    // Collection Form
    collectionTitle: 'Sammlungstitel',
    collectionTitlePlaceholder: 'z.B. Mathematik, Spanisches Vokabular, Geschichtsfakten',
    description: 'Beschreibung',
    descriptionPlaceholder: 'Kurze Beschreibung dieser Sammlung...',
    optional: '(optional)',
    colorTheme: 'Farbthema',
    colorThemeDescription: 'Wählen Sie ein Farbthema für Ihre Sammlung',
    cancel: 'Abbrechen',
    update: 'Aktualisieren',
    create: 'Erstellen',
    
    // Card Form
    addNewCard: 'Neue Karte Hinzufügen',
    editCard: 'Karte Bearbeiten',
    addNewCardDescription: 'Erstellen Sie eine neue Karteikarte, indem Sie eine Frage und ihre Antwort hinzufügen.',
    editCardDescription: 'Aktualisieren Sie die Frage und Antwort für diese Karteikarte.',
    question: 'Frage',
    questionPlaceholder: 'Geben Sie hier Ihre Frage ein...',
    answer: 'Antwort',
    answerPlaceholder: 'Geben Sie hier die richtige Antwort ein...',
    addCard: 'Hinzufügen',
    updateCard: 'Aktualisieren',
    
    // AI Generator
    aiQuestionGenerator: 'KI-Fragengenerator',
    aiQuestionGeneratorDescription: 'Generieren Sie Karteikarten automatisch mit ChatGPT',
    openaiKeyRequired: 'OpenAI API-Schlüssel Erforderlich',
    openaiKeyRequiredDescription: 'Um die KI-Fragengenerierung zu verwenden, fügen Sie bitte Ihren OpenAI API-Schlüssel zur Umgebungsvariable hinzu',
    questionTopic: 'Fragenthema/Prompt',
    questionTopicPlaceholder: 'z.B. Grundlegende Algebra-Gleichungen, Französisches Vokabular für Anfänger, Schlüsselereignisse des 2. Weltkriegs...',
    numberOfQuestions: 'Anzahl der Fragen',
    difficulty: 'Schwierigkeit',
    easy: 'Einfach',
    intermediate: 'Mittelstufe',
    hard: 'Schwer',
    tipsTitle: 'Tipps für bessere Ergebnisse:',
    tip1: '• Seien Sie spezifisch über das Thema und den Schwierigkeitsgrad',
    tip2: '• Fügen Sie Kontext hinzu wie "für Anfänger" oder "fortgeschrittenes Niveau"',
    tip3: '• Erwähnen Sie das Format, das Sie bevorzugen (Multiple Choice, kurze Antwort, etc.)',
    generateWithChatGPT: 'Mit ChatGPT Generieren',
    generating: 'Generiere',
    
    // Practice
    sessionComplete: 'Sitzung Abgeschlossen!',
    sessionCompleteDescription: 'Sie haben alle Karten in abgeschlossen',
    correct: 'Richtig',
    incorrect: 'Falsch',
    remaining: 'Verbleibend',
    progress: 'Fortschritt',
    clickToReveal: 'Klicken Sie, um die Antwort zu zeigen',
    clickToFlip: 'Klicken Sie zum Umdrehen',
    practiceAgain: 'Erneut Üben',
    home: 'Startseite',
    exit: 'Beenden',
    thinkAnswer: 'Denken Sie an Ihre Antwort und klicken Sie dann auf die Karte, um die richtige Antwort zu zeigen.',
    
    // Table
    successRate: 'Erfolgsrate',
    attempts: 'Versuche',
    new: 'Neu',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    
    // Toast Messages
    cardAdded: 'Karte erfolgreich hinzugefügt!',
    cardAddedDescription: 'Ihre neue Karteikarte wurde zur Sammlung hinzugefügt.',
    cardUpdated: 'Karte erfolgreich aktualisiert!',
    cardUpdatedDescription: 'Ihre Karteikarte wurde aktualisiert.',
    cardDeleted: 'Karte erfolgreich gelöscht!',
    cardDeletedDescription: 'Die Karteikarte wurde aus Ihrer Sammlung entfernt.',
    collectionCreated: 'Sammlung erstellt!',
    collectionCreatedDescription: 'wurde erfolgreich erstellt.',
    collectionUpdated: 'Sammlung aktualisiert!',
    collectionUpdatedDescription: 'wurde erfolgreich aktualisiert.',
    collectionDeletedTitle: 'Sammlung gelöscht!',
    collectionDeletedDescription: 'wurde gelöscht.',
    questionsGenerated: 'Fragen erfolgreich generiert!',
    questionsGeneratedDescription: 'Fragen mit KI generiert.',
    sessionCompleted: 'Übungssitzung abgeschlossen!',
    sessionCompletedDescription: 'Sie haben',
    pleaseEnterPrompt: 'Bitte geben Sie einen Prompt ein',
    pleaseEnterPromptDescription: 'Beschreiben Sie, welche Art von Fragen Sie generieren möchten.',
    openaiKeyRequiredError: 'OpenAI API-Schlüssel erforderlich',
    openaiKeyRequiredErrorDescription: 'Bitte konfigurieren Sie Ihren OpenAI API-Schlüssel, um diese Funktion zu verwenden.',
    generationFailed: 'Fehler beim Generieren der Fragen',
    generationFailedDescription: 'Bitte versuchen Sie es erneut.',
    noCardsAvailable: 'Keine Karten verfügbar',
    noCardsAvailableDescription: 'Fügen Sie einige Karten zu dieser Sammlung hinzu, bevor Sie üben.',
    
    // Confirmations
    deleteCardConfirm: 'Sind Sie sicher, dass Sie diese Karte löschen möchten?',
    deleteCollectionConfirm: 'Sind Sie sicher, dass Sie löschen möchten',
    
    // Language
    language: 'Sprache',
    french: 'Französisch',
    english: 'Englisch',
    spanish: 'Spanisch',
    german: 'Deutsch',
  },
};

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('flashstudy-language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('flashstudy-language', newLanguage);
  };

  return {
    t: translations[language],
    language,
    changeLanguage,
  };
}