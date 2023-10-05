import React from 'react';
import Header from './components/layout/header/Header';
import CharactersPage from './pages/CharatersPage';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <CharactersPage />
    </div>
  );
}

export default App;
