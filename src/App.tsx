import React from 'react';
import Header from './components/layout/header/Header';
import CharactersPage from './pages/CharactersPage/CharatersPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharactersDetailsPage from './pages/CharactersDetailsPage/CharactersDetailsPage';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<CharactersPage />}/>
          <Route path="/:id" element={<CharactersDetailsPage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
