import { ReactNode } from 'react';
import styles from './styles.module.css';
import Overlay from '../Overlay';

type Props = {
  visible: boolean,
  className?: string,
  children: ReactNode
}

export const Modal = ({ visible, className, children }: Props): ReactNode => {
  return (
    <Overlay active={visible} className={styles.overlay + ' ' + className}>
      <div className={visible ? styles.modalVisible : styles.modal}>
        {children}
      </div>
    </Overlay >
  );
}