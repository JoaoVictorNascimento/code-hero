import Title from '@/components/layout/title/Title';
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <Title text="Busca de personagens"/>
    </main>
  );
}
