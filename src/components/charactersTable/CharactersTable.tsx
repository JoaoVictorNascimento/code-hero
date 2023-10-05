import Api from "../../services/api";

import styles from './CharactersTable.module.scss'
import CharacterItem from "./characterItem/CharacterItem";
import { CharacterType } from "../../types/CharacterItem";
import { useEffect, useState } from "react";
import InputSearch from "../inputSearch/InputSearch";
import Pagination from "../pagination/Pagination";
import { CharacterResponse } from "../../types/CharacterResponse";

export default function CharactersTable() {
  const [charactersResponse, setCharactersResponse] = useState<CharacterResponse>();
  const [filteredCharacter, setFilteredCharacter] = useState("");


  useEffect(() => {
    Api.getCharacters()
      .then(response => setCharactersResponse(response))
  }, [])

  console.log(charactersResponse?.data)


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
          {charactersResponse?.data.results.map((item: CharacterType) => (
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
      {/* <Pagination
        currentPage={charactersResponse?.data.offset || 0}
        totalPages={charactersResponse?.data.total || 0}
        onPageChange={() => console.log('oi')}
      /> */}
    </div>
  );
}