export const loadState = <T>(name: string): T | undefined => {
  try {
    const serializableState: string | null | undefined = window.localStorage.getItem(name)
    return serializableState !== null || serializableState === undefined
      ? JSON.parse(serializableState)
      : undefined
  } catch (error) {
    return undefined
  }
}
