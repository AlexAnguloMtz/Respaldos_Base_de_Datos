'use client'

import styles from './styles.module.css';
import { ReactNode, useEffect, useReducer } from 'react';
import PageTemplate from '../components/PageTemplate';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { reducer } from './reducer';
import { initialState } from './ManageDatabaseState';
import { ManageDatabaseService } from './ManageDatabaseService';
import Card from '../components/Card';
import { DatabaseDetails } from '../models/DatabaseDetails';
import DatabaseLogo from '../components/DatabaseLogo';

const dataService: ManageDatabaseService = new ManageDatabaseService();

export default function ManageDatabase(): JSX.Element {

  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const [state, dispatch] = useReducer(reducer, initialState());

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
    return <Content model={state.data?.database!} />
  }

  return (
    <PageTemplate loading={state.loading}>
      {body()}
    </PageTemplate>
  );
}

const Content = ({ model }: { model: DatabaseDetails }): ReactNode => {
  return (
    <div>
      <Header />
      <BroadDetails model={model} />
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
            Version
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