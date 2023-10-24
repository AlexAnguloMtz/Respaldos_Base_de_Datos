import { ReactNode } from 'react';
import styles from './styles.module.css';
import Overlay from '../Overlay';

type Props = {
  visible: boolean,
  children: ReactNode
}

export const Modal = ({ visible, children }: Props): ReactNode => {
  return (
    <Overlay active={visible} className={styles.overlay}>
      <div className={visible ? styles.modalVisible : styles.modal}>
        {children}
      </div>
    </Overlay >
  );
}