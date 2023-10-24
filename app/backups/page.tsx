'use client';

import styles from './styles.module.css';
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import PageTemplate from "../components/PageTemplate";
import { ReactNode, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { initialState } from "./BackupsPageState";
import Card from "../components/Card";
import { BackupsPageDataService } from './BackupsPageDataService';
import { BackupsPageData } from './BackupsPageData';
import { DatabaseBackup } from '../models/DatabaseBackup';
import DatabaseLogo from '../components/DatabaseLogo';
import { countTables } from '../models/DatabaseDetails';

const dataService: BackupsPageDataService = new BackupsPageDataService();

export default function Backups(): JSX.Element {

  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const [state, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      dispatch({ type: 'set_data', value: await dataService.getPageData(searchParams.get('id')!) })
    } catch (e) {
      dispatch({ type: 'set_error', value: e as Error });
    }
  }

  const body = (): ReactNode => {
    if (state.loading) {
      return <></>
    }
    if (state.error) {
      return <h1>Error inesperado...</h1>
    }
    return (
      <Content model={state.data!} />
    );
  }

  return (
    <PageTemplate loading={state.loading}>
      {body()}
    </PageTemplate>
  );
}

const Content = ({ model }: { model: BackupsPageData }): ReactNode => {
  return (
    <div>
      <Header />
      <Card className={styles.details}>
        <DatabaseLogo model={model} />
        <div className={styles.detailsText}>
          <h4>Identificador</h4>
          <p>{model.id}</p>

          <h4>Usuarios</h4>
          <p>{model.users.length}</p>

          <h4>Schemas</h4>
          <p>{model.schemas.length}</p>

          <h4>Tablas definidas por usuarios <br />(no incluye tablas del sistema)</h4>
          <p>{countTables(model)}</p>
        </div>
      </Card>
      <button className={styles.primaryAction}>
        Crear nuevo respaldo
      </button>
      <div className={styles.backupCards}>
        {
          model.backups!.map((each: DatabaseBackup) =>
            <BackupCard model={each} />
          )
        }
      </div>
    </div>
  );
}

const Header = (): ReactNode => {
  return (
    <Card >
      <h1 className={styles.pageTitle}>Respaldos de la Base de Datos</h1>
    </Card>
  );
}

const BackupCard = ({ model }: { model: DatabaseBackup }): ReactNode => {
  return (
    <Card className={styles.backupCard}>
      <p className={styles.backupCardTopText}>{formatDate(model.creationDate)}</p>
      <button className={styles.backupCardDownload}>
        Descargar respaldo
      </button>
    </Card>
  );
}

const formatDate = (date: Date): string => {
  let year = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(date);
  let month = new Intl.DateTimeFormat('es', { month: 'short' }).format(date);
  let day = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(date);
  let hour = new Intl.DateTimeFormat('es', { hour: '2-digit' }).format(date);
  let minute = new Intl.DateTimeFormat('es', { minute: '2-digit' }).format(date);
  let second = new Intl.DateTimeFormat('es', { second: '2-digit' }).format(date);
  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}