/* eslint-disable import/prefer-default-export */
const saveUserToLocal = (user) => {
  try {
    const serializedState = JSON.stringify(user)
    localStorage.setItem('user', serializedState)
    console.log('Сохранено в localStorage')
  } catch {
    console.error('Ошибка сохранения в localStorage')
  }
}

export const localStorageMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action)

  if (
    action.type.endsWith('/fulfilled') &&
    (action.type.startsWith('user/loginUser') ||
      action.type.startsWith('user/registerUser') ||
      action.type.startsWith('user/updateUser'))
  ) {
    const user = storeAPI.getState().user.userData
    saveUserToLocal(user)
  }

  return result
}
