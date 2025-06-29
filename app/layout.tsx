import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Flashstudy - Smart Flashcard Learning',
  description:
    'Create, organize, and practice with intelligent flashcards that adapt to your learning progress.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="flashstudy-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
