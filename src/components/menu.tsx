import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import lang from '../i18n/lang.json'

const MenuComponent = () => {
    return (
        <Menu theme='dark' selectedKeys={[]} mode='horizontal'>
            <Menu.Item key='chac'>
                <Link to='/characters'>{lang.menu.characters}</Link>
            </Menu.Item>
            <Menu.Item key='books'>
                <Link to='/books'>{lang.menu.books}</Link>
            </Menu.Item>
            <Menu.Item key='houses'>
                <Link to='/houses'>{lang.menu.houses}</Link>
            </Menu.Item>
            <Menu.Item key='logout' style={{ float: 'right' }} onClick={logOut}>
                <Link to='/'>{lang.menu.logout}</Link>
            </Menu.Item>
            <Menu.Item
                key='username'
                style={{ float: 'right', color: '#fff', cursor: 'unset' }}
            >
                {localStorage.getItem('userName')}
            </Menu.Item>
        </Menu>
    )
}

const logOut = () => {
    localStorage.clear()
    window.location.href = '/'
}

export default MenuComponent
