import {
    USER_LOGIN
} from '../types';
import {Users} from '../../util/api'
import { loading } from './loading';


export function loginAction(username, password) {
    return async (dispatch) => {
            dispatch(loading(true))
            const userApi = new Users();
            userApi.login({username, password})
            .then(async (response) => {

                const {token, user} = response.data.data;
                
                dispatch( setUserLogin(user, token))

                localStorage.setItem('axul_user_token', token)
                localStorage.setItem("axul_user_id", user.id);
                dispatch(loading(false));

            })
            .catch(async (err) =>{
                console.log("Entra por error 2");
                localStorage.removeItem("axul_user_token");
                localStorage.removeItem("axul_user_id");
                dispatch(loading(false));
            })
    }
}

export function authUserAction(id, token) {
    return async (dispatch) => {
        
        dispatch(loading(true))
            const userApi = new Users();
            userApi.token(id, token)
            .then(async (response) => {

                const {authorization, user} = response.data.data;
                
                if (authorization != 1) {
                    localStorage.removeItem("axul_user_token");
                    localStorage.removeItem("axul_user_id");
                }
                dispatch( setUserLogin(user, token))
                
                localStorage.setItem('axul_user_token', token)
                localStorage.setItem("axul_user_id", user.id);
                dispatch(loading(false));

            })
            .catch(async (err) =>{
                console.log("Entra por error 1");
                localStorage.removeItem("axul_user_token");
                localStorage.removeItem("axul_user_id");
                dispatch(loading(false));
            })
    }
}

const setUserLogin = (user, token) => ({
    type: USER_LOGIN,
    payload: {user, token}
});
