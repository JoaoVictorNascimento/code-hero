import { CharacterType } from '../../../types/CharacterItem';
import { Thumbnail } from '../../../types/Thumbnail';
import Tooltip from '../../tooltip/Tooltip/Tooltip';
import styles from './CharacterItem.module.scss'

type CharacterProps = {
  onClickTableRow: (id: number, name: string, thumbnail: Thumbnail) => void
}

type CharacterItemProps = CharacterType & CharacterProps;

export default function CharacterItem(
  {
    id,
    name,
    thumbnail,
    series,
    events,
    onClickTableRow
  }: CharacterItemProps) {

  const imgUrl = `${thumbnail.path}.${thumbnail.extension}`;

  const onClickRow = () => {
    onClickTableRow(id, name, thumbnail);
  }

  return (
      <tr 
        className={styles.tableRow}
        onClick={onClickRow}
        data-testid={`characterItem-${id}`}
      >
        <td>
          <div className={styles.columnCharacter}>
            <img
              className={styles.characterImage}
              src={imgUrl}
              alt={name}
              width={48}
              height={48}
            />
            <span className={styles.characterName}>
              <b>
                {name}
              </b>
            </span>
          </div>
        </td>
        <td className={styles.characterDescriptions}>
          <Tooltip className={styles.tooltipDescriptions}>
            <ul>
              {series.items.length >= 1 &&
                series.items
                  .slice(0, 3)
                  .map((serieInfo, index) => (
                    <li key={index}>{serieInfo.name}</li>
                  ))}

              {series.items.length <= 0 && (
                <li>Não possui séries</li>
              )}
            </ul>
          </Tooltip>
        </td>
        <td className={styles.characterDescriptions}>
        <Tooltip className={styles.tooltipDescriptions}>
          <ul>
            {events.items.length >= 1 &&
              events.items
                .slice(0, 3)
                .map((eventInfo, index) => (
                  <li key={index}>{eventInfo.name}</li>
                ))}

            {events.items.length <= 0 && (
              <li>Não possui eventos</li>
            )}
          </ul>
        </Tooltip>
        </td>
      </tr>
  );
};