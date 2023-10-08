import errorImage from '../../assets/error-icon.png';
import warningImage from '../../assets/warning-icon.png';
import styles from './Result.module.scss';

interface ResultProps {
  title: string;
  subTitle: string;
  typeResult: 'error' | 'warning';
}

export default function Result({ title, subTitle, typeResult }: ResultProps) {
  const imageSrc = {
    'error': errorImage,
    'warning': warningImage,
  };

  return (
    <div 
      className={styles.resultErrorContainer}
      data-testid="result"
    >
      <img
				src={imageSrc[typeResult]}
				alt="result"
				width={100}
				height={100}
        data-testid={`result-${typeResult}`}
			/>
      <span className={styles.title}>{title}</span>
      <span className={styles.subTitle}>{subTitle}</span>
    </div>
  );
};