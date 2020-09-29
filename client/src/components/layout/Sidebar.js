import React from 'react';
import {connect} from 'react-redux';
import {setView} from '../../store/actions/authActions';
import Search from './Search';
// import Dashboard from '../Dashboard';


const Sidebar = ({auth:{isAdmin}, setView}) => {
    const adminButtons = (
        <>
        <input type="submit" value="New User" className="btn btn-primary btn-block" onClick={() => setView('register')} />
        <input type="submit" value="New Group" className="btn btn-primary btn-block" onClick={() => setView('newGroup')} />
        </>
    )


        return (
            <>
                <Search />
                <br /> 
                {isAdmin && adminButtons}
                <input type="submit" value="New Ticket" className="btn btn-primary btn-block" onClick={() => setView('newTicket')} />
                <input type="submit" value="Open Tickets" className="btn btn-primary btn-block" onClick={() => setView('groupTickets')} />
                <input type="submit" value="Assigned Tickets" className="btn btn-primary btn-block" onClick={() => setView('assignedTickets')} />
            </>
        )
}


const mapStateToProps = (state) => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, {setView})(Sidebar);