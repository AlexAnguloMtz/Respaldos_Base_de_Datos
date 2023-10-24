import styles from './styles.module.css';
import { DatabaseDetails, countTables } from '@/app/models/DatabaseDetails';
import { ReactNode } from 'react';
import DatabaseDetail from '../DatabaseDetail';

type Props = {
  model: DatabaseDetails
}

export const DatabaseLabels = ({ model }: Props): ReactNode => {
  return (
    <ul className={styles.databaseDetails}>
      <DatabaseDetail name='Gestor' value={model.dbms} />
      <DatabaseDetail name='Versión' value={model.version} />
      <DatabaseDetail name='Usuarios' value={String(model.users.length)} />
      <DatabaseDetail name='Schemas' value={String(model.schemas.length)} />
      <DatabaseDetail name='Tablas' value={String(countTables(model))} />
    </ul>
  );
}