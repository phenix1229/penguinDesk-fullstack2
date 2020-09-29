import React  from 'react';
import {searchIt} from '../services/search';
import TicketItem from './TicketItem';
import PropTypes from 'prop-types';

const Tickets = (props) => {
  
  if(props.tickets.length > 0){
    return (
      <div>
        <br />
        {props.tickets
        .filter(searchIt(props.searchTerm))
        .map((ticket,idx)=>{
          return (
            <TicketItem  key={ticket._id} handleCloseTicket={props.handleCloseTicket} onUpdate={props.onUpdate} ticket={ticket} />
          )
        })}
        <br />
      </div>
      )
    } else {
      return null
    }
};

Tickets.propTypes = {
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  searchTerm: PropTypes.string,
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      openedBy: PropTypes.string.isRequired,
      client: PropTypes.string.isRequired,
      issue: PropTypes.string.isRequired,
      resolution: PropTypes.string.isRequired,
      closedBy: PropTypes.string.isRequired,
      closeDate: PropTypes.string.isRequired,
    })
  )
};

export default Tickets;