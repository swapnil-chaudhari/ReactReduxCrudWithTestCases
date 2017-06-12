import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes';
import './app.scss';
import { syncHistoryWithStore } from 'react-router-redux';

if (!window.Intl)
    window.Intl = require('intl');

const history = syncHistoryWithStore(browserHistory, store);

const App = () =>
    <Provider store={ store }>
        <Router history={ history }>
            { routes }
        </Router>
    </Provider>;

export default App;
