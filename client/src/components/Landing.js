import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


const Landing = ({auth:{isAuthenticated}, props:{history}}) => {

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [isAuthenticated, history]);

  return (
    <div id='landing'>
        <div id='regOption'>
            <h1>
                <span className='text-primary'>New User</span>
            </h1>
            <p>Please <Link to='/register'>register</Link>.</p>
        </div>
        <div id='loginOption'>
            <h1>
                <span className='text-primary'>Returning User</span>
            </h1>
            <p>Please <Link to='/login'>login</Link>.</p>
        </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.authReducer,
  props: ownProps
})

export default connect(mapStateToProps)(Landing)