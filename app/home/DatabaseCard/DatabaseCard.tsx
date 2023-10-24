import styles from './styles.module.css';
import { DatabaseDetails } from '@/app/models/DatabaseDetails';
import { ReactNode } from 'react';
import DatabaseLogo from '@/app/components/DatabaseLogo';
import Card from '@/app/components/Card';
import DatabaseLabels from '../DatabaseLabels';
import Link from 'next/link';

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
      <Link className={styles.primaryAction} href={`/manage-database/?id=${model.id}`}>
        Gestionar Base de Datos
      </Link>
    </Card >
  );
}