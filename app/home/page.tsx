'use client';

import PageTemplate from '../components/PageTemplate';
import { DatabaseDetails } from '../models/DatabaseDetails';
import Databases from './Databases';
import { HomeData } from './HomeData';
import { HomeDataService } from './HomeDataService';
import { initialHomeState } from './HomeState';
import { homeReducer } from './home-reducer';
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
      return <></>
    }
    if (state.error) {
      return <h1>Error inesperado...</h1>
    }
    return <Content databases={state.data?.databases!} />
  }

  return (
    <PageTemplate loading={state.loading} pageHeader='Mis Bases de Datos'>
      {body()}
    </PageTemplate>
  );

}

const Content = ({ databases }: { databases: Array<DatabaseDetails> }): ReactNode => {
  return (
    <Databases models={databases} />
  );
}