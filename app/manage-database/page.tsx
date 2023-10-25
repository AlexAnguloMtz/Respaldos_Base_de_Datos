'use client'

import styles from './styles.module.css';
import { ReactNode, useEffect, useReducer, useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import { reducer } from './reducer';
import { initialState } from './ManageDatabaseState';
import { ManageDatabaseService } from './ManageDatabaseService';
import Card from '../components/Card';
import { DatabaseDetails } from '../models/DatabaseDetails';
import DatabaseLogo from '../components/DatabaseLogo';
import { StaticImageData } from 'next/image';
import backup from '../../public/images/backup.svg';
import Image from 'next/image';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import avatar from '../../public/icons/avatar.png';
import user from '../../public/icons/user.png';
import BottomSheet from '../components/BottomSheet';
import { DatabaseSchema } from '../models/DatabaseSchema';
import databaseImg from '../../public/images/database-2.png';
import storage from '../../public/images/storage.png';

const dataService: ManageDatabaseService = new ManageDatabaseService();

enum View {
  DEFAULT,
  USERS,
  SCHEMAS
}

export default function ManageDatabase(): JSX.Element {

  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const [state, dispatch] = useReducer(reducer, initialState());

  const [view, setView] = useState<View>(View.DEFAULT);

  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      dispatch({ type: 'set_data', value: await dataService.getDatabaseDetailsById(searchParams.get('id')!) })
    } catch (e) {
      dispatch({ type: 'set_error', value: e as Error });
    }
  }

  const body = (): ReactNode => {
    if (state.loading) {
      return <></>
    }
    if (state.error) {
      return <h1>Error inesperado...</h1>
    }
    return (
      <Content
        model={state.data?.database!}
        onBackups={() => router.push(`/backups?id=${state.data?.database.id}`)}
        onUsers={() => setView(View.USERS)}
        onSchemas={() => setView(View.SCHEMAS)} />
    );
  }

  return (
    <>
      <PageTemplate loading={state.loading} pageHeader='Gestionar Base de Datos'>
        {body()}
      </PageTemplate>
      <UsersView
        visible={view === View.USERS}
        onClose={() => setView(View.DEFAULT)}
        userNames={state.data?.database.users || []} />
      <SchemasView
        visible={view === View.SCHEMAS}
        onClose={() => setView(View.DEFAULT)}
        schemas={state.data?.database.schemas || []} />
    </>
  );
}

const Content = ({
  model,
  onBackups,
  onUsers,
  onSchemas
}: {
  model: DatabaseDetails,
  onBackups: () => void,
  onUsers: () => void,
  onSchemas: () => void
}): ReactNode => {
  return (
    <div>
      <div className={styles.pageBody}>
        <BroadDetails model={model} />
        <Actions onBackups={onBackups} onUsers={onUsers} onSchemas={onSchemas} />
      </div>
    </div>
  );
}

const BroadDetails = ({ model }: { model: DatabaseDetails }): ReactNode => {
  return (
    <Card className={styles.broadDetails}>
      <DatabaseLogo model={model} />
      <div className={styles.broadDetailsText}>

        <div>
          <h5 className={styles.key}>
            Versión
          </h5>
          <p className={styles.value}>
            {model.version}
          </p>
        </div>

        <div>
          <h5 className={styles.key}>
            Identificador
          </h5>
          <p className={styles.value}>
            {model.id}
          </p>
        </div>

      </div>
    </Card>
  );
}

const Actions = ({
  onBackups,
  onUsers,
  onSchemas
}: {
  onBackups: () => void,
  onUsers: () => void,
  onSchemas: () => void
}): ReactNode => {
  return (
    <section className={styles.actions}>
      <Action onClick={onBackups} imgSrc={storage} imgAlt='backup' text='Respaldos' />
      <Action onClick={onUsers} imgSrc={avatar} imgAlt='users' text='Usuarios' />
      <Action onClick={onSchemas} imgSrc={databaseImg} imgAlt='schemas' text='Schemas' />
    </section>
  );
}

const Action = ({
  imgSrc,
  imgAlt,
  text,
  onClick }: {
    imgSrc: StaticImageData,
    imgAlt: string,
    text: string,
    onClick: () => void
  }): ReactNode => {
  return (
    <Card className={styles.action} onClick={onClick}>
      <ActionImage src={imgSrc} alt={imgAlt} />
      <h3 className={styles.actionName}>{text}</h3>
    </Card>
  );
}

const ActionImage = ({ src, alt }: { src: StaticImageData, alt: string }): ReactNode => {
  return (
    <Image
      src={src}
      alt={alt}
      width={60}
      height={60} />
  );
}

const SchemasView = ({
  visible,
  onClose,
  schemas
}: {
  visible: boolean,
  onClose: () => void,
  schemas: Array<DatabaseSchema>
}): ReactNode => {
  return (
    <MultipleCardsBottomView
      title='Schemas'
      total={schemas.length}
      imgSrc={databaseImg}
      imgAlt='schema'
      visible={visible}
      onClose={onClose}
      strs={schemas.map((each: DatabaseSchema) => each.name)} />
  );
}

const UsersView = ({
  visible,
  onClose,
  userNames
}: {
  visible: boolean,
  onClose: () => void,
  userNames: Array<String>
}): ReactNode => {
  return (
    <MultipleCardsBottomView
      title='Usuarios'
      total={userNames.length}
      imgSrc={user}
      imgAlt='user'
      visible={visible}
      onClose={onClose}
      strs={userNames} />
  );
}

const MultipleCardsBottomView = ({
  title,
  total,
  imgSrc,
  imgAlt,
  visible,
  onClose,
  strs
}: {
  title: string,
  total: number,
  imgSrc: StaticImageData,
  imgAlt: string,
  visible: boolean,
  onClose: () => void,
  strs: Array<String>
}): ReactNode => {
  return (
    <GenericBottomView
      visible={visible}
      onClose={onClose}
      title={title}>
      <h3 style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>Total</h3>
      <h5 style={{ textAlign: 'center', fontSize: '18px', marginTop: '12px' }}>{total}</h5>
      <div className={styles.list}>
        {
          strs.map((str: String, index: number) =>
            <Card key={index} className={styles.tile}>
              <Image src={imgSrc} alt={imgAlt} width={40} height={40} />
              {str}
            </Card>
          )
        }
      </div>
    </GenericBottomView>
  );
}

const GenericBottomView = (
  {
    visible,
    onClose,
    title,
    children
  }: {
    visible: boolean,
    onClose: () => void,
    title: String,
    children: ReactNode
  }
): ReactNode => {
  return (
    <BottomSheet
      visible={visible}>
      <div className={styles.bottomSheetContent}>
        <h1 className={styles.bottomSheetTitle}>{title}</h1>
        {children}
        <div className={styles.bottomSheetButtonContainer}>
          <button
            className={styles.bottomSheetDismissButton}
            onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}