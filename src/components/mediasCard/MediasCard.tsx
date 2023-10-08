import styles from './MediasCard.module.scss';
interface MediasCardProps {
  imageUrl: string;
  footerText: string;
  altImage: string;
  key: string
}

export default function MediasCard({ imageUrl, footerText, altImage, key }: MediasCardProps) {
  return(
    <div 
      key={key} 
      className={styles.card} 
      data-testid="media-card"
    >
      <div className={styles.cardContent}>
        <img src={imageUrl} alt={altImage} />
      </div>
      <div className={styles.cardFooter}>
        <p>{footerText}</p>
      </div>
    </div>
  );
};