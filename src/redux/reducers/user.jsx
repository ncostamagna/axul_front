import {
    USER_LOGIN
} from '../types';

const initialState = {
    user: {},
    login: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOGIN:
            return {
                ...state,
                user: {name: 'lala'},
                login: true
            }
        default:
            return state;
    }
}