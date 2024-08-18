import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import ArticlesListPage from '../../pages/ArticlesListPage'
import SingleArticlePage from '../../pages/SingleArticlePage'
import SignUpPage from '../../pages/SignUpPage'
import LoginPage from '../../pages/LoginPage'
import ProfilePage from '../../pages/ProfilePage'
import CreateArticlePage from '../../pages/CreateArticlePage'
import PrivateRoute from '../PrivateRoute'
import EditArticlePage from '../../pages/EditArticlePage'

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Switch>
            <Route path="/" exact component={ArticlesListPage} />
            <Route path="/articles" exact component={ArticlesListPage} />
            <Route path="/articles/:slug" exact component={SingleArticlePage} />
            <Route path="/articles/:slug/edit" exact component={EditArticlePage} />
            <Route path="/register" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage} />
            <PrivateRoute path="/new-article">
              <CreateArticlePage />
            </PrivateRoute>
          </Switch>
        </main>
      </div>
    </Router>
  )
}
