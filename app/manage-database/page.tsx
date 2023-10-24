'use client'

import styles from './styles.module.css';
import { ReactNode, useEffect, useReducer } from 'react';
import PageTemplate from '../components/PageTemplate';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import { reducer } from './reducer';
import { initialState } from './ManageDatabaseState';
import { ManageDatabaseService } from './ManageDatabaseService';
import Card from '../components/Card';
import { DatabaseDetails } from '../models/DatabaseDetails';
import DatabaseLogo from '../components/DatabaseLogo';
import { StaticImageData } from 'next/image';
import backup from '../../public/images/backup.svg';
import Image from 'next/image';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const dataService: ManageDatabaseService = new ManageDatabaseService();

export default function ManageDatabase(): JSX.Element {

  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const [state, dispatch] = useReducer(reducer, initialState());

  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      dispatch({ type: 'set_data', value: await dataService.getDatabaseDetailsById(searchParams.get('id')!) })
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
      <Content
        model={state.data?.database!}
        onBackups={() => router.push(`/backups?id=${state.data?.database.id}`)} />
    );
  }

  return (
    <PageTemplate loading={state.loading}>
      {body()}
    </PageTemplate>
  );
}

const Content = ({ model, onBackups }: { model: DatabaseDetails, onBackups: () => void }): ReactNode => {
  return (
    <div>
      <Header />
      <div className={styles.pageBody}>
        <BroadDetails model={model} />
        <Actions onBackups={onBackups} />
      </div>
    </div>
  );
}

const Header = (): ReactNode => {
  return (
    <Card >
      <h1 className={styles.pageTitle}>Gestionar Base de Datos</h1>
    </Card>
  );
}

const BroadDetails = ({ model }: { model: DatabaseDetails }): ReactNode => {
  return (
    <Card className={styles.broadDetails}>
      <DatabaseLogo model={model} />
      <div className={styles.broadDetailsText}>

        <div>
          <h5 className={styles.key}>
            Versión
          </h5>
          <p className={styles.value}>
            {model.version}
          </p>
        </div>

        <div>
          <h5 className={styles.key}>
            Identificador
          </h5>
          <p className={styles.value}>
            {model.id}
          </p>
        </div>

      </div>
    </Card>
  );
}

const Actions = ({ onBackups }: { onBackups: () => void }): ReactNode => {
  return (
    <section className={styles.actions}>
      <Action onClick={onBackups} imgSrc={backup} imgAlt='backup' text='Respaldos' />
      <Action onClick={() => { }} imgSrc={backup} imgAlt='backup' text='Respaldos' />
      <Action onClick={() => { }} imgSrc={backup} imgAlt='backup' text='Respaldos' />
      <Action onClick={() => { }} imgSrc={backup} imgAlt='backup' text='Respaldos' />
    </section>
  );
}

const Action = ({
  imgSrc,
  imgAlt,
  text,
  onClick }: {
    imgSrc: StaticImageData,
    imgAlt: string,
    text: string,
    onClick: () => void
  }): ReactNode => {
  return (
    <Card className={styles.action} onClick={onClick}>
      <ActionImage src={imgSrc} alt={imgAlt} />
      <h3 className={styles.actionName}>{text}</h3>
    </Card>
  );
}

const ActionImage = ({ src, alt }: { src: StaticImageData, alt: string }): ReactNode => {
  return (
    <Image
      src={src}
      alt={alt}
      width={60}
      height={60} />
  );
}