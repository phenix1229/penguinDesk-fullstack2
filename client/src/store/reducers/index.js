import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import ticketReducer from './ticketReducer';

export default combineReducers(
    {
        authReducer,
        alertReducer,
        ticketReducer
    }
)