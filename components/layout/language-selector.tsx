'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useTranslation, Language } from '@/lib/i18n';

const languageFlags: Record<Language, string> = {
  fr: '🇫🇷',
  en: '🇺🇸',
  es: '🇪🇸',
  de: '🇩🇪',
};

export function LanguageSelector() {
  const { t, language, changeLanguage } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="text-lg">{languageFlags[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('fr')}>
          <span className="mr-2">🇫🇷</span>
          {t.french}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          <span className="mr-2">🇺🇸</span>
          {t.english}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('es')}>
          <span className="mr-2">🇪🇸</span>
          {t.spanish}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('de')}>
          <span className="mr-2">🇩🇪</span>
          {t.german}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}