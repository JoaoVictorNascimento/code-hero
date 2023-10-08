import { useLocation, useParams } from "react-router-dom";
import Title from "../../components/layout/title/Title";
import styles from './CharactersDetailsPage.module.scss';
import ContentPage from "../../components/contentPage/ContentPage";
import Api from "../../services/api";
import { useEffect, useState } from "react";
import Result from "../../components/result/Result";
import Loader from "../../components/loader/Loader";
import { Thumbnail } from "../../types/Thumbnail";
import MediasCard from "../../components/mediasCard/MediasCard";
import { CharacterComicsResponse } from "../../types/CharacterComicsResponse";
import { CharacterSeriesResponse } from "../../types/CharacterSeriesResponse";
import { CharacterEventsResponse } from "../../types/CharacterEventsResponse";

export default function CharactersDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [comics, setComics] = useState<CharacterComicsResponse>();
  const [series, setSeries] = useState<CharacterSeriesResponse>();
  const [events, setEvents] = useState<CharacterEventsResponse>();
  const characterName = location.state.characterName as string;
  const thumbnail = location.state.thumbnail as Thumbnail;

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

          setComics(commicsData);
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

  const renderMedias = (medias?: CharacterComicsResponse | CharacterSeriesResponse | CharacterEventsResponse)  => {
    if (medias) {
      const mediasItems = medias?.data.results;

      if(!mediasItems.length) {
        return (
          <div className={styles.notInformationAvailable}>
            Não possui informações disponíveis
          </div>
        )
      }

      return mediasItems.map(media => {
        const { thumbnail, title, id } = media;
        const imgUrl = `${thumbnail?.path}.${thumbnail?.extension}`;

        return (
          <div className={styles.mediaItem} key={id}>
            <MediasCard
              imageUrl={imgUrl}
              footerText={title}
              altImage={title}
              key={`${id}`}
            />
          </div>
        );
      });
    }
  }
  
  const renderContent = () => {
    if (loading) {
      return (
        <Loader />
      );
    }

    if (hasError) {
      return (
        <Result
          title="Erro Inesperado"
          subTitle="Não foi possível realizar a busca tente novamente mais tarde!"
          typeResult="error"
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
            />
            <div className={styles.firstCommicDescription}>
              {comics?.data?.results[0]?.description ? (
                <>
                  <h2>Primeiro Quadrinho</h2>
                  <p>
                    {comics?.data?.results[0]?.description}
                  </p>
                </>
              ) : null}
            </div>
        </div>
        <div className={styles.section}>
          <h2>
            Quadrinhos
          </h2>
          <div className={styles.mediaList}>
            {renderMedias(comics)}
          </div>
        </div>
        <div className={styles.section}>
          <h2>
            Séries
          </h2>
          <div className={styles.mediaList}>
            {renderMedias(series)}
          </div>
        </div>
        <div className={styles.section}>
          <h2>
            Eventos
          </h2>
          <div className={styles.mediaList}>
            {renderMedias(events)}
          </div>
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