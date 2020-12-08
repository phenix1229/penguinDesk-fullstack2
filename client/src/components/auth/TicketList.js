import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import TicketListItem from './TicketListItem';
import TicketModal from './TicketModal';
import {getTickets} from '../../store/actions/ticketActions';


const TicketList = ({auth:{user, view}, ticketState:{tickets, ticket}, getTickets}) => {
    useEffect(() => {
        getTickets(user.company)
        // eslint-disable-next-line
    }, [view, ticket]);

    if(tickets === null || tickets.length === 0){
        return <h4>No Tickets</h4>
    }

    const ticketList = view === 'groupTickets' ? 
        tickets.filter(ticket => ticket.company === user.company && ticket.assignedGroup === user.group) :
        tickets.filter(ticket => ticket.company === user.company && ticket.assignedTech === user.name);

    const title = view === 'groupTickets' ? 'Open Tickets (Group)' : 'Open Tickets (Assigned)'

    return (
            <div className='ticketList'>
            <h1>
                <span className="text-primary">{title}</span>
            </h1>
            <table>
                <thead>
                    <tr>
                        <th>Ticket Number</th>
                        <th>Open Date</th>
                        <th>Client</th>
                        <th>Issue</th>
                        <th>Assigned Tech</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketList.map(ticket => 
                        <TicketListItem key={ticketList.indexOf(ticket)} ticket={ticket} />)
                    }
                </tbody>
            </table>
            <TicketModal />
            </div>
    )
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    ticketState: state.ticketReducer
});

export default connect(mapStateToProps, {getTickets})(TicketList);