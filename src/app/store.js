import React from 'react'
import { AppProvider } from '../features/App/appContext'
import { any } from 'prop-types'
import { AuthProvider } from '../features/Login/authContext'

function Store({ children }) {
  return (
    <AuthProvider>
      <AppProvider>{children}</AppProvider>
    </AuthProvider>
  )
}

Store.propTypes = {
  children: any,
}
export default Store
