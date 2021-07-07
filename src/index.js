import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Toaster } from 'react-hot-toast';

import App from './components/App.js';
import reducers from './reducers/index.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const notificationOptions= {
    style: {
        border: '1px solid lightgrey',
    }
};

ReactDOM.render(
    <Provider store={store}>
        <Toaster position="top-center" toastOptions={ notificationOptions } containerClassName="toaster" />
        <App />
    </Provider>,
    document.getElementById('root')
);