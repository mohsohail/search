import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './source/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './style.scss';
import App from './App';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
