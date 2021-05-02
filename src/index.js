import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { reloadAsync } from './features/chooser/choosersSlice'

const root = document.getElementById('sv-redux-root')
if (root) {
    const query     = new URLSearchParams(window.location.search)
    const productId = query.get('product_id')
    if (!productId) {
        window.alert('query parameter \'product_id\' missing or invalid')
    }
    store.dispatch(reloadAsync(productId))

    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      root
    )
}
