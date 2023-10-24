import { BackupsPageData } from "./BackupsPageData"

export type BackupsPageState = {
  loading: boolean,
  error?: Error,
  data?: BackupsPageData
}

export const initialState = (): BackupsPageState => {
  return {
    loading: true
  }
}