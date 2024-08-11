/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  userData: {},
  errorCode: null,
  errorMessage: null,
}

export const registerUser = createAsyncThunk('user/registerUser', async (formData, { rejectWithValue }) => {
  try {
    const url = 'https://blog.kata.academy/api/users'

    console.log(formData)

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      }),
    }

    const response = await fetch(url, params)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result = await response.json()

    return result
  } catch (error) {
    console.log(error)
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (formData, { rejectWithValue }) => {
  try {
    const url = 'https://blog.kata.academy/api/users/login'

    console.log(formData)

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: formData.email,
          password: formData.password,
        },
      }),
    }

    const response = await fetch(url, params)

    if (!response.ok) {
      return rejectWithValue(response.status)
    }

    const result = await response.json()

    return result
  } catch (error) {
    console.log(error)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('РЕГИСТРАЦИЯ - ', action.payload)
        if (action.payload) {
          state.userData = action.payload.user
        }
      })

      // login user
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('ВХОД - ', action.payload)
        if (action.payload) {
          state.userData = action.payload.user
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('ВХОД НЕ УДАЛСЯ - ', action.payload)
        if (action.payload) {
          state.errorCode = action.payload
          state.errorMessage = 'Input data incorrect'
        }
      })
  },
})

// export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
