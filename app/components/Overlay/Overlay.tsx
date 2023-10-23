import { ReactNode } from 'react';
import styles from './styles.module.css';

type Props = {
  active: boolean,
  onClick: () => void,
  children: ReactNode
}

export const Overlay = ({ active, onClick, children }: Props): ReactNode => {
  return (
    <div
      className={`${styles.overlay} ${active ? styles.active : ''}`}
      onClick={onClick}>
      {children}
    </div>
  );
}