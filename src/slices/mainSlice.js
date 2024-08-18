/* eslint-disable consistent-return */
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
export const fetchArticles = createAsyncThunk(
  'main/fetchArticles',
  async (pageNumber, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().user.userData

      const baseUrl = 'https://blog.kata.academy/api'
      const articlesUrl = '/articles'
      const queryLimit = '?limit=5'
      const skipNumber = (pageNumber - 1) * 5
      const querySkip = `&offset=${skipNumber}`

      const params = {
        headers: {
          Authorization: `Token ${token}`,
        },
      }

      if (!token) {
        delete params.headers
      }

      const response = await fetch(`${baseUrl}${articlesUrl}${queryLimit}${querySkip}`, params)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const articles = await response.json()

      return { articles, pageNumber }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
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
export const faveUnfaveArticle = createAsyncThunk(
  'article/faveUnfaveArticle',
  async ({ slug, favorited }, { rejectWithValue, getState }) => {
    const { token } = getState().user.userData

    try {
      const url = `https://blog.kata.academy/api/articles/${slug}/favorite`

      const params = {
        method: favorited ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }

      const response = await fetch(url, params)

      const result = await response.json()

      if (!response.ok) {
        return rejectWithValue({ status: response.status, message: result })
      }

      return result
    } catch (error) {
      console.log(error)
    }
  }
)

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    resetPaginationPage(state) {
      state.articlesPage.articlesPageNumber = 1
    },
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

      // favorite an article
      .addCase(faveUnfaveArticle.fulfilled, (state, action) => {
        console.log('СТАТЬЯ ЛАЙКНУТА - ', action.payload)
        const { slug, favoritesCount, favorited } = action.payload.article

        state.articlesPage.fetchedArticles.articles.forEach((article) => {
          if (article.slug === slug) {
            article.favoritesCount = favoritesCount
            article.favorited = favorited
          }
        })
      })
      .addCase(faveUnfaveArticle.rejected, (state, action) => {
        console.log('СТАТЬЯ НЕ ЛАЙКНУЛАСЬ - ', action.payload)
      })
  },
})

export const { resetPaginationPage } = mainSlice.actions
export default mainSlice.reducer
