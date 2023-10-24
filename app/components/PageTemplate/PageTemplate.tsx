import Nav from '../Nav';
import ProgressIndicator from '../ProgressIndicator';
import PageHeader from './PageHeader';
import styles from './styles.module.css';
import { ReactNode } from 'react';

type Props = {
  loading: boolean,
  pageHeader: string,
  children?: ReactNode
}

export const PageTemplate = ({ loading, pageHeader, children }: Props): ReactNode => {
  return (
    <div className={styles.page}>
      <Nav />
      <div className={styles.outerBox}>
        <PageHeader text={pageHeader} />
        <PageBody className={loading ? 'centered' : ''}>
          {loading ? <ProgressIndicator /> : children}
        </PageBody>
      </div>
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