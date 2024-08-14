/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  articleData: {},
  errorCode: null,
}

export const addArticle = createAsyncThunk('article/addArticle', async (formData, { rejectWithValue }) => {
  console.log('Фейковое добавление статьи')

  // try {
  //   const url = 'https://blog.kata.academy/api/users'

  //   const params = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         username: formData.username,
  //         email: formData.email.toLowerCase(),
  //         password: formData.password,
  //       },
  //     }),
  //   }

  //   const response = await fetch(url, params)

  //   if (!response.ok) {
  //     return rejectWithValue(response.status)
  //   }

  //   const result = await response.json()

  //   return result
  // } catch (error) {
  //   console.log(error)
  // }
})

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    clearError: (state) => {
      state.errorCode = null
    },
  },
  extraReducers: (builder) => {
    builder
      // add article
      .addCase(addArticle.fulfilled, (state, action) => {
        console.log('СТАТЬЯ ДОБАВЛЕНА - ', action.payload)
        if (action.payload) {
          // state.articleData = action.payload.user
        }
      })
      .addCase(addArticle.rejected, (state, action) => {
        console.log('СТАТЬЯ НЕ ДОБАВИЛАСЬ - ', action.payload)
        if (action.payload) {
          state.errorCode = action.payload
        }
      })
  },
})

export const { clearError } = articleSlice.actions

export default articleSlice.reducer
