import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../slices/mainSlice'
import userReducer from '../slices/userSlice'

const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
  },
})

export default store
