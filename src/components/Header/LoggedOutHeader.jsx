import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function LoggedOutHeader() {
  return (
    <>
      <button className="button header__sign-in" type="button">
        <Link to="/login">Sign In</Link>
      </button>
      <button className="button header__sign-up" type="button">
        <Link to="/register">Sign Up</Link>
      </button>
    </>
  )
}
