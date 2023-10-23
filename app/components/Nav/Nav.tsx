'use client';

import MenuButton from '@/app/MenuButton';
import styles from './styles.module.css';
import { ReactNode, useState } from "react";
import { Drawer } from '../Drawer/Drawer';

export const Nav = (): ReactNode => {

  const [drawerActive, setDrawerActive] = useState<boolean>(false);

  return (
    <nav className={styles.nav}>
      <MenuButton onClick={() => setDrawerActive(true)} />
      <Drawer
        active={drawerActive}
        onClose={() => setDrawerActive(false)} />
    </nav>
  );
}