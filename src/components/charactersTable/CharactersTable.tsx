import Api from "../../services/api";

import styles from './CharactersTable.module.scss'
import CharacterItem from "./characterItem/CharacterItem";
import { CharacterType } from "../../types/CharacterItem";
import { useEffect, useState } from "react";
import InputSearch from "../inputSearch/InputSearch";

export default function CharactersTable() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacter, setFilteredCharacter] = useState("");


  useEffect(() => {
    Api.getCharacters()
      .then(response => setCharacters(response.data.results))
  }, [])

  console.log({ characters })

  return (
    <div className={styles.containerCharactersTable}>
      <InputSearch
        inputId="search-characters"
        label="Nome do personagem"
        onSearchedValue={setFilteredCharacter}
      />
      <table className={styles.charactersTable}>
        <thead>
          <tr>
            <th>Personagem</th>
            <th>Séries</th>
            <th>Eventos</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((item: CharacterType) => (
            <CharacterItem
              id={item.id}
              key={item.id}
              name={item.name}
              thumbnail={item.thumbnail}
              series={item.series}
              events={item.events}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}