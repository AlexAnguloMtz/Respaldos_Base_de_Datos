import { BackupsPageData } from "./BackupsPageData";
import { BackupsPageState } from "./BackupsPageState";

type BackupsPageAction =
  | { type: 'set_data', value: BackupsPageData }
  | { type: 'set_loading', value: boolean }
  | { type: 'set_error', value: Error }

export const reducer = (state: BackupsPageState, action: BackupsPageAction): BackupsPageState => {
  switch (action.type) {
    case 'set_loading':
      return { ...state, loading: action.value };
    case 'set_data':
      return { ...state, loading: false, data: action.value };
    case 'set_error':
      return { ...state, loading: false, error: action.value };
  }
}