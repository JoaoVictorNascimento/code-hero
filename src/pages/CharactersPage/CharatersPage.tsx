import Title from "../../components/layout/title/Title";
import CharactersTable from '../../components/charactersTable/CharactersTable';
import styles from './CharactersPage.module.scss';
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { CharacterResponse } from "../../types/CharacterResponse";
import Api from "../../services/api";
import '../../theme/sizes.scss';
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { usePaginationContext } from "../../providers/PaginationProvider/PaginationProvider";

const ITEMS_PER_PAGE = 10;
const BUTTONS_PAGE_TO_SHOW_FULLSCREEN = 5;
const BUTTONS_PAGE_TO_SHOW_MOBILE = 3;

export default function CharactersPage() {
  const isMobile = useIsMobile();
  const [charactersResponse, setCharactersResponse] = useState<CharacterResponse>();
  const [filteredCharacter, setFilteredCharacter] = useState("");
  const { paginationState, setPaginationState } = usePaginationContext();

  useEffect(() => {
    if (paginationState.currentPage) {
      const offset = (paginationState.currentPage - 1) * ITEMS_PER_PAGE;

      Api.getCharacters(offset, filteredCharacter)
        .then(response => setCharactersResponse(response));
    }
  }, [
    paginationState.currentPage, 
    filteredCharacter, 
  ]);

  useEffect(() => {
    setPaginationState({ currentPage: 1 });
  }, [setPaginationState, filteredCharacter]);

  const buttonPagesToShow = isMobile ? BUTTONS_PAGE_TO_SHOW_MOBILE : BUTTONS_PAGE_TO_SHOW_FULLSCREEN;

  return (
    <>
      <div className={styles.charactersPage}>
        <Title text="Busca de personagens" />
        <CharactersTable 
          characters={charactersResponse?.data.results}
          onSearchedValue={setFilteredCharacter}
        />
      </div>
      <div className={styles.footerCharactersPage}>
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={charactersResponse?.data.total || 0}
          buttonPagesToShow={buttonPagesToShow}
        />
      </div>
    </>
  );
};