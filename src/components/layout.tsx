import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";
import { BookOpen } from "lucide-react";

export function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="flashcard-theme">
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-lg">FlashLearn</span>
            </div>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-1">
          <Outlet />
        </main>
        
        <footer className="border-t py-6">
          <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
            <p>FlashLearn - Create and study flashcards to improve your learning</p>
          </div>
        </footer>
      </div>
      
      <Toaster />
    </ThemeProvider>
  );
}