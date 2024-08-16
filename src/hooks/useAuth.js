import { useSelector } from 'react-redux'

export default function useAuth() {
  const { token } = useSelector((state) => state.user.userData)
  return {
    user: token ? { token } : null, // Если токен есть, считаем пользователя авторизованным
  }
}
