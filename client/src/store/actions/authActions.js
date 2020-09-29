import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  GET_GROUPS,
  GET_USERS,
  SET_VIEW
} from './types';


  // Load User
  export const loadUser = () => async dispatch => {
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  
  // Get Users
  export const getUsers = () => async dispatch => {
    try {
      console.log('action')
      const res = await axios.get('/api/auth/users');

      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    } catch (err) {
      // dispatch({ type: AUTH_ERROR });
    }
  };
  
  // Get Groups
  export const getGroups = () => async dispatch => {
    try {
      const res = await axios.get('/api/auth/groups');

      dispatch({
        type: GET_GROUPS,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  
  // Add Group
  export const addGroup = (name) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post('/api/auth/groups', name, config);
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  export const register = (formData) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  
  // Add User
  export const addUser = (formData) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      await axios.post('/api/users/addUser', formData, config);

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login User
  export const login = (formData) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  export const setView = (view) => async dispatch => {
    await dispatch({
      type: SET_VIEW,
      payload: view
    })
  }

  // Logout
  export const logout = () => async dispatch => {await dispatch ({ type: LOGOUT })};

  // Clear Errors
  export const clearErrors = () => async  dispatch => {await dispatch({ type: CLEAR_ERRORS })};