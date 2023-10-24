import { DatabaseDetails } from '@/app/models/DatabaseDetails';
import styles from './styles.module.css';
import { ReactNode } from 'react';
import DatabaseCard from '../DatabaseCard';

type Props = {
  models: Array<DatabaseDetails>
}

export const Databases = ({ models }: Props): ReactNode => {
  return (
    <div className={styles.databases}>
      {
        models.map((model: DatabaseDetails, index: number) => <DatabaseCard model={model} />)
      }
    </div>
  );
}