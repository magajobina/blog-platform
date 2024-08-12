/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import 'react-toastify/dist/ReactToastify.css'
import './LoginPage.scss'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { ToastContainer, toast } from 'react-toastify'
import { clearError, loginUser } from '../../slices/userSlice'

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
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()


  const password = useRef({})
  password.current = watch('password', '')

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
    email: {
      required: 'This is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Entered value does not match email format',
      },
    },
    password: {
      required: 'This is required',
      minLength: {
        value: 6,
        message: 'Min length is 6',
      },
      maxLength: {
        value: 40,
        message: 'Max length is 40',
      },
    },
  }

  return (
    <section className="signup main__signup">
      <ToastContainer />
      <div className="container">
        <div className="signup__inner">
          <h2 className="signup__title">Sign In</h2>
          <form
            className="signup__form"
            onSubmit={handleSubmit(async (formData) => {
              const resultAction = await dispatch(loginUser(formData))

              if (loginUser.fulfilled.match(resultAction)) {
                toast(`🦄 You have been logged in!`)
                push('/')
              }
            })}
            noValidate
          >
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
              Password
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
            <button className="signup__submit button" type="submit">
              Login
            </button>

            <div className="signup__signin">
              Don’t have an account? <Link to="/register">Sign Up.</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
