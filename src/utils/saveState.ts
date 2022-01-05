export const saveState = <T>(name: string, state: T) => {
  try {
    const serializableState = JSON.stringify(state)
    window.localStorage.setItem(name, serializableState)
  } catch (err) {
    console.log('Redux was not able to persist the state into the localstorage')
  }
}
