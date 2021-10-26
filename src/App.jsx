import React from 'react'
import Login from './components/login/Login'
import Router from './components/router/Router'

import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    let login = false;

    return (
        <Provider store={store}>
            <div className='container mx-auto'>
                {
                    login == true?<Router />:<Login />
                }
            </div>
        </Provider>
    )
}

export default App