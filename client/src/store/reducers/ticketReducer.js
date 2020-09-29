import {
    COUNT_TICKETS,
    LOAD_OPEN_TICKETS,
    LOAD_CLOSED_TICKETS,
    LOAD_TICKET,
    CLEAR_TICKET,
    CLOSE_TICKET,
    UPDATE_TICKET,
    EDIT_TICKET
} from '../actions/types';

const initialState = {
    closedTickets: null,
    tickets: null,
    ticket: null,
    edit: null,
    ticketCounts: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_OPEN_TICKETS:
            return {
                ...state,
                tickets: action.payload
            };
        case LOAD_TICKET:
            return {
                ...state,
                ticket: action.payload
            };
        case CLEAR_TICKET:
            return {
                ...state,
                ticket: null,
                edit: null
            };
        case EDIT_TICKET:
            return {
                ...state,
                ticket: action.payload,
                edit: true
            };
        case UPDATE_TICKET:
            return {
                ...state,
                edit: null,
                // ticket: null
            };
        default:
      return state;
    }
};