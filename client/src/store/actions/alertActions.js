import {v4 as uuidv4} from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types';


// Set Alert
export const setAlert = (msg, type, timeout = 5000) => async dispatch => {
  
  try {
    const id = uuidv4();
    await dispatch({
      type: SET_ALERT,
      payload: {msg, type, id},
    });

    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
  } catch (error) {
    
  }
};