import errorImage from '../../assets/error-icon.png';
import styles from './ResultError.module.scss';

interface ResultErrorProps {
  title: string;
  subTitle: string;
}

export default function ResultError({ title, subTitle }: ResultErrorProps) {
  return (
    <div className={styles.resultErrorContainer}>
      <img
				src={errorImage}
				alt="result error"
				width={100}
				height={100}
			/>
      <span className={styles.title}>{title}</span>
      <span className={styles.subTitle}>{subTitle}</span>
    </div>
  )
}