import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {newTicket} from '../../store/actions/ticketActions';
import {clearErrors, getUsers, getGroups} from '../../store/actions/authActions';
import {setAlert} from '../../store/actions/alertActions';
import Dropdown from '../layout/Dropdown';


const NewTicket = ({auth:{error, groups, users, user}, clearErrors, setAlert, getGroups, getUsers, newTicket}) => {

  useEffect(() => {

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    getGroups();
    getUsers();
    // eslint-disable-next-line
  }, [error, getGroups]
  );

    const [ticket, setTicket] = useState({
        client:'',
        issue:'',
        assignedTech:'',
        assignedGroup:''
    });

    const {openedBy, client, issue, assignedTech, assignedGroup} = ticket;
    
    const onChange = e => setTicket({...ticket, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (client === '' || issue === '' || assignedGroup === '') {
            setAlert('Please enter Client, Issue, and Assigned Group', 'danger');
          } else {
            newTicket({
                openedBy:user.email,
                client,
                issue,
                assignedTech,
                assignedGroup
            });
          }
          setTicket({
            client:'',
            issue:'',
            // assignedTech:'',
            // assignedGroup:''
          })
          document.getElementById('assignedTech').value='';
          document.getElementById('assignedGroup').value='';
    }

    return (
        <div className="registerForm">
        <h1>
            <span className="text-primary">New Ticket</span>
        </h1>
        <form>
            <div className="form-group">
                <label htmlFor="client">Client</label>
                <input type="text" id="client" name="client" value={client} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="issue">Issue</label>
                <input type="text" name="issue" value={issue} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Assigned Group:</label>
              <Dropdown title={'assignedGroup'} options={groups} onChange={onChange}/>
            </div>
            <div className="form-group">
              <label>Assigned Tech:</label>
              <Dropdown title={'assignedTech'} options={users} onChange={onChange}/>
            </div>
            <input type="submit" value="Create Ticket" className="btn btn-primary btn-block" onClick={onSubmit} />
        </form>
            
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.authReducer,
    alert: state.alertReducer
})

export default connect(mapStateToProps, {getUsers, clearErrors, setAlert, getGroups, newTicket})(NewTicket);