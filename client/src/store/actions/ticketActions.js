import axios from 'axios';
import {
    COUNT_TICKETS,
    LOAD_OPEN_TICKETS,
    LOAD_CLOSED_TICKETS,
    LOAD_TICKET,
    CLEAR_TICKET,
    CLOSE_TICKET,
    UPDATE_TICKET,
    EDIT_TICKET

} from './types';

export const countTickets = () => async dispatch => {
    try {
        await axios.get('/tickets').then((tickets) => {
            let openTickets = 0;
            let closedTickets = 0;
            tickets.data.forEach((item) => {
                if(item.open === true){
                    openTickets++
                } else {
                    closedTickets++
                }
            });
            const result = [openTickets, closedTickets];

            dispatch ({
                type: COUNT_TICKETS,
                payload: result
            })
        })
    } catch (error) {
        
    }
};

export const getTickets = (company) => async dispatch =>{
    try {
        console.log('action')
        const res = await axios.get(`api/tickets/${company}`)

        dispatch ({
            type: LOAD_OPEN_TICKETS,
            payload: res.data
        })
    } catch (error) {
        
    }
    
};

export const loadClosedTickets = () => async dispatch => {
    try {
        const res = await axios.get('/tickets').then((tickets) => {
            const closedTickets = tickets.data.filter((item) => {
                return item.open === false
            })
        })

        dispatch ({
            type: LOAD_CLOSED_TICKETS,
            payload: res
        })
    } catch (error) {
        
    }
};

export const loadTicket = (ticket) => async dispatch => {
    try {
        dispatch ({
            type: LOAD_TICKET,
            payload: ticket
        })
    } catch (error) {
        
    }
};

export const clearTicket = () => async dispatch => {
    try {
        dispatch ({
            type: CLEAR_TICKET
        })
    } catch (error) {
        
    }
};

export const newTicket = (ticket) => async dispatch => {

    let axiosConfig = {
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*'
        }
    };
    try {
        axios.post('api/tickets', ticket, axiosConfig)
            // this.countTickets();
    } catch (error) {
        
    }
    
};

export const updateTicket = (ticket) => async dispatch => {

    console.log(ticket)

    let axiosConfig = {
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*'
        }
    };
    axios.put(`api/tickets/${ticket._id}`, ticket, axiosConfig);

    dispatch ({
        type: UPDATE_TICKET
    })
};

export const editTicket = (ticket) => async dispatch => {
    try {
        dispatch ({
            type: EDIT_TICKET,
            payload: ticket
        })
    } catch (error) {
        
    }
    
}

export const closeTicket = (ticket, id) => async dispatch => {

    let axiosConfig = {
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*'
        }
    };
    axios.put(`/ticket/${id}`, ticket, axiosConfig)
        // this.countTickets();
};