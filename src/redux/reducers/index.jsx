import { combineReducers } from 'redux';
import {userReducer} from './user'
import {loadingReducer} from './loading'
import {contactReducer} from './contacts'

export default combineReducers({
    userReducer,
    loadingReducer,
    contactReducer,
});