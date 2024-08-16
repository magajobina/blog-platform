/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min'

/* eslint-disable react/prop-types */
export default function PrivateRoute({ children, ...rest }) {
  const { token } = useSelector((state) => state.user.userData)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
