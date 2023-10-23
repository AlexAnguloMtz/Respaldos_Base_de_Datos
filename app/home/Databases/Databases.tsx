import { Database } from '@/app/models/Database';
import styles from './styles.module.css';
import { ReactNode } from 'react';
import DatabaseCard from '../DatabaseCard';

type Props = {
  models: Array<Database>
}

export const Databases = ({ models }: Props): ReactNode => {
  return (
    <div className={styles.databases}>
      {
        models.map((model: Database) => <DatabaseCard model={model} />)
      }
    </div>
  );
}