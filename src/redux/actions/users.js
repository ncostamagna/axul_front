import {
    USER_LOGIN
} from '../types';
import {Users} from '../../util/api'



export function loginAction(username, password) {
    return async (dispatch) => {
        
            const userApi = new Users();
            userApi.login({username, password})
            .then(async (response) => {

                const {token, user} = response.data.data;

                console.log(token, user);
                
                dispatch( setUserLogin(user, token))
                localStorage.setItem('user_token', token)

                delete user.password;
                localStorage.setItem("user", JSON.stringify(user));

            })
            .catch(async (err) =>{
                localStorage.removeItem("user_token");
                localStorage.removeItem("user");
            })
    }
}

const setUserLogin = (user, token) => ({
    type: USER_LOGIN,
    payload: {user, token}
});
