/* eslint-disable default-param-last */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  articlesPage: {
    fetchedArticles: {
      articles: [],
      articlesCount: null,
    },
    articlesPageNumber: 1,
    status: null,
    error: null,
  },
  singlePage: {
    fetchedSingle: {},
    status: null,
    error: null,
  },
  status: null,
  error: null,
}

// Создаем thunk для получения статей
export const fetchArticles = createAsyncThunk('main/fetchArticles', async (pageNumber, { rejectWithValue }) => {
  try {
    const baseUrl = 'https://blog.kata.academy/api'
    const articlesUrl = '/articles'
    const queryLimit = '?limit=5'
    const skipNumber = (pageNumber - 1) * 5
    const querySkip = `&offset=${skipNumber}`

    const response = await fetch(`${baseUrl}${articlesUrl}${queryLimit}${querySkip}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const articles = await response.json()

    return { articles, pageNumber }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchSingleArticle = createAsyncThunk('main/fetchSingleArticle', async (slug, { rejectWithValue }) => {
  try {
    const baseUrl = 'https://blog.kata.academy/api/articles/'

    const response = await fetch(`${baseUrl}${slug}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const result = await response.json()

    return result
  } catch (error) {
    return rejectWithValue(error.message)
  }
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
        state.articlesPage.status = 'loading'
        state.articlesPage.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { payload } = action

        state.articlesPage.fetchedArticles = payload.articles
        if (payload.pageNumber) state.articlesPage.articlesPageNumber = payload.pageNumber
        state.articlesPage.status = 'resolved'
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.articlesPage.status = 'rejected'
        state.articlesPage.error = action.error.message
      })
      // single article
      .addCase(fetchSingleArticle.pending, (state) => {
        state.singlePage.status = 'loading'
        state.singlePage.error = null
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        const { payload } = action

        state.singlePage.fetchedSingle = payload.article
        state.singlePage.status = 'resolved'
      })
      .addCase(fetchSingleArticle.rejected, (state, action) => {
        state.singlePage.status = 'rejected'
        state.singlePage.error = action.error.message
      })
  },
})

export const { addArticles } = mainSlice.actions
export default mainSlice.reducer
