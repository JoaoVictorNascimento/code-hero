import styles from './CharactersTable.module.scss'
import CharacterItem from "./characterItem/CharacterItem";
import { CharacterType } from "../../types/CharacterItem";
import InputSearch from "../inputSearch/InputSearch";
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';

interface CharactersTableProps {
  characters?: CharacterType[],
  onSearchedValue: React.Dispatch<React.SetStateAction<string>>
  loading: boolean;
}

export default function CharactersTable({
  characters,
  onSearchedValue,
  loading,
}: CharactersTableProps) {
  const navigate = useNavigate();

  const navigateToCharactersDetails = (id: number, name: string) => {
    navigate(`/${id}`, { state: { characterName: name } })
  };

  const renderTable = () => {
    if (loading) {
      return (
        <Loader />
      );
    };

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
          {characters && characters.map((item: CharacterType) => (
            <CharacterItem
              id={item.id}
              key={item.id}
              name={item.name}
              thumbnail={item.thumbnail}
              series={item.series}
              events={item.events}
              onClickTableRow={navigateToCharactersDetails}
            />
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.containerCharactersTable}>
      <InputSearch
        inputId="search-characters"
        label="Nome do personagem"
        onSearchedValue={onSearchedValue}
      />
      {renderTable()}
    </div>
  );
}