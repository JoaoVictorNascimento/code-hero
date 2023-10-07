import { useLocation, useParams } from "react-router-dom";
import Title from "../../components/layout/title/Title";
import styles from './CharactersDetailsPage.module.scss';
import ContentPage from "../../components/contentPage/ContentPage";
import Api from "../../services/api";
import { useEffect, useState } from "react";
import useIsCurrentScreenWidth from "../../hooks/useIsCurrentScreenWidth/useIsCurrentScreenWidth";
import { CharacterDetailsResponse } from "../../types/CharacterDetailsResponse";
import ResultError from "../../components/resultError/ResultError";
import Loader from "../../components/loader/Loader";
import { Thumbnail } from "../../types/Thumbnail";

const MOBILE_WIDTH = 600;

export default function CharactersDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [commics, setCommics] = useState<CharacterDetailsResponse>();
  const [series, setSeries] = useState<CharacterDetailsResponse>();
  const [events, setEvents] = useState<CharacterDetailsResponse>();
  const characterName = location.state.characterName as string;
  const thumbnail = location.state.thumbnail as Thumbnail;
  const isCurrentScreenWidth = useIsCurrentScreenWidth(MOBILE_WIDTH);

  useEffect(() => {
    const fetchMediasCharacter = async () => {
      if(id) {
        try{
          setLoading(true);
          setHasError(false);

          const [commicsData, seriesData, eventsData] = await Promise.all([
            Api.getCommicsByCharacterId(Number(id)),
            Api.getSeriesByCharacterId(Number(id)),
            Api.getEventsByCharacterId(Number(id)),
          ]);

          setCommics(commicsData);
          setSeries(seriesData);
          setEvents(eventsData)
        } catch (error) {
          console.warn(error);
          setHasError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMediasCharacter();
  }, [id]);

  console.log({ commics, series })

  const renderContent = () => {
    if (loading) {
      return (
        <Loader />
      );
    }

    if (hasError) {
      return (
        <ResultError
          title="Erro Inesperado"
          subTitle="Não foi possível realizar a busca tente novamente mais tarde!"
        />
      );
    };

    const imgUrl = `${thumbnail?.path}.${thumbnail?.extension}`;

    return (
      <div className={styles.charactersDetailsPage}>
        <div className={styles.charactersInfoSection}>
            <img
              className={styles.characterImage}
              src={imgUrl}
              alt={characterName}
              width={400}
              height={400}
            />
            <div className={styles.firstCommicDescription}>
              <h2>Primeiro Quadrinho</h2>
              <p>
                {commics?.data.results[0].description}
              </p>
            </div>
        </div>
        <div>
          <h3>
            Commics
          </h3>
        </div>
        <div>
          <h3>
            Series
          </h3>
        </div>

      </div>
    );
  }

  return (
    <ContentPage>
       <Title text={`${characterName}`} />
        {renderContent()}
    </ContentPage>
  )
}