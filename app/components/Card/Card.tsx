import styles from './styles.module.css';
import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

export const Card = ({ children }: Props): ReactNode => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
}