import styles from './styles.module.css';
import { ReactNode } from "react";

type Props = {
  className?: string,
  children: ReactNode,
}

export const Card = ({ className, children }: Props): ReactNode => {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
}