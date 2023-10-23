import styles from './styles.module.css';
import { Database } from '@/app/models/Database';
import { ReactNode } from 'react';
import DatabaseLogo from '@/app/components/DatabaseLogo';
import Card from '@/app/components/Card';
import { DatabaseDetails } from '../DatabaseDetails/DatabaseDetails';

type Props = {
  model: Database
}

export const DatabaseCard = ({ model }: Props): ReactNode => {
  return (
    <Card>
      <div className={styles.upperRow}>
        <DatabaseLogo model={model} />
        <DatabaseDetails model={model} />
      </div>
      <a className={styles.primaryAction}>
        Ver Respaldos
      </a>
    </Card>
  );
}