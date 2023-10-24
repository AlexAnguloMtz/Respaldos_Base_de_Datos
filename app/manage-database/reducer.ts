import { ManageDatabaseData } from "./ManageDatabaseData";
import { ManageDatabaseState } from "./ManageDatabaseState";

type ManageDatabaseAction =
  | { type: 'set_data', value: ManageDatabaseData }
  | { type: 'set_loading', value: boolean }
  | { type: 'set_error', value: Error }

export const reducer = (state: ManageDatabaseState, action: ManageDatabaseAction): ManageDatabaseState => {
  switch (action.type) {
    case 'set_loading':
      return { ...state, loading: action.value };
    case 'set_data':
      return { ...state, loading: false, data: action.value };
    case 'set_error':
      return { ...state, loading: false, error: action.value };
  }
}