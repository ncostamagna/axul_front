import {
    USER_LOGIN
} from '../types';
import {Users} from '../../util/api'



export function loginAction(username, password) {
    return async (dispatch) => {
        
            const userApi = new Users();
            // insertar en la API
            userApi.login({username, password})
            .then(async (response) => {

                const {token, user} = response.data.data;

                console.log(token, user);
                
                dispatch( setUserLogin(user, token))
            })
            .catch(async (err) =>{})
    }
}

const setUserLogin = (user, token) => ({
    type: USER_LOGIN,
    payload: {user, token}
});
