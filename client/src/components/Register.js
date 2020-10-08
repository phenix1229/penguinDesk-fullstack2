import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {clearErrors, register, getGroups} from '../store/actions/authActions';
import {setAlert} from '../store/actions/alertActions';


const Register = ({auth:{error}, props:{history}, register, clearErrors, setAlert, getGroups}) => {

  useEffect(() => {

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    getGroups();
    // eslint-disable-next-line
  }, [error, getGroups]
  );

    const [newUser, setUser] = useState({
        name:'',
        email:'',
        admin:'',
        company:'',
        group:'',
        password:'',
        password2:''
    });

    const {name, email, company, password, password2} = newUser;
    
    const onChange = e => setUser({...newUser, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || password2 === '' || company === '') {
            setAlert('Please enter all fields', 'danger');
          } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
          } else {
            register({
              name,
              email,
              admin:true,
              group:'Admin',
              company,
              password
            });
            history.push('/')
          }
    }

    return (
        <div className="form-container" id="registerForm">
        <h1>
            <span className="text-primary">Register</span>
        </h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" name="company" value={company} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" name="password2" value={password2} onChange={onChange} />
            </div>
            <input type="submit" value="Register" className="btn btn-primary btn-block" onClick={onSubmit} />
        </form>
            
        </div>
    )
}
const mapStateToProps = (state, ownProps) => ({
    auth: state.authReducer,
    alert: state.alertReducer,
    props: ownProps
})

export default connect(mapStateToProps, {register, clearErrors, setAlert, getGroups})(Register);