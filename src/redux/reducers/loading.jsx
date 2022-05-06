import {
    LOADING
} from '../types';

const initialState = {
    loading: true
}

export const loadingReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }

    return state;
}