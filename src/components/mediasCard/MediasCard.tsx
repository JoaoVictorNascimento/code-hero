import styles from './MediasCard.module.scss';
interface MediasCardProps {
  imageUrl: string;
  footerText: string;
  altImage: string;
  key: string
}

export default function MediasCard({ imageUrl, footerText, altImage, key }: MediasCardProps) {
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