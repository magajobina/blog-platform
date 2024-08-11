import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './Header.scss'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link className="header__sitetitle" to="/articles">
          Realworld Blog
        </Link>
        <button className="button header__sign-in" type="button">
          <Link to="/login">Sign In</Link>
        </button>
        <button className="button header__sign-up" type="button">
          <Link to="/register">Sign Up</Link>
        </button>
      </div>
    </header>
  )
}
