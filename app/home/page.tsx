'use client';

import Card from '../components/Card';
import Nav from '../components/Nav';
import ProgressIndicator from '../components/ProgressIndicator';
import { Database } from '../models/Database';
import Databases from './Databases';
import { HomeData } from './HomeData';
import { HomeDataService } from './HomeDataService';
import { initialHomeState } from './HomeState';
import { homeReducer } from './home-reducer';
import styles from './styles.module.css';
import { ReactNode, useEffect, useReducer } from "react";

const homeDataService: HomeDataService = new HomeDataService();

export default function Home(): ReactNode {

  const [state, dispatch] = useReducer(homeReducer, initialHomeState());

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data: HomeData = await homeDataService.getHomeData();
      dispatch({ type: 'set_data', value: data });
    } catch (e) {
      dispatch({ type: 'set_error', value: (e as Error) });
    }
  }

  const body = (): ReactNode => {
    if (state.loading) {
      return <LoadingScreen />
    }
    if (state.error) {
      return <>error bro!</>
    }
    if (state.data) {
      return <PageContent databases={state.data.databases} />
    }
    throw new Error('Could not render body');
  }

  return (
    <div className={styles.page}>
      <Nav />
      {body()}
    </div>
  );
}

const PageContent = ({ databases }: { databases: Array<Database> }): ReactNode => {
  return (
    <PageBody>
      <Card >
        <h1 className={styles.pageTitle}>Mis Bases de Datos</h1>
      </Card>
      <Databases models={databases} />
    </PageBody>
  );
}

const LoadingScreen = (): ReactNode => {
  return (
    <PageBody className="centered">
      <ProgressIndicator />
    </PageBody>
  );
}

const PageBody = ({ className, children }: { className?: string, children: ReactNode }): ReactNode => {
  return (
    <div className={`${styles.pageBody} ${className}`}>
      {children}
    </div>
  );
}