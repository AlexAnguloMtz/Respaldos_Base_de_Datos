import styles from './styles.module.css';
import { DatabaseDetails } from '@/app/models/DatabaseDetails';
import { ReactNode } from 'react';
import DatabaseLogo from '@/app/components/DatabaseLogo';
import Card from '@/app/components/Card';
import DatabaseLabels from '../DatabaseLabels';

type Props = {
  model: DatabaseDetails,
}

export const DatabaseCard = ({ model }: Props): ReactNode => {
  return (
    <Card className={styles.databaseCard}>
      <div className={styles.upperRow}>
        <DatabaseLogo model={model} />
        <DatabaseLabels model={model} />
      </div>
      <a className={styles.primaryAction}>
        Gestionar Base de Datos
      </a>
    </Card >
  );
}