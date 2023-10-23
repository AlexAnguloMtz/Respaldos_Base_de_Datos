import { ReactNode } from 'react';
import styles from './styles.module.css';

export const ProgressIndicator = (): ReactNode => {
  return (
    <span className={styles.loader}></span>
  );
}