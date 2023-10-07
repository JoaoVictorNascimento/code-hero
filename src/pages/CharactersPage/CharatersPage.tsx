import Title from "../../components/layout/title/Title";
import CharactersTable from '../../components/charactersTable/CharactersTable';
import styles from './CharactersPage.module.scss';
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { CharacterResponse } from "../../types/CharacterResponse";
import Api from "../../services/api";
import '../../theme/sizes.scss';
import useIsCurrentScreenWidth from "../../hooks/useIsCurrentScreenWidth/useIsCurrentScreenWidth";
import { usePaginationContext } from "../../providers/PaginationProvider/PaginationProvider";
import useDebounce from "../../hooks/useDebounce/useDebounce";

const ITEMS_PER_PAGE = 10;
const BUTTONS_PAGE_TO_SHOW_FULLSCREEN = 5;
const BUTTONS_PAGE_TO_SHOW_MOBILE = 3;
const DELAY = 800;
const MOBILE_WIDTH = 600;

export default function CharactersPage() {
  const isCurrentScreenWidth = useIsCurrentScreenWidth(MOBILE_WIDTH);
  const [charactersResponse, setCharactersResponse] = useState<CharacterResponse>();
  const [filteredCharacter, setFilteredCharacter] = useState("");
  const { paginationState, setPaginationState } = usePaginationContext();
  const debouncedSearchCharater = useDebounce(filteredCharacter, DELAY);

  useEffect(() => {
    if (paginationState.currentPage) {
      const offset = (paginationState.currentPage - 1) * ITEMS_PER_PAGE;

      Api.getCharacters(offset, debouncedSearchCharater)
        .then(response => setCharactersResponse(response));
    }
  }, [
    paginationState.currentPage, 
    debouncedSearchCharater, 
  ]);

  useEffect(() => {
    setPaginationState({ currentPage: 1 });
  }, [setPaginationState, debouncedSearchCharater]);

  const buttonPagesToShow = isCurrentScreenWidth ? BUTTONS_PAGE_TO_SHOW_MOBILE : BUTTONS_PAGE_TO_SHOW_FULLSCREEN;

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