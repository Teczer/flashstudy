import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { HomePage } from '@/pages/home';
import { DeckEditPage } from '@/pages/deck-edit';
import { StudyPage } from '@/pages/study';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="deck/:deckId" element={<DeckEditPage />} />
          <Route path="study/:deckId" element={<StudyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;