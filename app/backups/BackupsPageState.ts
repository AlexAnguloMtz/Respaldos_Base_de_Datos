import { DatabaseDetails } from "../models/DatabaseDetails"

export type BackupsPageState = {
  loading: boolean,
  creatingBackup: boolean,
  error?: Error,
  data?: DatabaseDetails
}

export const initialState = (): BackupsPageState => {
  return {
    loading: true,
    creatingBackup: false
  }
}