import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppContainer from './features/App'
import { ROUTER_ROUTES } from './app/constants'
import NotFound from './features/NotFound'
import './App.scss'
import useTheme from './app/theme'
import Home from './features/Home'
import Login from './features/Login'

function App() {
  const { theme, setTheme } = useTheme()
  React.useEffect(() => setTheme(theme), [])

  return (
    <BrowserRouter basename={ROUTER_ROUTES.BASE}>
      <Routes>
        <Route path={ROUTER_ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTER_ROUTES.INDEX} element={<AppContainer />}>
          <Route index element={<Home />} />
          <Route path={ROUTER_ROUTES.HOME} element={<Home />} />
        </Route>
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
