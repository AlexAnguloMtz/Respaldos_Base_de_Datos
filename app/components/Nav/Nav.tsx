'use client';

import MenuButton from '@/app/components/MenuButton';
import styles from './styles.module.css';
import { ReactNode, useState } from "react";
import { Drawer } from '../Drawer/Drawer';
import Link from 'next/link';
import Image from 'next/image';
import database from '../../../public/images/database.svg';

export const Nav = (): ReactNode => {

  const [drawerActive, setDrawerActive] = useState<boolean>(false);

  return (
    <nav className={styles.nav}>
      <MenuButton onClick={() => setDrawerActive(true)} />
      <Drawer
        active={drawerActive}
        onClose={() => setDrawerActive(false)} >
        <ul className={styles.links}>
          <li>
            <Link href={'/'} className={styles.link} onClick={() => setDrawerActive(false)}>
              <HomeIcon />
              Mis Bases de Datos
            </Link>
          </li>
        </ul>
      </Drawer>
    </nav>
  );
}

const HomeIcon = (): ReactNode => {
  return (
    <Image
      src={database}
      alt={'home'}
      width={35}
      height={35} />
  );
}