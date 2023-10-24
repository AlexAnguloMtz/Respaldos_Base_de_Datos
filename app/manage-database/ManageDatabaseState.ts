import { ManageDatabaseData } from "./ManageDatabaseData"

export type ManageDatabaseState = {
  loading: boolean,
  error?: Error,
  data?: ManageDatabaseData
}

export const initialState = (): ManageDatabaseState => {
  return {
    loading: true
  }
}