import React from 'react'
import Login from './components/login/Login'
import Router from './components/router/Router'


const App = () => {
    let login = false;

    return (
        <div className='container mx-auto'>
            {
                login == true?<Router />:<Login />
            }
        </div>
    )
}

export default App