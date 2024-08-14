/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable no-empty */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import './CreateArticlePage.scss'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { ToastContainer, toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import { clearError } from '../../slices/userSlice'
import { addArticle } from '../../slices/articleSlice'

const toastErrorParams = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}

export default function CreateArticlePage() {
  const { push } = useHistory()
  const dispatch = useDispatch()
  const errorCode = useSelector((state) => state.user.errorCode)

  const [tags, setTags] = useState([{ id: nanoid(), value: '' }])

  const createTag = (tag, index) => {
    const tagIdString = `tag-${tag.id}`
    return (
      <div key={tag.id} className={classNames('create__tag-box', errors[tagIdString] && 'create__tag-box--invalid')}>
        <input
          className="create__input create__tag-input"
          type="text"
          name={tagIdString}
          {...register(`tag-${tag.id}`, paramsObj.tag)}
          placeholder="Tag"
        />
        <button className="button create__tag-delete" onClick={() => handleDeleteTag(index)} type="button">
          Delete
        </button>
        {index === tags.length - 1 && (
          <button className="button create__tag-add" onClick={handleAddTag} type="button">
            Add tag
          </button>
        )}
        <span className="create__invalid-message">{errors[tagIdString]?.message}</span>
      </div>
    )
  }

  const handleAddTag = () => {
    setTags([...tags, { id: nanoid(), value: '' }])
  }

  const handleDeleteTag = (index) => {
    if (tags.length > 1) {
      setTags(tags.filter((_, i) => i !== index))
    }
  }

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (!errorCode) return

    if (errorCode === 422) {
      toast.error(`The email or password you entered is incorrect, error ${errorCode}`, toastErrorParams)
      setError('email', { type: 'focus' }, { shouldFocus: true })
      setError('password')
    } else if (errorCode === 401) {
      toast.error(`Unauthorized, please sign in`, toastErrorParams)
    } else {
      toast.error(`Unknown server error, code ${errorCode}`, toastErrorParams)
    }

    dispatch(clearError())
  }, [errorCode])

  const paramsObj = {
    title: {
      required: 'This is required',
    },
    descr: {
      required: 'This is required',
    },
    articleText: {
      required: 'This is required',
    },
    tag: {
      minLength: {
        value: 1,
        message: 'Min length is 1',
      },
      maxLength: {
        value: 50,
        message: 'Max length is 50',
      },
    },
  }

  return (
    <section className="create main__create">
      <ToastContainer />
      <div className="container">
        <div className="create__inner">
          <h2 className="create__title">Create new article</h2>
          <form
            className="create__form"
            onSubmit={handleSubmit(async (formData) => {
              const dataToAdd = { ...formData, tags: [] }

              dataToAdd.tags = Object.keys(dataToAdd)
                .filter((key) => key.includes('tag-')) // Отфильтровываем только те ключи, где значение не пустое
                .map((key) => { 
                  const tagValue = dataToAdd[key]
                  delete dataToAdd[key]
                  return tagValue.trim()
                })
                .filter((tag) => tag.length !== 0)

              const resultAction = await dispatch(addArticle(dataToAdd))

              if (addArticle.fulfilled.match(resultAction)) {
                toast(`🦄 Your article has been created!`)
                // push('/')
              }
            })}
            noValidate
          >
            <label className={classNames('create__label', errors.title && 'create__label--invalid')} htmlFor="title">
              Title
              <input
                className="create__input"
                type="text"
                id="title"
                name="title"
                {...register('title', paramsObj.title)}
                placeholder="Article title"
              />
              <span className="create__invalid-message">{errors.title?.message}</span>
            </label>
            <label className={classNames('create__label', errors.descr && 'create__label--invalid')} htmlFor="descr">
              Short description
              <input
                className="create__input"
                type="text"
                id="descr"
                name="descr"
                {...register('descr', paramsObj.descr)}
                placeholder="Short description"
              />
              <span className="create__invalid-message">{errors.descr?.message}</span>
            </label>
            <label
              className={classNames('create__label', errors.articleText && 'create__label--invalid')}
              htmlFor="articleText"
            >
              Text
              <textarea
                className="create__input create__textarea"
                id="articleText"
                name="articleText"
                {...register('articleText', paramsObj.articleText)}
                placeholder="Article text"
              />
              <span className="create__invalid-message">{errors.articleText?.message}</span>
            </label>
            <label className={classNames('create__label create__label-tags', errors.tag && 'create__label--invalid')}>
              Tags
              {tags.map((tag, index) => createTag(tag, index))}
            </label>
            <button className="create__submit button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}