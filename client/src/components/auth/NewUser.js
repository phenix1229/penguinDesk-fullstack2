import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {clearErrors, addUser, getGroups} from '../../store/actions/authActions';
import {setAlert} from '../../store/actions/alertActions';
import Dropdown from '../layout/Dropdown';


const NewUser = ({auth:{user, error, groups}, addUser, clearErrors, setAlert, getGroups}) => {

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

    const {name, email, admin, company, group, password, password2} = newUser;
    
    const onChange = e => setUser({...newUser, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
          } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
          } else {
            addUser({
              name,
              email,
              admin,
              group,
              company:user.company,
              password
            });
          }
          setUser({
            name:'',
            email:'',
            password:'',
            password2:''
          })
          document.getElementById('admin').value='True';
          document.getElementById('group').value='';
    }

    return (
        <div className="registerForm">
        <h1>
            <span className="text-primary">Add User</span>
        </h1>
        <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Admin:</label>
              <select name='admin' id='admin' onChange={onChange}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="form-group">
              <label>Group:</label>
              <Dropdown title={'group'} options={groups} onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" name="password2" value={password2} onChange={onChange} />
            </div>
            <input type="submit" value="Add User" className="btn btn-primary btn-block" onClick={onSubmit} />
        </form>
            
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.authReducer,
    alert: state.alertReducer
})

export default connect(mapStateToProps, {addUser, clearErrors, setAlert, getGroups})(NewUser);