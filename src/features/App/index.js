import React from 'react'
import Header from './Header'
import { Layout, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import useApp from './appReducer'
import './index.scss'

export default function App() {
  const { appState: state } = useApp()

  return (
    <Spin spinning={state.loading} size={'large'}>
      <Layout className={'app-container'}>
        <Header />
        <Layout.Content className={`content`}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer className={`footer`}>Cybersafe (Pvt) Ltd.</Layout.Footer>
      </Layout>
    </Spin>
  )
}
