import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../slices/mainSlice'
import userReducer from '../slices/userSlice'
import { localStorageMiddleware } from '../middleware/localStorageMiddleware'

const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

export default store
