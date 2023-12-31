import { useEffect, useState } from "react";
import Title from "../../components/layout/title/Title";
import CharactersTable from '../../components/charactersTable/CharactersTable';
import styles from './CharactersPage.module.scss';
import Pagination from "../../components/pagination/Pagination";
import { CharacterResponse } from "../../types/CharacterResponse";
import Api from "../../services/api";
import useIsCurrentScreenWidth from "../../hooks/useIsCurrentScreenWidth/useIsCurrentScreenWidth";
import { usePaginationContext } from "../../providers/PaginationProvider/PaginationProvider";
import useDebounce from "../../hooks/useDebounce/useDebounce";
import ContentPage from "../../components/contentPage/ContentPage";
import Result from "../../components/result/Result";

const ITEMS_PER_PAGE = 10;
const BUTTONS_PAGE_TO_SHOW_FULLSCREEN = 5;
const BUTTONS_PAGE_TO_SHOW_MOBILE = 3;
const DELAY = 800;
const MOBILE_WIDTH = 600;

export default function CharactersPage() {
  const [charactersResponse, setCharactersResponse] = useState<CharacterResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [filteredCharacter, setFilteredCharacter] = useState<string>("");
  const debouncedSearchCharater = useDebounce(filteredCharacter, DELAY);
  const { paginationState, setPaginationState } = usePaginationContext();
  const isCurrentScreenWidth = useIsCurrentScreenWidth(MOBILE_WIDTH);

  useEffect(() => {
    if (paginationState.currentPage) {
      const offset = (paginationState.currentPage - 1) * ITEMS_PER_PAGE;

      setLoading(true);
      setHasError(false);
      Api.getCharacters(offset, debouncedSearchCharater)
        .then(response => {
          setCharactersResponse(response);
        })
        .catch(error => {
          console.warn(error);
          setHasError(true);
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [paginationState.currentPage, debouncedSearchCharater]);

  useEffect(() => {
    setPaginationState({ currentPage: 1 });
  }, [setPaginationState, debouncedSearchCharater]);

  const buttonPagesToShow = isCurrentScreenWidth ? BUTTONS_PAGE_TO_SHOW_MOBILE : BUTTONS_PAGE_TO_SHOW_FULLSCREEN;
  const isEmptySearched = Boolean(charactersResponse && charactersResponse?.data?.results.length === 0);

  const renderTable = () => {
    if (hasError) {
      return (
        <Result
          title="Erro Inesperado"
          subTitle="Não foi possível realizar a busca tente novamente mais tarde!"
          typeResult="error"
        />
      );
    };

    return (
      <CharactersTable
        characters={charactersResponse?.data.results}
        onSearchedValue={setFilteredCharacter}
        loading={loading}
        isEmptySearched={isEmptySearched}
      />
    );
  };

  return (
    <>
      <ContentPage>
        <Title text="Busca de personagens" />
        {renderTable()}
      </ContentPage>
      <div className={`${styles.footerCharactersPage} ${(hasError || isEmptySearched) ? styles.hiddingFooter : ''}`}>
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={charactersResponse?.data.total || 0}
          buttonPagesToShow={buttonPagesToShow}
        />
      </div>
    </>
  );
};