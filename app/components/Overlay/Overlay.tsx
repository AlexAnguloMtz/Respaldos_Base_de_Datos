import { ReactNode } from 'react';
import styles from './styles.module.css';

type Props = {
  active: boolean,
  onClick?: () => void,
  className?: string,
  children: ReactNode
}

export const Overlay = ({ active, onClick, className, children }: Props): ReactNode => {
  return (
    <div
      className={`${styles.overlay} ${active ? styles.active : ''} ${className}`}
      onClick={onClick}>
      {children}
    </div>
  );
}