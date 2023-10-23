import styles from './styles.module.css';
import { ReactNode } from 'react';

type Props = {
  name: string,
  value: string
}

export const DatabaseDetail = ({ name, value }: Props): ReactNode => {
  return (
    <li className={styles.databaseDetail}>
      <h4 className={styles.name}>
        {name}:
      </h4>
      <p className={styles.value}>
        {value}
      </p>
    </li>
  );
}