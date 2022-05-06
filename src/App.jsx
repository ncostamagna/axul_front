import React from 'react'
import Router from './router/Router'

import { Provider } from 'react-redux';
import store from './redux';

import './style/buttons.css';

const App = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

export default App