import { HomeData } from "./HomeData"

export type HomeState = {
  loading: boolean,
  data?: HomeData,
  error?: Error
}

export const initialHomeState = (): HomeState => {
  return {
    loading: true,
  }
}