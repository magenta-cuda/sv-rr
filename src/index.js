import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { reloadAsync } from './features/chooser/choosersSlice'

const query = new URLSearchParams(window.location.search)
let productId = query.get('product_id')
if (!productId) {
    // TODO:
}
store.dispatch(reloadAsync(productId))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
