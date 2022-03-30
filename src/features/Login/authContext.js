import React from 'react'
import { ACTIONS, AuthReducer, init, initialState } from './authReducer'
import { isEmpty } from 'lodash'
import { SESSION_STORE } from '../../app/constants'
import { any } from 'prop-types'

const AuthContext = React.createContext({})

export default function useAuthContext() {
  return React.useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState, init)

  React.useEffect(() => {
    if (isEmpty(state.token)) {
      let data = localStorage.getItem(SESSION_STORE)
      if (isEmpty(data)) data = sessionStorage.getItem(SESSION_STORE)
      if (!isEmpty(data)) if (data != null) dispatch({ type: ACTIONS.SET_DATA, payload: JSON.parse(data) })
    }
  }, [])

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: any,
}

export { AuthProvider }