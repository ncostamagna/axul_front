
import React, {Fragment, useState} from 'react'
import Login from '../pages/Login'
import PrivateRouter from './PrivateRouter'
import Spinner from '../components/spinner'
import { useSelector, useDispatch } from 'react-redux';
import { authUserAction } from '../redux/actions/users';
import { loading } from '../redux/actions/loading';
import { useEffect } from 'react';


const Router = () => {

    const user = useSelector(state => state.userReducer.user);
    const load = useSelector(state => state.loadingReducer.loading);
    const dispatch = useDispatch();
    const [login, setLogin] = useState(false);
    console.log(load)
    useEffect(() => {
        if (user != null && user.token != null) {
            setLogin(true);
            dispatch(loading(false))
        }else{
        let token = localStorage.getItem("axul_user_token");
        if (token != null ){
            let user_id = localStorage.getItem("axul_user_id");
            dispatch( authUserAction(user_id, token));
        }
        }
    },[user])
    

    
    console.log(login)
    return (<Fragment>

        {
            load.loading === true?<Spinner />:<div className='container mx-auto'>
            {
                login === true?<PrivateRouter />:<Login />
            }
    </div>


        }
                    
        
        </Fragment>
    )
}

export default Router