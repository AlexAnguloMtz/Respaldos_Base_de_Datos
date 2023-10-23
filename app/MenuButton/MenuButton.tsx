import styles from './styles.module.css';
import { ReactNode } from "react";

type Props = {
  onClick: () => void
}

export const MenuButton = ({ onClick }: Props): ReactNode => {
  return (
    <button
      className={styles.menuButton}
      onClick={onClick}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </button>
  );
}