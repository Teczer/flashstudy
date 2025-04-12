import { Layout } from '@/components/layout';
import { DeckEditPage } from '@/pages/deck-edit';
import { HomePage } from '@/pages/home';
import { StudyPage } from '@/pages/study';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
