import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {clearErrors, addGroup} from '../../store/actions/authActions';
import {setAlert} from '../../store/actions/alertActions';


const AddGroup = ({auth:{error, user}, addGroup, clearErrors, setAlert}) => {

  useEffect(() => {
    if (error === 'Group already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, history]
  );

    const [group, setGroup] = useState({
        name:'',
        company:'',
        owner:''
    });

    const {name, company, owner} = group;
    
    const onChange = e => setGroup({...group, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (name === '') {
            setAlert('Please enter a group name', 'danger');
          } else {
            addGroup({
                name,
                company:user.company,
                owner:user.owner
            });
          }
          setGroup({
            name:'',
            company:'',
            owner:''
          })
    }

    return (
        <div className="registerForm">
        <h1>
          <span className="text-primary">Add Group</span>
        </h1>
        <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} onChange={onChange} />
            </div>
            <input type="submit" value="Add Group" className="btn btn-primary btn-block" onClick={onSubmit} />
        </form>
            
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.authReducer,
    alert: state.alertReducer
})

export default connect(mapStateToProps, {addGroup, clearErrors, setAlert})(AddGroup);