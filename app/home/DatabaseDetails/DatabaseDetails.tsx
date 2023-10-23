import styles from './styles.module.css';
import { Database } from '@/app/models/Database';
import { ReactNode } from 'react';
import DatabaseDetail from '../DatabaseDetail';

type Props = {
  model: Database
}

export const DatabaseDetails = ({ model }: Props): ReactNode => {
  return (
    <ul className={styles.databaseDetails}>
      <DatabaseDetail name='Gestor' value={model.dbms} />
      <DatabaseDetail name='Versión' value={String(model.version)} />
      <DatabaseDetail name='Usuarios' value={String(model.users)} />
      <DatabaseDetail name='Tablas' value={String(model.tables)} />
    </ul>
  );
}