import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './containers/App';
import hakboard from './containers/reducers';
import { createStore } from 'redux';
import * as serviceWorker from './serviceWorker';

import './assets/css/sass/main.scss';
import './assets/css/bootstrap.css';

const store = createStore(hakboard);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
