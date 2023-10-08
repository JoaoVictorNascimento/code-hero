import styles from './CharactersTable.module.scss'
import CharacterItem from "./characterItem/CharacterItem";
import { CharacterType } from "../../types/CharacterItem";
import InputSearch from "../inputSearch/InputSearch";
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import { Thumbnail } from '../../types/Thumbnail';
import Result from '../result/Result';

interface CharactersTableProps {
  characters?: CharacterType[],
  onSearchedValue: React.Dispatch<React.SetStateAction<string>>
  loading: boolean;
  isEmptySearched: boolean;
}

export default function CharactersTable({
  characters,
  onSearchedValue,
  loading,
  isEmptySearched
}: CharactersTableProps) {
  const navigate = useNavigate();

  const navigateToCharactersDetails = (
    id: number, 
    name: string, 
    thumbnail: Thumbnail
  ) => {
    navigate(`/${id}`, { state: { characterName: name, thumbnail } })
  };

  const renderTable = () => {
    if (loading) {
      return (
        <Loader />
      );
    };

    if(isEmptySearched) {
      return (
        <Result
          title="Busca não realizada"
          subTitle="Não foi possível encontrar personagens relacionado a pesquisa!"
          typeResult="warning"
        />
      )
    }

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