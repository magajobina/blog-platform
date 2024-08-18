/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import LoggedOutHeader from './LoggedOutHeader'
import LoggedInHeader from './LoggedInHeader'
import { resetPaginationPage } from '../../slices/mainSlice'

export default function Header() {
  const dispatch = useDispatch()
  const isLoggedIn = !!useSelector((state) => state.user.userData.token)

  return (
    <header className="header">
      <div className="container">
        <Link
          className="header__sitetitle"
          onClick={() => {
            console.log(dispatch(resetPaginationPage()))
          }}
          to="/articles"
        >
          Realworld Blog
        </Link>
        {isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
      </div>
    </header>
  )
}
