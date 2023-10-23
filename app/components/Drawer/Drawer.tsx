import { ReactNode } from 'react';
import styles from './styles.module.css';
import Overlay from '../Overlay';

type Props = {
  active: boolean,
  onClose: () => void
}

export const Drawer = ({ active, onClose }: Props): ReactNode => {
  return (
    <Overlay
      active={active}
      onClick={onClose}>
      <div className={`${styles.drawer} ${active ? styles.active : ''}`}>
        <h1>hello drawer</h1>
      </div>
    </Overlay>
  );
} 