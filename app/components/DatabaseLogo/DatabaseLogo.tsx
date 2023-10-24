import styles from './styles.module.css';
import { DatabaseDetails } from "@/app/models/DatabaseDetails";
import Image, { StaticImageData } from "next/image";
import postgres from '../../../public/images/postgres.png';
import mysql from '../../../public/images/mysql.png';
import defaultLogo from '../../../public/images/postgres.png';
import { ReactNode } from "react";

type Props = {
  model: DatabaseDetails,
  width?: number,
  height?: number,
}

export const DatabaseLogo = ({ model, width, height }: Props): ReactNode => {
  return (
    <Image
      className={styles.databaseLogo}
      src={logo(model)}
      alt={`${model.dbms} logo`}
      width={width || 70}
      height={height || 70} />
  );
}

const logo = (model: DatabaseDetails): StaticImageData => {
  if (model.dbms === 'PostgreSQL') {
    return postgres;
  }
  if (model.dbms === 'MySQL') {
    return mysql;
  }
  return defaultLogo;
}

const basePath = (): string => '../../../public/images';