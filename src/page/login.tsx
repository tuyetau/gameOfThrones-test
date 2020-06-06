import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import loginService from '../services/login-service'
import lang from '../i18n/lang.json'
import { showNotification } from '../common/notification'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
}

const LoginPage = () => {
    const [state, setState] = useState({
        error: '',
    })

    const login = async (values: any) => {
        try {
            const account = await loginService.login(
                values?.username,
                values?.password
            )
            if (account) {
                localStorage.setItem('userName', account)
                window.location.href = '/'
            } else {
                setState((s) => ({
                    ...s,
                    error: 'Incorrect userName or password',
                }))
            }
        } catch (error) {
            showNotification()
        }
    }

    return (
        <Form
            {...layout}
            style={{ marginTop: 30 }}
            name='basic'
            initialValues={{ remember: true }}
            onFinish={login}
        >
            <Form.Item
                label={lang.login.username}
                name='username'
                rules={[
                    { required: true, message: lang.notification.username },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={lang.login.password}
                name='password'
                rules={[
                    { required: true, message: lang.notification.password },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <div style={{ textAlign: 'center', color: '#f5222d' }}>
                {state.error}
            </div>
            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    {lang.button.login}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginPage
