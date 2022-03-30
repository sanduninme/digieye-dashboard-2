import React from 'react'
import { Navigate } from 'react-router-dom'
import { Button, Card, Checkbox, Form, Input, Layout } from 'antd'
import { isEmpty } from 'lodash'
import { ROUTES } from '../../app/constants'
import './index.scss'
import useAuth from './authReducer'

export default function Login() {
  const {
    state: AuthState,
    actions: { login },
  } = useAuth()

  React.useEffect(() => {
    document.title = `Digis | Login`
  }, [])

  const formItemLayout = {
    labelCol: {
      xs: { span: 18 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

  if (isEmpty(AuthState.token))
    return (
      <Layout className={`login-wrapper`}>
        <Card
          hoverable
          cover={<img alt="Digis" src="https://digitalservices.lk/wp-content/uploads/2021/04/DIGI-LOGO-2.png" />}
        >
          <Form {...formItemLayout} name="basic" initialValues={{ remember: true }} onFinish={login}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" className={'form-item-remember-me'}>
              <div className={'remember-me-wrapper'}>
                <Checkbox>Remember me</Checkbox>
              </div>
            </Form.Item>

            <Form.Item style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit" loading={AuthState.loginLoading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout>
    )
  else return <Navigate to={ROUTES.HOME} replace />
}
