import styles from './CharactersTable.module.scss'
import CharacterItem from "./characterItem/CharacterItem";
import { CharacterType } from "../../types/CharacterItem";
import InputSearch from "../inputSearch/InputSearch";
import { useState } from 'react';

interface CharactersTableProps  {
  characters?: CharacterType[]
}

export default function CharactersTable({
  characters,
}: CharactersTableProps) {
  const [filteredCharacter, setFilteredCharacter] = useState("");

  if(!characters) {
    return (
      <div>
        oi
      </div>
    )
  }

  return (
    <div className={styles.containerCharactersTable}>
      <InputSearch
        inputId="search-characters"
        label="Nome do personagem"
        onSearchedValue={setFilteredCharacter}
      />
      <div className={styles.teste}>
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
    </div>
  );
}