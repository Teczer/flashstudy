'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '@/i18n.config';

export type Language = Locale;

export interface Translations {
  common: {
    back: string;
    practice: string;
    updated: string;
    cards: string;
    cardsCount: string;
    aiGenerated: string;
    edit: string;
    delete: string;
    cancel: string;
    update: string;
    create: string;
    new: string;
  };
  header: {
    appTitle: string;
  };
  collections: {
    allCollections: string;
    allCollectionsDescription: string;
    newCollection: string;
    createCollection: string;
    editCollection: string;
    deleteCollection: string;
    empty: string;
    emptyDescription: string;
    noResults: string;
    noResultsDescription: string;
    searchPlaceholder: string;
    sortUpdated: string;
    sortCreated: string;
    sortTitle: string;
    title: string;
    titlePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    optional: string;
    colorTheme: string;
    colorThemeDescription: string;
    created: string;
    createdDescription: string;
    updated: string;
    updatedDescription: string;
    deleted: string;
    deletedDescription: string;
    deleteConfirm: string;
  };
  cards: {
    searchPlaceholder: string;
    empty: string;
    emptyDescription: string;
    noResults: string;
    noResultsDescription: string;
    addManually: string;
    generateWithAI: string;
    question: string;
    answer: string;
    successRate: string;
    attempts: string;
    addNewCard: string;
    editCard: string;
    addNewCardDescription: string;
    editCardDescription: string;
    questionPlaceholder: string;
    answerPlaceholder: string;
    addCard: string;
    updateCard: string;
    added: string;
    addedDescription: string;
    updated: string;
    updatedDescription: string;
    deleted: string;
    deletedDescription: string;
    deleteConfirm: string;
  };
  ai: {
    title: string;
    description: string;
    form: {
      prompt: string;
      promptPlaceholder: string;
      count: string;
      questionCount: string;
    };
    apiKey: {
      required: string;
      description: string;
    };
    tips: {
      title: string;
      specific: string;
      context: string;
      format: string;
    };
    generate: string;
    generating: string;
    success: {
      generated: string;
      generatedDescription: string;
    };
    errors: {
      noPrompt: string;
      noPromptDescription: string;
      noApiKey: string;
      noApiKeyDescription: string;
      failed: string;
      tryAgain: string;
    };
  };
  practice: {
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
  };
  notFound: {
    title: string;
    description: string;
    goHome: string;
    goBack: string;
  };
  language: {
    language: string;
    french: string;
    english: string;
    spanish: string;
    german: string;
  };
  toast: {
    sessionCompleted: string;
    sessionCompletedDescription: string;
    noCardsAvailable: string;
    noCardsAvailableDescription: string;
    loadingFlashcards: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    common: {
      back: 'Retour',
      practice: 'Pratiquer',
      updated: 'Mis à jour',
      cards: 'cartes',
      cardsCount: '{{count}} cartes',
      aiGenerated: 'IA Générée',
      edit: 'Modifier',
      delete: 'Supprimer',
      cancel: 'Annuler',
      update: 'Mettre à jour',
      create: 'Créer',
      new: 'Nouveau',
    },
    header: {
      appTitle: 'Flashstudy',
    },
    collections: {
      allCollections: 'Toutes les Collections',
      allCollectionsDescription: 'Toutes vos collections de cartes mémoire en un seul endroit',
      newCollection: 'Nouvelle Collection',
      createCollection: 'Créer une Collection',
      editCollection: 'Modifier la Collection',
      deleteCollection: 'Supprimer la Collection',
      empty: 'Aucune collection pour le moment',
      emptyDescription: 'Créez votre première collection de cartes mémoire pour commencer.',
      noResults: 'Aucune collection trouvée',
      noResultsDescription: 'Essayez d\'ajuster vos termes de recherche pour trouver ce que vous cherchez.',
      searchPlaceholder: 'Rechercher des collections...',
      sortUpdated: 'Récemment Mises à Jour',
      sortCreated: 'Récemment Créées',
      sortTitle: 'Titre A-Z',
      title: 'Titre de la Collection',
      titlePlaceholder: 'ex: Mathématiques, Vocabulaire Espagnol, Faits Historiques',
      description: 'Description',
      descriptionPlaceholder: 'Brève description de cette collection...',
      optional: '(optionnel)',
      colorTheme: 'Thème de Couleur',
      colorThemeDescription: 'Choisissez un thème de couleur pour votre collection',
      created: 'Collection créée!',
      createdDescription: '{{title}} a été créée avec succès.',
      updated: 'Collection mise à jour!',
      updatedDescription: '{{title}} a été mise à jour avec succès.',
      deleted: 'Collection supprimée!',
      deletedDescription: '{{title}} a été supprimée.',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer {{title}} ? Cette action supprimera également toutes les {{count}} cartes qu\'elle contient.',
    },
    cards: {
      searchPlaceholder: 'Rechercher des cartes...',
      empty: 'Aucune carte pour le moment',
      emptyDescription: 'Ajoutez votre première carte mémoire manuellement ou générez-les avec l\'IA.',
      noResults: 'Aucune carte trouvée',
      noResultsDescription: 'Essayez d\'ajuster vos termes de recherche pour trouver ce que vous cherchez.',
      addManually: 'Ajouter manuellement',
      generateWithAI: 'Générer avec l\'IA',
      question: 'Question',
      answer: 'Réponse',
      successRate: 'Taux de réussite',
      attempts: 'Tentatives',
      addNewCard: 'Ajouter une Nouvelle Carte',
      editCard: 'Modifier la Carte',
      addNewCardDescription: 'Créez une nouvelle carte mémoire en ajoutant une question et sa réponse.',
      editCardDescription: 'Mettez à jour la question et la réponse de cette carte mémoire.',
      questionPlaceholder: 'Entrez votre question ici...',
      answerPlaceholder: 'Entrez la bonne réponse ici...',
      addCard: 'Ajouter',
      updateCard: 'Mettre à jour',
      added: 'Carte ajoutée avec succès!',
      addedDescription: 'Votre nouvelle carte mémoire a été ajoutée à la collection.',
      updated: 'Carte mise à jour avec succès!',
      updatedDescription: 'Votre carte mémoire a été mise à jour.',
      deleted: 'Carte supprimée avec succès!',
      deletedDescription: 'La carte mémoire a été supprimée de votre collection.',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette carte ?',
    },
    ai: {
      title: 'Générateur de Questions IA',
      description: 'Générez des cartes mémoire automatiquement avec ChatGPT',
      form: {
        prompt: 'Sujet/Prompt de Question',
        promptPlaceholder: 'ex: Équations d\'algèbre de base, Vocabulaire français pour débutants, Événements clés de la Seconde Guerre mondiale...',
        count: 'Nombre de Questions',
        questionCount: '{{count}} questions',
      },
      apiKey: {
        required: 'Clé API OpenAI Requise',
        description: 'Pour utiliser la génération de questions IA, veuillez ajouter votre clé API OpenAI dans la variable d\'environnement',
      },
      tips: {
        title: 'Conseils pour de meilleurs résultats :',
        specific: 'Soyez spécifique sur le sujet et le niveau de difficulté',
        context: 'Incluez le contexte comme "pour débutants" ou "niveau avancé"',
        format: 'Mentionnez le format préféré (choix multiples, réponse courte, etc.)',
      },
      generate: 'Générer avec ChatGPT',
      generating: 'Génération de {{count}} questions...',
      success: {
        generated: 'Questions générées avec succès!',
        generatedDescription: '{{count}} questions générées avec l\'IA.',
      },
      errors: {
        noPrompt: 'Veuillez entrer un sujet',
        noPromptDescription: 'Décrivez le type de questions que vous souhaitez générer.',
        noApiKey: 'Clé API OpenAI requise',
        noApiKeyDescription: 'Veuillez configurer votre clé API OpenAI pour utiliser cette fonctionnalité.',
        failed: 'Échec de la génération des questions',
        tryAgain: 'Veuillez réessayer.',
      },
    },
    practice: {
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
    },
    notFound: {
      title: 'Page non trouvée',
      description: 'La page que vous recherchez n\'existe pas.',
      goHome: 'Retour à l\'accueil',
      goBack: 'Retour',
    },
    language: {
      language: 'Langue',
      french: 'Français',
      english: 'Anglais',
      spanish: 'Espagnol',
      german: 'Allemand',
    },
    toast: {
      sessionCompleted: 'Session d\'entraînement terminée!',
      sessionCompletedDescription: 'Vous avez obtenu',
      noCardsAvailable: 'Aucune carte disponible',
      noCardsAvailableDescription: 'Ajoutez des cartes à cette collection avant de pratiquer.',
      loadingFlashcards: 'Chargement de vos cartes mémoire...',
    },
  },
  
  en: {
    common: {
      back: 'Back',
      practice: 'Practice',
      updated: 'Updated',
      cards: 'cards',
      cardsCount: '{{count}} cards',
      aiGenerated: 'AI Generated',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      update: 'Update',
      create: 'Create',
      new: 'New',
    },
    header: {
      appTitle: 'Flashstudy',
    },
    collections: {
      allCollections: 'All Collections',
      allCollectionsDescription: 'All your flashcard collections in one place',
      newCollection: 'New Collection',
      createCollection: 'Create Collection',
      editCollection: 'Edit Collection',
      deleteCollection: 'Delete Collection',
      empty: 'No collections yet',
      emptyDescription: 'Create your first flashcard collection to get started.',
      noResults: 'No collections found',
      noResultsDescription: 'Try adjusting your search terms to find what you\'re looking for.',
      searchPlaceholder: 'Search collections...',
      sortUpdated: 'Recently Updated',
      sortCreated: 'Recently Created',
      sortTitle: 'Title A-Z',
      title: 'Collection Title',
      titlePlaceholder: 'e.g., Mathematics, Spanish Vocabulary, History Facts',
      description: 'Description',
      descriptionPlaceholder: 'Brief description of this collection...',
      optional: '(optional)',
      colorTheme: 'Color Theme',
      colorThemeDescription: 'Choose a color theme for your collection',
      created: 'Collection created!',
      createdDescription: '{{title}} has been created successfully.',
      updated: 'Collection updated!',
      updatedDescription: '{{title}} has been updated successfully.',
      deleted: 'Collection deleted!',
      deletedDescription: '{{title}} has been deleted.',
      deleteConfirm: 'Are you sure you want to delete {{title}}? This will also delete all {{count}} cards it contains.',
    },
    cards: {
      searchPlaceholder: 'Search cards...',
      empty: 'No cards yet',
      emptyDescription: 'Add your first flashcard manually or generate them with AI.',
      noResults: 'No cards found',
      noResultsDescription: 'Try adjusting your search terms to find what you\'re looking for.',
      addManually: 'Add Manually',
      generateWithAI: 'Generate with AI',
      question: 'Question',
      answer: 'Answer',
      successRate: 'Success Rate',
      attempts: 'Attempts',
      addNewCard: 'Add New Card',
      editCard: 'Edit Card',
      addNewCardDescription: 'Create a new flashcard by adding a question and its answer.',
      editCardDescription: 'Update the question and answer for this flashcard.',
      questionPlaceholder: 'Enter your question here...',
      answerPlaceholder: 'Enter the correct answer here...',
      addCard: 'Add',
      updateCard: 'Update',
      added: 'Card added successfully!',
      addedDescription: 'Your new flashcard has been added to the collection.',
      updated: 'Card updated successfully!',
      updatedDescription: 'Your flashcard has been updated.',
      deleted: 'Card deleted successfully!',
      deletedDescription: 'The flashcard has been removed from your collection.',
      deleteConfirm: 'Are you sure you want to delete this card?',
    },
    ai: {
      title: 'AI Question Generator',
      description: 'Generate flashcards automatically using ChatGPT',
      form: {
        prompt: 'Question Topic/Prompt',
        promptPlaceholder: 'e.g., Basic algebra equations, French vocabulary for beginners, World War 2 key events...',
        count: 'Number of Questions',
        questionCount: '{{count}} questions',
      },
      apiKey: {
        required: 'OpenAI API Key Required',
        description: 'To use AI question generation, please add your OpenAI API key to the environment variable',
      },
      tips: {
        title: 'Tips for better results:',
        specific: 'Be specific about the topic and difficulty level',
        context: 'Include context like "for beginners" or "advanced level"',
        format: 'Mention the format you prefer (multiple choice, short answer, etc.)',
      },
      generate: 'Generate with ChatGPT',
      generating: 'Generating {{count}} questions...',
      success: {
        generated: 'Questions generated successfully!',
        generatedDescription: '{{count}} questions generated using AI.',
      },
      errors: {
        noPrompt: 'Please enter a prompt',
        noPromptDescription: 'Describe what type of questions you want to generate.',
        noApiKey: 'OpenAI API key required',
        noApiKeyDescription: 'Please configure your OpenAI API key to use this feature.',
        failed: 'Failed to generate questions',
        tryAgain: 'Please try again.',
      },
    },
    practice: {
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
    },
    notFound: {
      title: 'Page not found',
      description: 'The page you\'re looking for doesn\'t exist.',
      goHome: 'Go home',
      goBack: 'Go back',
    },
    language: {
      language: 'Language',
      french: 'French',
      english: 'English',
      spanish: 'Spanish',
      german: 'German',
    },
    toast: {
      sessionCompleted: 'Practice session completed!',
      sessionCompletedDescription: 'You got',
      noCardsAvailable: 'No cards available',
      noCardsAvailableDescription: 'Add some cards to this collection before practicing.',
      loadingFlashcards: 'Loading your flashcards...',
    },
  },
  
  es: {
    common: {
      back: 'Atrás',
      practice: 'Practicar',
      updated: 'Actualizado',
      cards: 'tarjetas',
      cardsCount: '{{count}} tarjetas',
      aiGenerated: 'Generado por IA',
      edit: 'Editar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      update: 'Actualizar',
      create: 'Crear',
      new: 'Nuevo',
    },
    header: {
      appTitle: 'Flashstudy',
    },
    collections: {
      allCollections: 'Todas las Colecciones',
      allCollectionsDescription: 'Todas tus colecciones de tarjetas de memoria en un lugar',
      newCollection: 'Nueva Colección',
      createCollection: 'Crear Colección',
      editCollection: 'Editar Colección',
      deleteCollection: 'Eliminar Colección',
      empty: 'Aún no hay colecciones',
      emptyDescription: 'Crea tu primera colección de tarjetas de memoria para comenzar.',
      noResults: 'No se encontraron colecciones',
      noResultsDescription: 'Intenta ajustar tus términos de búsqueda para encontrar lo que buscas.',
      searchPlaceholder: 'Buscar colecciones...',
      sortUpdated: 'Recientemente Actualizadas',
      sortCreated: 'Recientemente Creadas',
      sortTitle: 'Título A-Z',
      title: 'Título de la Colección',
      titlePlaceholder: 'ej: Matemáticas, Vocabulario Español, Hechos Históricos',
      description: 'Descripción',
      descriptionPlaceholder: 'Breve descripción de esta colección...',
      optional: '(opcional)',
      colorTheme: 'Tema de Color',
      colorThemeDescription: 'Elige un tema de color para tu colección',
      created: '¡Colección creada!',
      createdDescription: '{{title}} ha sido creada con éxito.',
      updated: '¡Colección actualizada!',
      updatedDescription: '{{title}} ha sido actualizada con éxito.',
      deleted: '¡Colección eliminada!',
      deletedDescription: '{{title}} ha sido eliminada.',
      deleteConfirm: '¿Estás seguro de que quieres eliminar {{title}}? Esto también eliminará todas las {{count}} tarjetas que contiene.',
    },
    cards: {
      searchPlaceholder: 'Buscar tarjetas...',
      empty: 'Aún no hay tarjetas',
      emptyDescription: 'Añade tu primera tarjeta de memoria manualmente o genéralas con IA.',
      noResults: 'No se encontraron tarjetas',
      noResultsDescription: 'Intenta ajustar tus términos de búsqueda para encontrar lo que buscas.',
      addManually: 'Añadir Manualmente',
      generateWithAI: 'Generar con IA',
      question: 'Pregunta',
      answer: 'Respuesta',
      successRate: 'Tasa de Éxito',
      attempts: 'Intentos',
      addNewCard: 'Añadir Nueva Tarjeta',
      editCard: 'Editar Tarjeta',
      addNewCardDescription: 'Crea una nueva tarjeta de memoria añadiendo una pregunta y su respuesta.',
      editCardDescription: 'Actualiza la pregunta y respuesta de esta tarjeta de memoria.',
      questionPlaceholder: 'Introduce tu pregunta aquí...',
      answerPlaceholder: 'Introduce la respuesta correcta aquí...',
      addCard: 'Añadir',
      updateCard: 'Actualizar',
      added: '¡Tarjeta añadida con éxito!',
      addedDescription: 'Tu nueva tarjeta de memoria ha sido añadida a la colección.',
      updated: '¡Tarjeta actualizada con éxito!',
      updatedDescription: 'Tu tarjeta de memoria ha sido actualizada.',
      deleted: '¡Tarjeta eliminada con éxito!',
      deletedDescription: 'La tarjeta de memoria ha sido eliminada de tu colección.',
      deleteConfirm: '¿Estás seguro de que quieres eliminar esta tarjeta?',
    },
    ai: {
      title: 'Generador de Preguntas IA',
      description: 'Genera tarjetas de memoria automáticamente usando ChatGPT',
      form: {
        prompt: 'Tema/Prompt de Pregunta',
        promptPlaceholder: 'ej: Ecuaciones básicas de álgebra, Vocabulario francés para principiantes, Eventos clave de la Segunda Guerra Mundial...',
        count: 'Número de Preguntas',
        questionCount: '{{count}} preguntas',
      },
      apiKey: {
        required: 'Clave API de OpenAI Requerida',
        description: 'Para usar la generación de preguntas IA, por favor añade tu clave API de OpenAI a la variable de entorno',
      },
      tips: {
        title: 'Consejos para mejores resultados:',
        specific: 'Sé específico sobre el tema y nivel de dificultad',
        context: 'Incluye contexto como "para principiantes" o "nivel avanzado"',
        format: 'Menciona el formato que prefieres (opción múltiple, respuesta corta, etc.)',
      },
      generate: 'Generar con ChatGPT',
      generating: 'Generando {{count}} preguntas...',
      success: {
        generated: '¡Preguntas generadas con éxito!',
        generatedDescription: '{{count}} preguntas generadas usando IA.',
      },
      errors: {
        noPrompt: 'Por favor introduce un prompt',
        noPromptDescription: 'Describe qué tipo de preguntas quieres generar.',
        noApiKey: 'Clave API de OpenAI requerida',
        noApiKeyDescription: 'Por favor configura tu clave API de OpenAI para usar esta función.',
        failed: 'Error al generar preguntas',
        tryAgain: 'Por favor inténtalo de nuevo.',
      },
    },
    practice: {
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
    },
    notFound: {
      title: 'Página no encontrada',
      description: 'La página que buscas no existe.',
      goHome: 'Ir al inicio',
      goBack: 'Volver',
    },
    language: {
      language: 'Idioma',
      french: 'Francés',
      english: 'Inglés',
      spanish: 'Español',
      german: 'Alemán',
    },
    toast: {
      sessionCompleted: '¡Sesión de práctica completada!',
      sessionCompletedDescription: 'Obtuviste',
      noCardsAvailable: 'No hay tarjetas disponibles',
      noCardsAvailableDescription: 'Añade algunas tarjetas a esta colección antes de practicar.',
      loadingFlashcards: 'Cargando tus tarjetas de memoria...',
    },
  },
  
  de: {
    common: {
      back: 'Zurück',
      practice: 'Üben',
      updated: 'Aktualisiert',
      cards: 'Karten',
      cardsCount: '{{count}} Karten',
      aiGenerated: 'KI-Generiert',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      update: 'Aktualisieren',
      create: 'Erstellen',
      new: 'Neu',
    },
    header: {
      appTitle: 'Flashstudy',
    },
    collections: {
      allCollections: 'Alle Sammlungen',
      allCollectionsDescription: 'Alle Ihre Karteikarten-Sammlungen an einem Ort',
      newCollection: 'Neue Sammlung',
      createCollection: 'Sammlung Erstellen',
      editCollection: 'Sammlung Bearbeiten',
      deleteCollection: 'Sammlung Löschen',
      empty: 'Noch keine Sammlungen',
      emptyDescription: 'Erstellen Sie Ihre erste Karteikarten-Sammlung, um zu beginnen.',
      noResults: 'Keine Sammlungen gefunden',
      noResultsDescription: 'Versuchen Sie, Ihre Suchbegriffe anzupassen, um zu finden, wonach Sie suchen.',
      searchPlaceholder: 'Sammlungen suchen...',
      sortUpdated: 'Kürzlich Aktualisiert',
      sortCreated: 'Kürzlich Erstellt',
      sortTitle: 'Titel A-Z',
      title: 'Sammlungstitel',
      titlePlaceholder: 'z.B. Mathematik, Spanisches Vokabular, Geschichtsfakten',
      description: 'Beschreibung',
      descriptionPlaceholder: 'Kurze Beschreibung dieser Sammlung...',
      optional: '(optional)',
      colorTheme: 'Farbthema',
      colorThemeDescription: 'Wählen Sie ein Farbthema für Ihre Sammlung',
      created: 'Sammlung erstellt!',
      createdDescription: '{{title}} wurde erfolgreich erstellt.',
      updated: 'Sammlung aktualisiert!',
      updatedDescription: '{{title}} wurde erfolgreich aktualisiert.',
      deleted: 'Sammlung gelöscht!',
      deletedDescription: '{{title}} wurde gelöscht.',
      deleteConfirm: 'Sind Sie sicher, dass Sie {{title}} löschen möchten? Dies wird auch alle {{count}} Karten löschen, die sie enthält.',
    },
    cards: {
      searchPlaceholder: 'Karten suchen...',
      empty: 'Noch keine Karten',
      emptyDescription: 'Fügen Sie Ihre erste Karteikarte manuell hinzu oder generieren Sie sie mit KI.',
      noResults: 'Keine Karten gefunden',
      noResultsDescription: 'Versuchen Sie, Ihre Suchbegriffe anzupassen, um zu finden, wonach Sie suchen.',
      addManually: 'Manuell Hinzufügen',
      generateWithAI: 'Mit KI Generieren',
      question: 'Frage',
      answer: 'Antwort',
      successRate: 'Erfolgsrate',
      attempts: 'Versuche',
      addNewCard: 'Neue Karte Hinzufügen',
      editCard: 'Karte Bearbeiten',
      addNewCardDescription: 'Erstellen Sie eine neue Karteikarte, indem Sie eine Frage und ihre Antwort hinzufügen.',
      editCardDescription: 'Aktualisieren Sie die Frage und Antwort für diese Karteikarte.',
      questionPlaceholder: 'Geben Sie hier Ihre Frage ein...',
      answerPlaceholder: 'Geben Sie hier die richtige Antwort ein...',
      addCard: 'Hinzufügen',
      updateCard: 'Aktualisieren',
      added: 'Karte erfolgreich hinzugefügt!',
      addedDescription: 'Ihre neue Karteikarte wurde zur Sammlung hinzugefügt.',
      updated: 'Karte erfolgreich aktualisiert!',
      updatedDescription: 'Ihre Karteikarte wurde aktualisiert.',
      deleted: 'Karte erfolgreich gelöscht!',
      deletedDescription: 'Die Karteikarte wurde aus Ihrer Sammlung entfernt.',
      deleteConfirm: 'Sind Sie sicher, dass Sie diese Karte löschen möchten?',
    },
    ai: {
      title: 'KI-Fragengenerator',
      description: 'Generieren Sie Karteikarten automatisch mit ChatGPT',
      form: {
        prompt: 'Fragenthema/Prompt',
        promptPlaceholder: 'z.B. Grundlegende Algebra-Gleichungen, Französisches Vokabular für Anfänger, Schlüsselereignisse des 2. Weltkriegs...',
        count: 'Anzahl der Fragen',
        questionCount: '{{count}} Fragen',
      },
      apiKey: {
        required: 'OpenAI API-Schlüssel Erforderlich',
        description: 'Um die KI-Fragengenerierung zu verwenden, fügen Sie bitte Ihren OpenAI API-Schlüssel zur Umgebungsvariable hinzu',
      },
      tips: {
        title: 'Tipps für bessere Ergebnisse:',
        specific: 'Seien Sie spezifisch über das Thema und den Schwierigkeitsgrad',
        context: 'Fügen Sie Kontext hinzu wie "für Anfänger" oder "fortgeschrittenes Niveau"',
        format: 'Erwähnen Sie das Format, das Sie bevorzugen (Multiple Choice, kurze Antwort, etc.)',
      },
      generate: 'Mit ChatGPT Generieren',
      generating: 'Generiere {{count}} Fragen...',
      success: {
        generated: 'Fragen erfolgreich generiert!',
        generatedDescription: '{{count}} Fragen mit KI generiert.',
      },
      errors: {
        noPrompt: 'Bitte geben Sie einen Prompt ein',
        noPromptDescription: 'Beschreiben Sie, welche Art von Fragen Sie generieren möchten.',
        noApiKey: 'OpenAI API-Schlüssel erforderlich',
        noApiKeyDescription: 'Bitte konfigurieren Sie Ihren OpenAI API-Schlüssel, um diese Funktion zu verwenden.',
        failed: 'Fehler beim Generieren der Fragen',
        tryAgain: 'Bitte versuchen Sie es erneut.',
      },
    },
    practice: {
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
    },
    notFound: {
      title: 'Seite nicht gefunden',
      description: 'Die Seite, die Sie suchen, existiert nicht.',
      goHome: 'Zur Startseite',
      goBack: 'Zurück',
    },
    language: {
      language: 'Sprache',
      french: 'Französisch',
      english: 'Englisch',
      spanish: 'Spanisch',
      german: 'Deutsch',
    },
    toast: {
      sessionCompleted: 'Übungssitzung abgeschlossen!',
      sessionCompletedDescription: 'Sie haben',
      noCardsAvailable: 'Keine Karten verfügbar',
      noCardsAvailableDescription: 'Fügen Sie einige Karten zu dieser Sammlung hinzu, bevor Sie üben.',
      loadingFlashcards: 'Lade Ihre Karteikarten...',
    },
  },
};

// Simple interpolation function
function interpolate(template: string, values: Record<string, any>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return values[key] !== undefined ? String(values[key]) : match;
  });
}

// Function to get nested translation value
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

interface LanguageContextType {
  t: (key: string, values?: Record<string, any>) => string;
  language: Language;
  changeLanguage: (newLanguage: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  initialLanguage 
}: { 
  children: React.ReactNode;
  initialLanguage: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('flashstudy-language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('flashstudy-language', newLanguage);
    
    // Update URL to reflect language change
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    
    // Replace the language segment (first segment after /)
    if (pathSegments[1] && ['fr', 'en', 'es', 'de'].includes(pathSegments[1])) {
      pathSegments[1] = newLanguage;
      const newPath = pathSegments.join('/');
      window.history.pushState({}, '', newPath);
    }
  };

  const t = (key: string, values?: Record<string, any>): string => {
    const translation = getNestedValue(translations[language], key);
    return values ? interpolate(translation, values) : translation;
  };

  return (
    <LanguageContext.Provider value={{
      t,
      language,
      changeLanguage,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}