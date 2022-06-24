import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchUsers} from './Features/Users/UserSlice';
store.dispatch(fetchUsers());
ReactDOM.render(<React.StrictMode>
  <Provider store={store}>
      <App />
  </Provider>
</React.StrictMode>, document.getElementById('root'));