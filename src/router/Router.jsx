
import React, {useEffect} from 'react'
import Login from '../pages/Login'
import PrivateRouter from './PrivateRouter'
import { useSelector, useDispatch } from 'react-redux';
import { authUserAction } from '../redux/actions/users';
import {Users} from '../util/api'

const Router = () => {

    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();

    const userAPI = new Users();
    console.log("test")
    userAPI.get()
    .then(async (response) => {
        console.log(response);
    })

    let login = false;
    if (user != null && user.token != null) {
        login = true;
    }else{
      let token = localStorage.getItem("axul_user_token");
      if (token != null ){
          let user_id = localStorage.getItem("axul_user_id");
          dispatch( authUserAction(user_id, token));
      }
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