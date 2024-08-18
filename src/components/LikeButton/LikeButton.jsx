/* eslint-disable react/prop-types */
import './LikeButton.scss'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { faveUnfaveArticle } from '../../slices/mainSlice'

export default function LikeButton({ favCount, favorited, slug }) {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(faveUnfaveArticle({ slug, favorited }))
  }

  return (
    <button
      className={classNames('button article__like-btn', favorited && 'article__like-btn--active')}
      onClick={handleLike}
      type="button"
    >
      {favCount}
    </button>
  )
}
