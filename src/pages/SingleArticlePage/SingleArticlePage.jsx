/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './SingleArticlePage.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Article from '../../components/Article'
import { fetchSingleArticle } from '../../slices/mainSlice'
import Spinner from '../../components/Spinner/Spinner'

export default function SingleArticlePage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const article = useSelector((state) => state.main.singlePage)
  const status = useSelector((state) => state.main.status) === 'resolved'

  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
  }, [])

  // if (slug) console.log('paramsSlug:', slug)

  console.log(status)
  return (
    <section className="main__articles articles">
      <div className="container">
        {!status && <Spinner />}
        {status && (
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
        )}
      </div>
    </section>
  )
}
