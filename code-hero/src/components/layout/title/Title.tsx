import styles from './Title.module.scss'

interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return (
    <p className={styles.title}>
      <b>
        {text}
      </b>
    </p>
  );
}

export default Title;