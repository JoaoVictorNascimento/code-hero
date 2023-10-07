import styles from './CharactersTable.module.scss'
import CharacterItem from "./characterItem/CharacterItem";
import { CharacterType } from "../../types/CharacterItem";
import InputSearch from "../inputSearch/InputSearch";

interface CharactersTableProps {
  characters?: CharacterType[],
  onSearchedValue: React.Dispatch<React.SetStateAction<string>>
}

export default function CharactersTable({
  characters,
  onSearchedValue
}: CharactersTableProps) {

  return (
    <div className={styles.containerCharactersTable}>
      <InputSearch
        inputId="search-characters"
        label="Nome do personagem"
        onSearchedValue={onSearchedValue}
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
            {characters && characters.map((item: CharacterType) => (
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