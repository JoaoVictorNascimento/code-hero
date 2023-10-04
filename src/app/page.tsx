import { Suspense } from 'react'
import Title from '@/components/layout/title/Title';
import styles from './page.module.scss'
import CharactersTable from '@/components/charactersTable/CharactersTable';

export default function Home() {

  return (
    <main className={styles.main}>
      <Title text="Busca de personagens"/>
      <Suspense fallback={"Carregando..."}>
        <CharactersTable />
      </Suspense>
    </main>
  );
}
