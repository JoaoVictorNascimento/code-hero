import styles from './MidiasCard.module.scss';
interface MidiasCardProps {
  imageUrl: string;
  footerText: string;
  altImage: string;
  key: string
}

export default function MidiasCard({ imageUrl, footerText, altImage, key }: MidiasCardProps) {
  return(
    <div className={styles.card} key={key}>
      <div className={styles.cardContent}>
        <img src={imageUrl} alt={altImage} />
      </div>
      <div className={styles.cardFooter}>
        <p>{footerText}</p>
      </div>
    </div>
  )
}