import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Locale } from '@/i18n.config';
import { LanguageProvider } from '@/lib/language-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Flashstudy - Smart Flashcard Learning',
  description:
    'Create, organize, and practice with intelligent flashcards that adapt to your learning progress.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="flashstudy-theme">
          <LanguageProvider initialLanguage={lang}>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}