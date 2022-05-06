import {
    CONTACTS
} from '../types';

const initialState = {
    contacts: [],
}

export const contactReducer = function(state = initialState, action) {
    switch(action.type) {
        case CONTACTS:
            return {
                ...state,
                contacts: action.payload.contacts
            }
        default:
            return state;
    }

    return state;
}