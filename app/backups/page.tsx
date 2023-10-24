'use client';

import styles from './styles.module.css';
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import PageTemplate from "../components/PageTemplate";
import { ReactNode, useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import { initialState } from "./BackupsPageState";
import Card from "../components/Card";
import { BackupsPageDataService } from './BackupsPageDataService';
import { DatabaseBackup } from '../models/DatabaseBackup';
import DatabaseLogo from '../components/DatabaseLogo';
import { DatabaseDetails, countTables } from '../models/DatabaseDetails';
import Image from 'next/image';
import diskette from '../../public/images/diskette.svg';
import { Modal } from '../components/Modal/Modal';

const dataService: BackupsPageDataService = new BackupsPageDataService();

export default function Backups(): JSX.Element {

  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const [state, dispatch] = useReducer(reducer, initialState());

  const [notifySuccess, setNotifySuccess] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (state.creatingBackup) {
      createBackup();
    }
  }, [state.creatingBackup]);

  const fetchData = async (): Promise<void> => {
    try {
      dispatch({ type: 'set_data', value: await dataService.getPageData(searchParams.get('id')!) })
    } catch (e) {
      dispatch({ type: 'set_error', value: e as Error });
    }
  }

  const createBackup = async (): Promise<void> => {
    try {
      const backups: Array<DatabaseBackup> = await dataService.createBackup(searchParams.get('id')!);
      dispatch({ type: 'set_backups', value: backups })
      setNotifySuccess(true);
    } catch (e) {
      dispatch({ type: 'set_error', value: e as Error });
    }
  }

  const body = (): ReactNode => {
    if (state.loading || state.creatingBackup) {
      return <></>
    }
    if (state.error) {
      return <h1>Error inesperado...</h1>
    }
    return (
      <>
        <Content
          model={state.data!}
          onCreateBackup={() => dispatch({ type: 'set_creating_backup', value: true })} />
      </>
    );
  }

  return (
    <>
      <SuccessModal visible={notifySuccess} />
      <PageTemplate loading={state.loading || state.creatingBackup} pageHeader='Respaldos de la Base de Datos'>
        {body()}
      </PageTemplate>
    </>
  );
}

const Content = ({ model, onCreateBackup }: { model: DatabaseDetails, onCreateBackup: () => void }): ReactNode => {
  return (
    <div>
      <div className={styles.pageBody}>
        <div className={styles.detailsBox}>
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
          <button className={styles.primaryAction} onClick={onCreateBackup}>
            Crear nuevo respaldo
          </button>
        </div>
        <div className={styles.backupCards}>
          {
            sort(model.backups!).map((each: DatabaseBackup) =>
              <BackupCard key={each.id} databaseId={model.id} model={each} />
            )
          }
        </div>
      </div>
    </div>
  );
}

const BackupCard = ({ databaseId, model }: { databaseId: string, model: DatabaseBackup }): ReactNode => {
  return (
    <Card className={styles.backupCard}>
      <Image src={diskette} alt={'backup'} width={50} height={50} />
      <p className={styles.backupCardTopText}>{formatDate(model.creationDate)}</p>
      <a
        href={`http://192.168.100.53:8080/databases/${databaseId}/backups/${model.id}`}
        download={'nice.txt'}
        className={styles.backupCardDownload}>
        Descargar respaldo (.sql)
      </a>
    </Card>
  );
}

const SuccessModal = ({ visible }: { visible: boolean }): ReactNode => {
  return (
    <Modal visible={visible} >
      <p>nice</p>
    </Modal>
  );
}

const formatDate = (date: Date): string => {
  const year = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('es', { month: 'short' }).format(date);
  const day = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(date);
  const hour = new Intl.DateTimeFormat('es', { hour: '2-digit' }).format(date);
  const minute = new Intl.DateTimeFormat('es', { minute: '2-digit' }).format(date);
  const second = new Intl.DateTimeFormat('es', { second: '2-digit' }).format(date);
  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}

const sort = (backups: Array<DatabaseBackup>): Array<DatabaseBackup> => {
  return backups.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
}