/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const loadUserFromLocal = () => {
  try {
    const serializedState = localStorage.getItem('user')
    if (serializedState === null) {
      return {}
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return {}
  }
}

const initialState = {
  userData: loadUserFromLocal(),
  errorCode: null,
}

export const registerUser = createAsyncThunk('user/registerUser', async (formData, { rejectWithValue }) => {
  try {
    const url = 'https://blog.kata.academy/api/users'

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: formData.username,
          email: formData.email.toLowerCase(),
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

export const loginUser = createAsyncThunk('user/loginUser', async (formData, { rejectWithValue }) => {
  try {
    const url = 'https://blog.kata.academy/api/users/login'

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: formData.email.toLowerCase(),
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

export const updateUser = createAsyncThunk('user/updateUser', async (formData, { rejectWithValue, getState }) => {
  try {
    const url = 'https://blog.kata.academy/api/user'
    const { token } = getState().user.userData

    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          username: formData.username,
          email: formData.email.toLowerCase(),
          ...(formData.password && { password: formData.password }),
          image: formData.image || null,
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

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (_, { rejectWithValue, getState }) => {
  try {
    const url = 'https://blog.kata.academy/api/user'
    const { token } = getState().user.userData

    const params = {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
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
    clearError: (state) => {
      state.errorCode = null
    },
    deleteUser: (state) => {
      state.userData = {}
    }
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
      .addCase(registerUser.rejected, (state, action) => {
        console.log('РЕГИСТРАЦИЯ НЕ УДАЛАСЬ - ', action.payload)
        if (action.payload) {
          state.errorCode = action.payload
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
        }
      })

      // Get current user
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log('getCurrentUser - ', action.payload)
        if (action.payload) {
          state.userData = action.payload.user
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        console.log('getCurrentUser не удался - ', action.payload)
        if (action.payload) {
          state.errorCode = action.payload
        }
      })

      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log('updateUser - ', action.payload)
        if (action.payload) {
          state.userData = action.payload.user
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log('updateUser не удался - ', action.payload)
        if (action.payload) {
          state.errorCode = action.payload
        }
      })
  },
})

export const { clearError, deleteUser } = userSlice.actions

export default userSlice.reducer
