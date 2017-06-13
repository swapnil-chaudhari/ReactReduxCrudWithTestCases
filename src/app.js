import React from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'src/store';
import Routes from 'src/routes';
import 'src/app.scss';
import { syncHistoryWithStore } from 'react-router-redux';

const App = () => {
    const history = syncHistoryWithStore(browserHistory, store);

    return (
        <Provider store={ store }>
            <Routes history={ browserHistory } />
        </Provider>
    );
};

export default App;
