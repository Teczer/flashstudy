'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/language-context';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-200 rounded-full mb-6">
            <span className="text-3xl font-bold text-slate-600">404</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {t('notFound.title')}
          </h1>
          <p className="text-slate-600 mb-8">
            {t('notFound.description')}
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            {t('notFound.goHome')}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 w-full bg-white text-slate-700 px-6 py-3 rounded-lg font-medium border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('notFound.goBack')}
          </button>
        </div>
      </div>
    </div>
  );
}