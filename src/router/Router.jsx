
import React, {useEffect} from 'react'
import Login from '../pages/Login'
import PrivateRouter from './PrivateRouter'
import { useSelector } from 'react-redux';

const Router = () => {

    const user = useSelector(state => state.userReducer.user);

    let login = false;
    if (user != null && user.token != null) {
        login = true;
    }

    let token = localStorage.getItem("user_token");
    if (token != null ){
        login = true
    }

    return (
        <div className='container mx-auto'>
                {
                    login === true?<PrivateRouter />:<Login />
                }
        </div>
    )
}

export default Router