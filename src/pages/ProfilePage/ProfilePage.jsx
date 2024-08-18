/* eslint-disable react/jsx-props-no-spreading */

import './ProfilePage.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import classNames from 'classnames'
import { ToastContainer, toast } from 'react-toastify'
import { clearError, updateUser, getCurrentUser } from '../../slices/userSlice'

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

export default function SignUpPage() {
  const { push } = useHistory()
  const dispatch = useDispatch()
  const errorCode = useSelector((state) => state.user.errorCode)
  const userData = useSelector((state) => state.user.userData)

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      image: '',
    },
  })

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  useEffect(() => {
    if (!errorCode) return

    if (errorCode === 401) {
      push('/login')
    } else {
      toast.error(`You have probably entered existing profile information, code ${errorCode}, `, toastErrorParams)
      setError('username', { type: 'focus' }, { shouldFocus: true })
      setError('email')
      dispatch(clearError())
    }
  }, [errorCode])

  useEffect(() => {
    if (userData) {
      reset({
        username: userData.username || '',
        email: userData.email || '',
        password: '',
        image: userData.image || '',
      })
    }
  }, [userData])

  const paramsObj = {
    name: {
      required: 'This is required',
      minLength: {
        value: 3,
        message: 'Min length is 3',
      },
      maxLength: {
        value: 20,
        message: 'Max length is 20',
      },
    },
    email: {
      required: 'This is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Entered value does not match email format',
      },
    },
    password: {
      required: false,
      minLength: {
        value: 6,
        message: 'Min length is 6',
      },
      maxLength: {
        value: 40,
        message: 'Max length is 40',
      },
    },
    image: {
      required: false,
      pattern: {
        value:
          /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[\w\d-]*)?$/i,
        message: 'Entered value does not match URL format',
      },
    },
  }

  return (
    <section className="signup main__signup">
      <ToastContainer />
      <div className="container">
        <div className="signup__inner">
          <h2 className="signup__title">Edit Profile</h2>
          <form
            className="signup__form"
            onSubmit={handleSubmit(async (formData) => {
              const resultAction = await dispatch(updateUser(formData))

              if (updateUser.fulfilled.match(resultAction)) {
                toast(`🦄 Your profile has been successfully updated!`)
              }
            })}
            noValidate
          >
            <label
              className={classNames('signup__label', errors.username && 'signup__label--invalid')}
              htmlFor="username"
            >
              Username
              <input
                className="signup__input"
                type="text"
                id="username"
                {...register('username', paramsObj.name)}
                placeholder="Username"
              />
              <span className="signup__invalid-message">{errors.username?.message}</span>
            </label>
            <label className={classNames('signup__label', errors.email && 'signup__label--invalid')} htmlFor="email">
              Email address
              <input
                className="signup__input"
                type="email"
                id="email"
                {...register('email', paramsObj.email)}
                placeholder="Email address"
              />
              <span className="signup__invalid-message">{errors.email?.message}</span>
            </label>
            <label
              className={classNames('signup__label', errors.password && 'signup__label--invalid')}
              htmlFor="password"
            >
              New password
              <input
                className="signup__input"
                type="password"
                id="password"
                name="password"
                {...register('password', paramsObj.password)}
                placeholder="Password"
              />
              <span className="signup__invalid-message">{errors.password?.message}</span>
            </label>
            <label className={classNames('signup__label', errors.image && 'signup__label--invalid')} htmlFor="image">
              Avatar image (url)
              <input
                className="signup__input"
                type="url"
                id="image"
                name="image"
                {...register('image', paramsObj.image)}
                placeholder="Avatar image"
              />
              <span className="signup__invalid-message">{errors.image?.message}</span>
            </label>
            <button className="signup__submit button" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
