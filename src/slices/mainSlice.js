/* eslint-disable default-param-last */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  articlesPage: {
    articles: [],
    articlesCount: null,
  },
  articlesPageNumber: 1,
  singlePage: {},
  status: null,
  error: null,
}

// Создаем thunk для получения статей
export const fetchArticles = createAsyncThunk('main/fetchArticles', async (pageNumber = 1, { dispatch }) => {
  const baseUrl = 'https://blog.kata.academy/api'
  const articlesUrl = '/articles'
  const queryLimit = '?limit=5'
  const skipNumber = (pageNumber - 1) * 5
  const querySkip = `&offset=${skipNumber}`

  const response = await fetch(`${baseUrl}${articlesUrl}${queryLimit}${querySkip}`)
  const articles = await response.json()

  return { articles, pageNumber }
})
export const fetchSingleArticle = createAsyncThunk('main/fetchSingleArticle', async (slug, { dispatch }) => {
  const baseUrl = 'https://blog.kata.academy/api/articles/'

  const response = await fetch(`${baseUrl}${slug}`)
  const result = await response.json()

  return result
})

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // addArticles(state, action) {
    //   const { payload } = action
    //   // console.log(payload.articles)
    //   state.articlesPage = payload
    // },
  },
  extraReducers: (builder) => {
    builder
      // all articles
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { payload } = action

        state.articlesPage = payload.articles
        state.articlesPageNumber = payload.pageNumber
        state.status = 'resolved'
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      // single article
      .addCase(fetchSingleArticle.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        const { payload } = action

        state.singlePage = payload.article
        state.status = 'resolved'
      })
      .addCase(fetchSingleArticle.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
  },
})

export const { addArticles } = mainSlice.actions
export default mainSlice.reducer
