/* eslint-disable react/prop-types */
import AuthContext from "../AuthContext/AuthContext"

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
