import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeOutlined, LogoutOutlined, BulbOutlined } from '@ant-design/icons'
import { Clock } from '../../components'
import { ROUTES } from '../../app/constants'
import useTheme from '../../app/theme'
import useAuth from '../Login/authReducer'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const {
    state: AuthState,
    actions: { logout },
  } = useAuth()
  const isDark = React.useMemo(() => theme === 'dark', [theme])

  const logo = 'https://digitalservices.lk/wp-content/uploads/2021/04/DIGI-LOGO-2.png'

  return (
    <Layout.Header className={`header`} style={{ backgroundColor: isDark ? '#141414' : 'white' }}>
      <Menu mode="horizontal" selectedKeys={[location.pathname]} triggerSubMenuAction={'click'}>
        <Menu.Item key={'logo'} onClick={() => navigate(ROUTES.HOME)}>
          <img key={`${isDark}`} src={logo} alt="logo" />
        </Menu.Item>
        <Menu.Item key={ROUTES.HOME} icon={<HomeOutlined />} onClick={() => navigate(ROUTES.HOME)}>
          Home
        </Menu.Item>
        <Menu.Item key={'clock'} style={{ marginLeft: 'auto', color: 'black !important' }}>
          <Clock format={'h:mm:ss a'} />
        </Menu.Item>
        <Menu.SubMenu
          key={'profile'}
          title={AuthState?.user?.name}
          icon={
            <img
              src={`https://avatars.dicebear.com/api/micah/${AuthState?.user?.name}.svg?radius=10&size=30&backgroundColor=white&scale=80`}
              alt=""
            />
          }
        >
          <Menu.Item key={1} onClick={toggleTheme} icon={<BulbOutlined />}>
            {isDark ? 'Light' : 'Dark'} mode
          </Menu.Item>
          <Menu.Item key={2} onClick={logout} icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Header>
  )
}
