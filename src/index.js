import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // Провайдер обновит наше приложение при изменении store. Если
  // подробнее, то после того как один из дочерних компонентов вызовет
  // dispatch то тогда провайдер об этом узнает и обновит оставшуюся часть приложения
  <Provider store={store}>
    <App />
  </Provider>
)
