import { CharacterType } from '../../../types/CharacterItem';
import styles from './CharacterItem.module.scss'

type CharacterProps = {
  onClickTableRow: (id: number, name: string) => void
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
    onClickTableRow(id, name);
  }

  return (
      <tr 
        className={styles.tableRow}
        onClick={onClickRow}
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
        </td>
        <td className={styles.characterDescriptions}>
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
        </td>
      </tr>
  );
};