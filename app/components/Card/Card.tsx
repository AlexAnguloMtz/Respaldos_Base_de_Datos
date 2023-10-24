import styles from './styles.module.css';
import { CSSProperties, ReactNode } from "react";

type Props = {
  className?: string,
  style?: CSSProperties,
  children: ReactNode,
}

export const Card = ({ className, style, children }: Props): ReactNode => {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={style}>
      {children}
    </div>
  );
}