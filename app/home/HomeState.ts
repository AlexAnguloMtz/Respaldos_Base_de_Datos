export type HomeState = {
  loading: boolean,
  error?: Error
}

export const homeInitialState = (): HomeState => {
  return {
    loading: true,
    error: undefined
  }
}