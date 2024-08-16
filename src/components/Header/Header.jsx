/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './Header.scss'
import { useSelector } from 'react-redux'
import LoggedOutHeader from './LoggedOutHeader'
import LoggedInHeader from './LoggedInHeader'

export default function Header() {
  const isLoggedIn = !!useSelector((state) => state.user.userData.token)

  return (
    <header className="header">
      <div className="container">
        <Link className="header__sitetitle" to="/articles">
          Realworld Blog
        </Link>
        {isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader/>}
      </div>
    </header>
  )
}
