import React, {Component} from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

class CreateTicket extends Component {
    constructor(){
        super()
        this.state = {
            ticket:{
                openedBy:'', client:'', issue:'' 
            },
            error:false
        };
    };
    handleChange=(event)=>{
        let updatedTicket = { ...this.state.ticket};
        updatedTicket.openedBy = this.props.user.name;
        updatedTicket[event.target.name]=event.target.value;
        this.setState({ticket:updatedTicket})
    };
    handleSubmit = (event) =>{
        event.preventDefault();
        if(this.state.ticket.client.trim() === '' || this.state.ticket.issue.trim() === ''){
            return this.setState({error: true});
        } 
        this.props.handleCreateTicketSubmit(event, this.state.ticket);
    };
    render(){
        return (
            <div style={{margin:'40px'}}>
                <h1 style={{color:'rgb(107, 105, 105)'}}>Create Ticket:</h1>
                {this.state.error === true && <h2 style={{color:'red'}}>All fields required</h2>}
                <form onSubmit={this.handleSubmit} className="ui form" >
                    <div className="equal width fields">   
                        <div className="field">
                            <label style={{color:'rgb(107, 105, 105)'}}>Client</label>
                                <div className="ui fluid input">
                                    <input type="text" placeholder="Client..."
                                        name="client"
                                        value={this.state.ticket.client}
                                        onChange={this.handleChange}
                                    />
                                </div>
                        </div>
                    </div>
                    <div className="equal width fields">   
                        <div className="field">
                            <label style={{color:'rgb(107, 105, 105)'}}>Issue</label>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Issue..."
                                    name="issue"
                                    value={this.state.ticket.issue}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <Button type="submit" className="ui button">Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
};

CreateTicket.propTypes = {
    handleCreateTicketSubmit: PropTypes.func,
}

export default CreateTicket;