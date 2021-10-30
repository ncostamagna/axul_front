import React from 'react'
import Login from './pages/Login'
import Router from './router/Router'

import { Provider } from 'react-redux';
import store from './redux';

const App = () => {
    let login = false;

    return (
        <Provider store={store}>
            <div className='container mx-auto'>
                {
                    login === true?<Router />:<Login />
                }
            </div>
        </Provider>
    )
}

export default App