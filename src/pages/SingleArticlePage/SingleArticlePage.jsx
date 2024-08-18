import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './SingleArticlePage.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleArticle } from '../../slices/mainSlice'
import Article from '../../components/Article'
import Spinner from '../../components/Spinner'
import ErrorAlert from '../../components/ErrorAlert'

export default function SingleArticlePage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const article = useSelector((state) => state.main.singlePage.fetchedSingle)
  const status = useSelector((state) => state.main.singlePage.status) === 'resolved'
  const error = useSelector((state) => state.main.singlePage.status) === 'rejected'

  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
  }, [])

  return (
    <section className="main__articles articles">
      <div className="container">
        {!status && !error && <Spinner />}
        {error && <ErrorAlert description="Ошибка загрузки этой статьи" />}
        {status && (
          <Article
            author={article.author}
            body={article.body}
            createdAt={article.createdAt}
            description={article.description}
            favorited={article.favorited}
            favCount={article.favoritesCount}
            slug={article.slug}
            tagList={article.tagList}
            title={article.title}
            updatedAt={article.updatedAt}
            key={article.slug + article.createdAt}
            isSingleArticle
          />
        )}
      </div>
    </section>
  )
}
