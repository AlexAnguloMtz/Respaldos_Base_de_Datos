import styles from './styles.module.css';
import { CSSProperties, ReactNode } from "react";

type Props = {
  className?: string,
  onClick?: () => void,
  style?: CSSProperties,
  children: ReactNode,
}

export const Card = ({ className, onClick, style, children }: Props): ReactNode => {
  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${className}`}
      style={style}>
      {children}
    </div>
  );
}