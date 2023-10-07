import { ReactNode } from "react";
import styles from "./ContentPage.module.scss"

interface ContentPageProps {
  children: ReactNode;
}

export default function ContentPage({children}: ContentPageProps) {
  return (
    <div className={styles.contentPageContainer}>
      {children}
    </div>
  )
}