import Nav from '../components/Nav';
import styles from './styles.module.css';
import { ReactNode } from "react";

export default function Home(): ReactNode {
  return (
    <div className={styles.page}>
      <Nav />
    </div>
  );
}