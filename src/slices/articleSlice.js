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

export const addArticle = createAsyncThunk('article/addArticle', async (formData, { rejectWithValue, getState }) => {
  // console.log('Фейковое добавление статьи', formData)
  const { token } = getState().user.userData.token

  console.log({
    article: {
      title: formData.title,
      description: formData.descr,
      body: formData.articleText,
      tagList: formData.tags,
    },
  })

  try {
    const url = 'https://blog.kata.academy/api/articles/'

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        article: {
          title: formData.title,
          description: formData.descr,
          body: formData.articleText,
          tagList: formData.tags,
        },
      }),
    }

    const response = await fetch(url, params)

    // if (!response.ok) {
    //   return rejectWithValue(response.status)
    // }

    const result = await response.json()

    console.log(result)

    return result
  } catch (error) {
    console.log(error)
  }
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
          state.articleData = action.payload.article
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
