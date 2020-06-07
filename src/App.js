import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MenuComponent from './components/menu'
import LoginPage from './page/login'
import CharactersList from './page/characters/list'
import CharacterDetail from './page/characters/detail'
import BooksList from './page/books/list'
import BookDetail from './page/books/detail'
import HousesList from './page/houses/list'
import HouseDetail from './page/houses/detail'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import './main.scss'

const App = () => {
    if (localStorage.getItem('userName')) {
        return (
            <Router>
                <MenuComponent />
                <Route exact path='/' component={CharactersList} />
                <Route exact path='/houses' component={HousesList} />
                <Route path='/houses/:id' component={HouseDetail} />
                <Route exact path='/books' component={BooksList} />
                <Route path='/books/:id' component={BookDetail} />
                <Route exact path='/characters' component={CharactersList} />
                <Route path='/characters/:id' component={CharacterDetail} />
            </Router>
        )
    } else
        return (
            <Router>
                <Redirect to='/' />
                <LoginPage />
            </Router>
        )
}

export default App
