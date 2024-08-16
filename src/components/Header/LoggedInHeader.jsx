import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/img/avatar.png'
import { deleteUser } from '../../slices/userSlice'

const deleteUserFromLocal = () => {
  try {
    localStorage.removeItem('user')
    console.log('Удалено из localStorage')
  } catch {
    console.error('Ошибка удаления user из localStorage')
  }
}

export default function LoggedInHeader() {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.userData.username)
  const userImage = useSelector((state) => state.user.userData.image)
  const { push } = useHistory()

  return (
    <>
      <button className="button header__create-art" type="button">
        <Link to="/new-article">Create article</Link>
      </button>
      <button className="button header__user-box" type="button">
        <Link to="/profile" className="header__user-info">
          {username}
          <div className="header__user-avatar">
            <img src={userImage || avatar} alt="user avatar" />
          </div>
        </Link>
      </button>
      <button
        onClick={() => {
          deleteUserFromLocal()
          dispatch(deleteUser())
          push('/')
        }}
        className="button header__log-out"
        type="button"
      >
        Log Out
      </button>
    </>
  )
}
