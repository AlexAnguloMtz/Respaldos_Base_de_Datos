'use client'

import styles from './styles.module.css';
import { ReactNode, useEffect, useReducer } from 'react';
import PageTemplate from '../components/PageTemplate';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { reducer } from './reducer';
import { initialState } from './ManageDatabaseState';
import { ManageDatabaseService } from './ManageDatabaseService';
import Card from '../components/Card';

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
    if (state.error) {
      return <h1>Error inesperado...</h1>
    }
    return <Content />
  }

  return (
    <PageTemplate loading={false}>
      {body()}
    </PageTemplate>
  );
}

const Content = (): ReactNode => {
  return (
    <div>
      <Card >
        <h1 className={styles.pageTitle}>Gestionar Base de Datos</h1>
      </Card>
    </div>
  );
}