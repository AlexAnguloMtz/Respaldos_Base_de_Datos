'use client';

import Nav from '../components/Nav';
import ProgressIndicator from '../components/ProgressIndicator';
import { HomeDataService } from './HomeDataService';
import { homeInitialState } from './HomeState';
import { homeReducer } from './home-reducer';
import styles from './styles.module.css';
import { ReactNode, useReducer } from "react";

const homeDataService: HomeDataService = new HomeDataService();

export default function Home(): ReactNode {

  const [state, dispatch] = useReducer(homeReducer, homeInitialState());
  return (
    <div className={styles.page}>
      <Nav />
      {
        state.loading ? <LoadingScreen /> : <></>
      }
    </div>
  );
}

const LoadingScreen = (): ReactNode => {
  return (
    <div className={styles.loadingScreen}>
      <ProgressIndicator />
    </div>
  );
}