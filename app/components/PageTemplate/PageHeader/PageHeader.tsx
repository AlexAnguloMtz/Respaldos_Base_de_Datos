import { ReactNode } from 'react';
import styles from './styles.module.css';
import Card from '../../Card';

type Props = {
  text: string
}

export const PageHeader = ({ text }: Props): ReactNode => {
  return (
    <Card >
      <h1 className={styles.pageTitle}>{text}</h1>
    </Card>
  );
}