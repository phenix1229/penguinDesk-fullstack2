import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    GET_GROUPS,
    GET_USERS,
    SET_VIEW
  } from '../actions/types';

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null,
    user: null,
    groups: null,
    users: null,
    view: null,
    isAdmin: null
};
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload,
          isAdmin: action.payload.isAdmin
        };
      case GET_USERS:
        return {
          ...state,
          users: action.payload
        }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false
        };
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload,
          view: null,
          groups: null,
          users: null
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
      case GET_GROUPS:
        return {
          ...state,
          groups: action.payload
        };
      case SET_VIEW:
        return {
          ...state,
          view: action.payload,
          isAuthenticated: true
        };
      default:
        return state;
    }
  };