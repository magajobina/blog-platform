/* eslint-disable no-unused-vars */
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Article from '../../components/Article'
import { fetchArticles } from '../../slices/mainSlice'
import './ArticlesListPage.scss'

export default function ArticlesPage() {
  const dispatch = useDispatch()
  const { pageNumber } = useSelector((state) => state.main.articlesPageNumber)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [])

  const { articles, articlesCount } = useSelector((state) => state.main.articlesPage)

  // console.log(articles)

  const onPaginationChange = (chosenPageNumber) => {
    dispatch(fetchArticles(chosenPageNumber))
  }

  return (
    <section className="main__articles articles">
      <div className="container">
        {articles.map((article) => (
          <Article
            author={article.author}
            body={article.body}
            createdAt={article.createdAt}
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
          <Pagination
            onChange={onPaginationChange}
            defaultCurrent={pageNumber}
            showSizeChanger={false}
            total={articlesCount}
            pageSize={5}
            align="center"
          />
        </div>
      </div>
    </section>
  )
}
