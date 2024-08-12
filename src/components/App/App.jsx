/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import ArticlesListPage from '../../pages/ArticlesListPage'
import SingleArticlePage from '../../pages/SingleArticlePage'
import SignUpPage from '../../pages/SignUpPage'
import LoginPage from '../../pages/LoginPage'
import ProfilePage from '../../pages/ProfilePage'
import './App.scss'

export default function App() {

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Switch>
            <Route path="/" exact component={ArticlesListPage} />
            <Route path="/articles" exact component={ArticlesListPage} />
            <Route path="/articles/:slug" component={SingleArticlePage} />
            <Route path="/register" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}