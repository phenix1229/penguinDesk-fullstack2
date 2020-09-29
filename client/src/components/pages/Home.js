import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../layout/Sidebar';
import Register from '../auth/Register';
import AddGroup from '../auth/AddGroup';
import NewTicket from '../auth/NewTicket';
import TicketList from '../auth/TicketList';

import {loadUser} from '../../store/actions/authActions';


function Home({auth:{isAuthenticated, view}, props:{history}, loadUser}) {
    useEffect(() => {
        if (isAuthenticated) {
            loadUser();  
        } else {
            history.push('/login');
        };
        // eslint-disable-next-line
    }, [isAuthenticated]);

        return (
            <>
                <div  id='sidebar'>
                    <Sidebar />
                </div>
                <div id="main">
                    {view === 'register' && <Register />}
                    {view === 'newGroup' && <AddGroup />}
                    {view === 'newTicket' && <NewTicket />}
                    {(view === 'groupTickets' || view === 'assignedTickets') && <TicketList />}
                </div>
            </>
        )
};


const mapStateToProps = (state, ownProps) => ({
    auth: state.authReducer,
    bookState: state.bookReducer,
    props: ownProps
})

export default connect(mapStateToProps, {loadUser})(Home)