import Nav from '../Nav';
import ProgressIndicator from '../ProgressIndicator';
import styles from './styles.module.css';
import { ReactNode } from 'react';

type Props = {
  loading: boolean,
  children?: ReactNode
}

export const PageTemplate = ({ loading, children }: Props): ReactNode => {
  return (
    <div className={styles.page}>
      <Nav />
      <PageBody className={loading ? 'centered' : ''}>
        {loading ? <ProgressIndicator /> : children}
      </PageBody>
    </div>
  );
}

const PageBody = ({ className, children }: { className?: string, children: ReactNode }): ReactNode => {
  return (
    <div className={`${styles.pageBody} ${className}`}>
      {children}
    </div>
  );
}