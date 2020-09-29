import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {loadTicket, updateTicket, getTickets} from '../../store/actions/ticketActions';

const today = () =>{
    return `${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()} (${new Date().getHours()}:${new Date().getMinutes()})`;
};


const CommentModal = ({ticketState:{ticket}, setComment, newC, loadTicket, updateTicket, getTickets}) => {
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
    }, [ticket]);

    const [tick, setTick] = useState({
        comments:[],
    });

    const {
        comments,
      } = tick;


    const onAdd = () => {
        setTick({comments: [...ticket.comments, (`${today()} - ${document.getElementById('newComment').value.trim()}`)]});
        updateTicket(tick);
        getTickets();
        loadTicket(ticket);
        setComment({newC:false})
    }

    const onCancel = () => {
        setComment({newC:false})
    }

    return (
        <Modal
            isOpen={!!newC}
            onRequestClose={() => console.log('req close')}
            contentLabel=""
        >
            <div className='ticketModalForm'>
            <h2 className='text-primary'>
                New Comment
            </h2>
            </div>
            <br />
            <hr />
            <br />
            <div>
                <input
                    type='text'
                    name='newComment'
                    id='newComment'
                />
            </div>
            <br />
            <hr />
            <br />
            <div className="grid-2">
                <div>
                    <button onClick={onAdd}>
                        Add Comment
                    </button>
                </div>
                <div>
                    <button onClick={onCancel}>
                        Cancel/Exit
                    </button>
                </div>
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    ticketState: state.ticketReducer,
    auth: state.authReducer
    // alert: state.alertReducer
})

export default connect(mapStateToProps, {loadTicket, updateTicket, getTickets})(CommentModal);
