/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import ArticlesListPage from '../../pages/ArticlesListPage'
import SingleArticlePage from '../../pages/SingleArticlePage'
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
          </Switch>
        </main>
      </div>
    </Router>
  )
}
