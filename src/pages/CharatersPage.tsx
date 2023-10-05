import { useState } from 'react'
import InputSearch from "../components/inputSearch/InputSearch";
import Title from "../components/layout/title/Title";
import CharactersTable from '../components/charactersTable/CharactersTable';

export default function CharactersPage() {
  const [filteredCharacter, setFilteredCharacter] = useState("");

  return (
    <>
      <Title text="Busca de personagens"/>
          <InputSearch
            inputId="search-characters"
            label="Nome do personagem"
            onSearchedValue={setFilteredCharacter}
          />
        <CharactersTable filteredCharacter={filteredCharacter}/>
    </>
  )
}