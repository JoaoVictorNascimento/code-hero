'use client'
import { Suspense, useState } from 'react'
import Title from '@/components/layout/title/Title';
import styles from './page.module.scss'
import CharactersTable from '@/components/charactersTable/CharactersTable';
import InputSearch from '@/components/inputSearch/InputSearch';

export default function Home() {
  const [filteredCharacter, setFilteredCharacter] = useState("");

  return (
    <main className={styles.main}>
      <Title text="Busca de personagens"/>
        <InputSearch
          inputId="search-characters"
          label="Nome do personagem"
          onSearchedValue={setFilteredCharacter}
        />
      <Suspense fallback={"Carregando..."}>
        <CharactersTable filteredCharacter={filteredCharacter}/>
      </Suspense>
    </main>
  );
};
