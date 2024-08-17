/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-const */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable one-var */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './Article.scss'
import { format } from 'date-fns'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Markdown from 'markdown-to-jsx'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import avatar from '../../assets/img/avatar.png'
import { deleteArticle } from '../../slices/articleSlice'

const CLOSE_TIME_MILLIS = 3000

const shortenString = (strArg = '', strLength = 45) => {
  if (strArg.length <= strLength) return strArg

  let result = strArg.substring(0, strLength)

  const lastSpaceIndex = result.lastIndexOf(' ')
  if (lastSpaceIndex !== -1 && lastSpaceIndex >= strLength - 10) {
    result = result.substring(0, lastSpaceIndex)
  }

  return `${result}...`
}

const handleDate = (date = new Date()) => format(new Date(date), 'MMMM d, yyyy')

const isValidUrl = (string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export default function Article({
  author,
  body,
  createdAt,
  description,
  favorited,
  favCount,
  slug,
  tagList,
  title,
  updatedAt,
  isSingleArticle,
}) {
  const { replace } = useHistory()
  const dispatch = useDispatch()
  const isAuthorized = !!useSelector((state) => state.user.userData.token)

  const imageUrl = isValidUrl(author.image) ? author.image : avatar

  const handleDelete = async (e) => {
    const resultAction = await dispatch(deleteArticle(slug))

    if (deleteArticle.fulfilled.match(resultAction)) {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId)
        replace('/')
      }, CLOSE_TIME_MILLIS)

      toast(
        <>
          🦄 This article has been deleted! <br /> Redirecting to the homepage in 3 sec
        </>,
        { autoClose: CLOSE_TIME_MILLIS }
      )
    }
  }

  return (
    <article className="article">
      <ToastContainer />
      <div className="article__top">
        <div className="article__left">
          <div className="article__title-like">
            <Link className="article__title" to={`/articles/${slug}`}>
              {shortenString(title, 50)}
            </Link>
            <button className="button article__like-btn" type="button">
              {favCount}
            </button>
          </div>
          <div className="article__tags">
            {tagList.map((tag, index) => (
              <div className="article__tag" key={shortenString(tag, 20) + index}>
                {shortenString(tag, 20)}
              </div>
            ))}
          </div>
        </div>
        <div className="article__person">
          <div className="article__namedate">
            <div className="article__name">{shortenString(author.username, 20)}</div>
            <div className="article__date">{handleDate(createdAt)}</div>
          </div>
          <div className="article__avatar">
            <img src={imageUrl} alt="user avatar" />
          </div>
          {isSingleArticle && isAuthorized && (
            <div className="article__btn-box">
              <button className="article__btn-delete button" onClick={handleDelete} type="button">
                Delete
              </button>
              <button className="article__btn-edit button" type="button">
                <Link to={`/articles/${slug}/edit`}>Edit</Link>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="article__bottom">
        <div className="article__excerpt">{shortenString(description, 500)}</div>
        {isSingleArticle && (
          <div className="article__markdown">
            <Markdown className="article__markdown">{body}</Markdown>
          </div>
        )}
      </div>
    </article>
  )
}
