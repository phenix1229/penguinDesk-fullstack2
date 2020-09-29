import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';


const TicketItem = ({onUpdate, handleCloseTicket, ticket})=> {
    return(
        <div  className="ui card" style={{width:'75vw', padding:'20px'}}>
            <div className="content">
                
                <br />
                <div className="meta">Opened By: {ticket.openedBy}</div>
                <div className="meta">Open Date: {ticket.openDate}</div>
                <br />
                <div className="meta">Client: {ticket.client}</div>
                <div className="meta">Issue: {ticket.issue}</div>
                {ticket.comments.length > 0 && <br />}
                {ticket.comments.length > 0 && <div className="meta">Comments: {ticket.comments.map((item, idx) => {
                    return (
                        <p key={ticket.comments.indexOf(item)}>{item}</p>
                    )
                })}</div>}
                {ticket.open === false && <br />}
                {ticket.open === false && <div className="meta">Resolution: {ticket.resolution}</div>}
                {ticket.open === false && <br />}
                {ticket.open === false && <div className="meta">Closed By: {ticket.closedBy}</div>}
                {ticket.open === false && <div className="meta">Close Date: {ticket.closeDate}</div>}
                <br />
                {ticket.open === true && <Button className="ui primary button" style={{ margin:'10px 15px'}} onClick={()=>{
                    return handleCloseTicket(ticket._id)
                }}>
                    Close
                </Button>}
                {ticket.open === true && <Button className="ui green button" style={{ margin:'10px 15px'}} onClick={()=>{
                    return onUpdate(ticket._id)
                }}>
                    Update
                </Button>}
            </div> 
        </div>
    )
};

TicketItem.propTypes = {
    onUpdate: PropTypes.func,
    handleCloseTicket: PropTypes.func,
    ticket: PropTypes.shape({
        openedBy: PropTypes.string.isRequired,
        client: PropTypes.string.isRequired,
        issue: PropTypes.string.isRequired,
        resolution: PropTypes.string.isRequired,
        closedBy: PropTypes.string.isRequired,
        closeDate: PropTypes.string.isRequired,
      })
}

export default TicketItem;