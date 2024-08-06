/* eslint-disable no-unused-vars */
import './ArticlesListPage.scss'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchArticles } from '../../slices/mainSlice'
import Article from '../../components/Article'
import Spinner from '../../components/Spinner'
import ErrorAlert from '../../components/ErrorAlert'

export default function ArticlesPage() {
  const dispatch = useDispatch()
  const { articles, articlesCount } = useSelector((state) => state.main.articlesPage.fetchedArticles)
  const pageNumber = useSelector((state) => state.main.articlesPage.articlesPageNumber)
  const status = useSelector((state) => state.main.articlesPage.status) === 'resolved'
  const error = useSelector((state) => state.main.articlesPage.status) === 'rejected'

  useEffect(() => {
    dispatch(fetchArticles(pageNumber))
  }, [])

  const onPaginationChange = (chosenPageNumber) => {
    dispatch(fetchArticles(chosenPageNumber))
  }

  return (
    <section className="main__articles articles">
      <div className="container">
        {!status && !error && <Spinner className="fullscreen-spinner" />}
        {error && <ErrorAlert description="Ошибка при получении статей" />}
        {status &&
          articles.map((article) => (
            <Article
              author={article.author}
              // body={article.body} // так надо
              createdAt={article.createdAt}
              description={article.description}
              favorited={article.favorited}
              favCount={article.favoritesCount}
              slug={article.slug}
              tagList={article.tagList}
              title={article.title}
              updatedAt={article.updatedAt}
              key={article.slug + article.createdAt}
            />
          ))}

        <div className="articles__pagination">
          {status && (
            <Pagination
              onChange={onPaginationChange}
              defaultCurrent={pageNumber}
              showSizeChanger={false}
              total={articlesCount}
              pageSize={5}
              align="center"
            />
          )}
        </div>
      </div>
    </section>
  )
}
