import React from 'react';
import {connect} from 'react-redux';

const Alerts = ({alert:{alerts}}) => {

  return (
    alerts !== null &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    ))
  );
};

const mapStateToProps = state => ({
  alert: state.alertReducer
})

export default connect(mapStateToProps)(Alerts)