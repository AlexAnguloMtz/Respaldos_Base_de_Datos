import { HomeState } from "./HomeState";

type HomeStateAction =
  | { type: 'set_loading', value: boolean }
  | { type: 'set_error', value: Error }

export const homeReducer = (state: HomeState, action: HomeStateAction): HomeState => {
  switch (action.type) {
    case 'set_loading':
      return { ...state, loading: action.value }
    case 'set_error':
      return { ...state, loading: false, error: action.value }
    default:
      throw new Error('Could not handle action ' + JSON.stringify(action));
  }
}