import Title from "../components/layout/title/Title";
import CharactersTable from '../components/charactersTable/CharactersTable';
import styles from './CharactersPage.module.scss';

export default function CharactersPage() {
 
  return (
    <div className={styles.charactersPage}>
      <Title text="Busca de personagens"/>
      <CharactersTable />
    </div>
  );
};