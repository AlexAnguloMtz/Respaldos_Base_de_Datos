import { ReactNode } from 'react';
import styles from './styles.module.css';
import Overlay from '../Overlay';
import Image from 'next/image';
import xMark from '../../../public/icons/xmark.svg';

type Props = {
  active: boolean,
  onClose: () => void
}

export const Drawer = ({ active, onClose }: Props): ReactNode => {
  return (
    <Overlay
      active={active}
      onClick={onClose}>
      <div
        className={`${styles.drawer} ${active ? styles.active : ''}`}
        onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButtonContainer}>
          <CloseButton onClick={onClose} />
        </div>
      </div>
    </Overlay>
  );
}

const CloseButton = ({ onClick }: { onClick: () => void }): ReactNode => {
  return (
    <button
      className={styles.closeButton}
      onClick={onClick}>
      <Image
        src={xMark}
        alt={'close'}
        width={25}
        height={25} />
    </button>
  );
}