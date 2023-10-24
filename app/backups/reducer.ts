import { DatabaseBackup } from "../models/DatabaseBackup";
import { DatabaseDetails } from "../models/DatabaseDetails";
import { BackupsPageState } from "./BackupsPageState";

type BackupsPageAction =
  | { type: 'set_data', value: DatabaseDetails }
  | { type: 'set_loading', value: boolean }
  | { type: 'set_error', value: Error }
  | { type: 'set_creating_backup', value: boolean }
  | { type: 'set_backups', value: Array<DatabaseBackup> }

export const reducer = (state: BackupsPageState, action: BackupsPageAction): BackupsPageState => {
  switch (action.type) {
    case 'set_loading':
      return { ...state, loading: action.value };
    case 'set_data':
      return { ...state, loading: false, data: action.value };
    case 'set_error':
      return { ...state, loading: false, creatingBackup: false, error: action.value };
    case 'set_creating_backup':
      return { ...state, creatingBackup: action.value };
    case 'set_backups':
      return setBackups(action.value, state);
  }
}

const setBackups = (payload: Array<DatabaseBackup>, state: BackupsPageState): BackupsPageState => {
  const neww: BackupsPageState = {
    ...state,
    creatingBackup: false,
    data: {
      ...state,
      backups: payload,
      id: state.data?.id!,
      dbms: state.data?.dbms!,
      version: state.data?.version!,
      users: state.data?.users!,
      schemas: state.data?.schemas!
    }
  };
  return neww;
}