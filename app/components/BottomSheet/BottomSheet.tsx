import { ReactNode } from 'react';
import styles from './styles.module.css';
import Overlay from '../Overlay';

type Props = {
  visible: boolean,
  children: ReactNode
}

export const BottomSheet = ({ visible, children }: Props): ReactNode => {
  return (
    <Overlay active={visible}>
      <div className={visible ? styles.bottomSheetVisible : styles.bottomSheet}>
        {children}
      </div>
    </Overlay>
  );
}