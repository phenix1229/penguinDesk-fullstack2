import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './index.css'

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            user:{name:'', email:'', password:''},
            emptyField:false,
            loginError:false
        };
    };
    handleChange=(event)=>{
        let updatedUser = { ...this.state.user}
        updatedUser[event.target.name]=event.target.value;
        this.setState({user:updatedUser}, () => {
        })
    };
    handleSubmit = (event) =>{
        event.preventDefault();
        if(this.state.user.email === '' || this.state.user.password === ''){
            return this.setState({emptyField:true});
        }
        this.login(event, this.state.user)
    }
    login(event, user) {
        event.preventDefault();
        let axiosConfig = {
            headers:{
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*'
            }
        };
        axios.post('/users/login', user, axiosConfig)
        .then(response => {
        if (response) {
            this.props.updateUser(
                response.data
            )
        } 
    })
}
    render(){
        return (
            <div id='loginFormMain'>
            <div id='loginFormHeader'>
                    <h1 id='appTitle' style={{fontSize:'40px'}}>PenguinDesk</h1>
                    <h5 id='appSubtitle'>Ticket Tracker</h5>
            </div>
            <div id='loginForm'>
                {this.state.emptyField === true && <h2 style={{color:'red'}}>All fields required</h2>}
                <form onSubmit={this.handleSubmit} className="ui form" >
                    <div className="equal width fields">   
                        <div className="field">
                            <label>Email</label>
                            <div className="ui fluid input" style={{width:'300px'}}>
                                <input type="text" placeholder="Email..."
                                    name="email"
                                    value={this.state.user.email}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="equal width fields">   
                        <div className="field">
                            <label>password</label>
                            <div className="ui fluid input" style={{width:'300px'}}>
                                <input type="password" placeholder="Password..."
                                    name="password"
                                    value={this.state.user.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="ui button">Submit</button>
                    </div>
                </form>
            </div>
            </div>
        )
    }
};

LoginForm.propTypes = {
    updateUser: PropTypes.func,
}

export default LoginForm;