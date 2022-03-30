import React from 'react'
import { AppContainerReducer, initState, initializeState } from './appReducer'
import { any } from 'prop-types'

const AppContext = React.createContext({})

export default function useAppContext() {
  return React.useContext(AppContext)
}

export function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(AppContainerReducer, initState, initializeState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: any,
}
