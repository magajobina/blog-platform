/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import './SignUpPage.scss'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import classNames from 'classnames'
import { registerUser } from '../../slices/userSlice'

export default function SignUpPage() {
  const { push } = useHistory()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const password = useRef({})
  password.current = watch('password', '')

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
    passwordRepeat: {
      validate: (value) => value === password.current || 'The passwords do not match',
    },
    checkbox: {
      required: 'Check the box to continue',
    },
  }

  return (
    <section className="signup main__signup">
      <div className="container">
        <div className="signup__inner">
          <h2 className="signup__title">Create new account</h2>
          <form
            className="signup__form"
            onSubmit={handleSubmit(async (formData) => {
              const resultAction = await dispatch(registerUser(formData))

              if (registerUser.fulfilled.match(resultAction)) push('/')
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
            <label
              className={classNames('signup__label', errors.passwordRepeat && 'signup__label--invalid')}
              htmlFor="passwordRepeat"
            >
              Repeat Password
              <input
                className="signup__input"
                type="password"
                id="passwordRepeat"
                name="passwordRepeat"
                {...register('passwordRepeat', paramsObj.passwordRepeat)}
                placeholder="Password"
              />
              <span className="signup__invalid-message">{errors.passwordRepeat?.message}</span>
            </label>
            <hr />
            <label className={classNames('signup__agree', errors.agree && 'signup__label--invalid')} htmlFor="agree">
              <input
                className="signup__agree-input"
                type="checkbox"
                id="agree"
                {...register('agree', paramsObj.checkbox)}
              />
              I agree to the processing of my personal information
              <span className="signup__invalid-message">{errors.agree?.message}</span>
            </label>
            <button className="signup__submit button" type="submit">
              Create
            </button>
            <div className="signup__signin">
              Already have an account? <Link to="/login">Sign In.</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
