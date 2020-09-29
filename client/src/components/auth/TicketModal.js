import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import Dropdown from '../layout/Dropdown';
import { clearTicket, updateTicket, editTicket, loadTicket, getTickets } from '../../store/actions/ticketActions';
import { getGroups, getUsers } from '../../store/actions/authActions';
import {loadUser} from '../../store/actions/authActions';

const today = () =>{
    return `${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()} (${new Date().getHours()}:${new Date().getMinutes()})`;
  };

const TicketModal = ({ticketState:{ticket, edit}, auth:{groups, users}, clearTicket, updateTicket, editTicket, getGroups, getUsers, getTickets}) => {
    useEffect(() => {
        if (ticket !== null) {
          setTick(ticket);
        } else {
          setTick({
            ticketNumber:'',
            openedBy:'',
            openDate:'',
            client:'',
            clientLocation:'',
            issue:'',
            status:'',
            assignedGroup:'',
            assignedTech:'',
            comments:[],
            resolution:''
          });
        }
        getGroups();
        getUsers();
      }, [ticket, edit, getUsers, getGroups]);
    
      const [tick, setTick] = useState({
            ticketNumber:'',
            openedBy:'',
            openDate:'',
            client:'',
            clientLocation:'',
            issue:'',
            status:'',
            assignedGroup:'',
            assignedTech:'',
            comments:[],
            resolution:''
      });
    
      const {
        ticketNumber,
        openedBy,
        openDate,
        client,
        clientLocation,
        issue,
        status,
        assignedGroup,
        assignedTech,
        comments,
        resolution
      } = tick;

    const [newComment, setNewComment] = useState ({
        newC:false
    })

    const {newC} = newComment;

    const [tempComment, setTempComment] = useState ({
        dateString:today(),
        commentString: ''
    })

    const {dateString, commentString} = tempComment;
    
    const onChange = e =>
        setTick({ ...tick, [e.target.name]: e.target.value });
    
    const onChangeTemp = e =>
        setTempComment({ ...tempComment, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();
            if(commentString){
                comments.push(`${dateString} - ${commentString}`)
            }
            updateTicket(tick);
            setNewComment({newC:false});
            clearTicket();
        }

    return(
    <Modal
    isOpen={!!ticket}
    onRequestClose={() => console.log('req close')}
    contentLabel=""
    >
  
  <div className='ticketModalForm'>
    <h2 className='text-primary'>
        Ticket:{' '}{ticketNumber}
    </h2>
  </div>

  <hr />
  <br />
  <div>
    <div className="grid-2">
        <div className='tmfColumnLeft'>
            <label>Client:</label>
            {edit &&
                <input
                    placeholder={client}
                    name='client'
                    defaultValue={client}
                    onChange={onChange}
                />
            }
            {edit === null &&
                <input
                    placeholder={client}
                    name='client'
                    readOnly={client}
                />
            }
        </div>
        <div className='tmfColumnRight'>
            <label>Open Date:</label>
            <input
                placeholder={openDate}
                name='openDate'
                readOnly={openDate}
            />
        </div>
    </div>
  </div>
  <div>
    <div className='grid-2'>
        <div className='tmfColumnLeft'>
            <label>Location:</label>
            { edit &&
                <input
                    placeholder={clientLocation}
                    name='clientLocation'
                    defaultValue={clientLocation}
                    onChange={onChange}
                />
            }
            { edit === null &&
                <input
                    placeholder={clientLocation}
                    name='clientLocation'
                    readOnly={clientLocation}
                />
            }
        </div>
        <div className='tmfColumnRight'>
            <label>Opened By:</label>
            <input
                placeholder={openedBy}
                name='openedBy'
                readOnly={openedBy}
                />
        </div>
    </div>
  </div>
  <div style={{width:"150px"}}>
        <label>Status:</label>
        {edit && 
            <select name='status' id='status' onChange={onChange}>
                <option value='Open'>Open</option>
                <option value='Closed'>Closed</option>
            </select>
        }
        {edit === null &&
            <input
                placeholder={status}
                name='status'
                readOnly={status}
            />
        }
  </div>
 
  <hr />
  <br />
  <div>
        <label>Issue:</label>
        <input style={{width:"100%"}}
            placeholder={issue}
            name='issue'
            readOnly={issue}
        />
  </div>
  
    <div className="grid-2">
        <div className='tmfColumnLeft'>
            <label>Assigned Group:</label>
            { edit && 
                <Dropdown title={'assignedGroup'} options={groups} onChange={onChange}/>
            }
            { edit === null &&
                <input
                    placeholder={assignedGroup}
                    name='assignedGroup'
                    readOnly={assignedGroup}
                />
            }
        </div>
        <div className='tmfColumnRight'>
        <label>Assigned Tech:</label>
            { edit && 
                <Dropdown title={'assignedTech'} options={users} onChange={onChange}/>
            }
            { edit === null &&
                <input
                    placeholder={assignedTech}
                    name='assignedTech'
                    readOnly={assignedTech}
                />
            }
        </div>
    </div>
  
    <hr />
    <br />
    <div>
        <label>Comments:</label>
        <div className="commentDiv">
            {(comments !== undefined && comments !== null && comments !== '' && comments.length > 0) &&
                comments.map(item => 
                <>
                <hr />
                <p>{item}</p>
                </>
                )}
        </div>
        <br />
        { edit && <button onClick={() => {setNewComment({newC:true})}}>Add Comment</button>}
        {newC && <input type='text' name='commentString' placeholder='Enter New Comment...' onChange={onChangeTemp} />}
    </div>
 
    <hr />
    <br />
   
    {edit &&
        <>
        <div>
            <label>Resolution:</label>
            <input type='text' name='resolution' placeholder='Enter Resolution...' onChange={onChange} />
        </div>
        <hr />
        <br />
        </>
    }
    <div>
        {edit && <button onClick={onSubmit}>Save Changes</button>}
    </div>
   
    <div className="grid-2">
        <div>
            {edit === null &&
                <button onClick={() => editTicket(ticket)}>Edit Ticket</button>
            }
        </div>
        <div>
            <button onClick={() => {clearTicket(); getTickets(); setNewComment({newC:false})}}>Cancel/Exit</button>
        </div>
    </div>
  </Modal>
);}

const mapStateToProps = (state) => ({
    ticketState: state.ticketReducer,
    auth: state.authReducer
    // alert: state.alertReducer
})

export default connect(mapStateToProps, {loadUser, clearTicket, updateTicket, editTicket, getTickets, getGroups, getUsers})(TicketModal);