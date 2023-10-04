import Api from "@/services/api";

import styles from './CharactersTable.module.scss'
import CharacterItem from "./characterItem/CharacterItem";
import { CharacterType } from "@/types/CharacterItem";

export default async function CharactersTable() {
  const response = await fetch(Api.getUrlCharacters(), {
    next: {
      revalidate: 60,
    }
  });

  const fetchedData = await response.json();

  const { results } = fetchedData.data;

  return (
    <table className={styles.charactersTable}>
      <thead>
        <tr>
          <th>Personagem</th>
          <th>Séries</th>
          <th>Eventos</th>
        </tr>
      </thead>
      <tbody>
        {results.map((item: CharacterType) => (
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
  );
}