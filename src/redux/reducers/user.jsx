import {
    USER_LOGIN
} from '../types';

const initialState = {
    user: {},
    login: false,
}

export const userReducer = function(state = initialState, action) {
    console.log(action.payload)
    switch(action.type) {
        case USER_LOGIN:
            return {
                ...state,
                user: action.payload,
                login: true
            }
        default:
            return state;
    }

    return state;
}