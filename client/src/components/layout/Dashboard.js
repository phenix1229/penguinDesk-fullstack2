import React  from 'react';
import PropTypes from 'prop-types';
import OpenStats from './OpenStats';
import ClosedStats from './ClosedStats';
import './index.css';

const Dashboard = (props) => {
    if(props.dashboard === true){
        let openPercent = Math.floor((Number(props.counts[0])/(Number(props.counts[0]) + Number(props.counts[1]))) * 100)
        let closedPercent = Math.floor((Number(props.counts[1])/(Number(props.counts[0]) + Number(props.counts[1]))) * 100)
        return (
            <div id='dashBig'>
                <br />
                <br />
                <OpenStats counts={props.counts[0]} percent={openPercent}/>
                <ClosedStats counts={props.counts[1]} percent={closedPercent}/>
            </div>
        )
    } else {
        return (
            <div id='dashSmall'>
                <p>Open Tickets: {props.counts[0]}</p>
                <p>Closed Tickets: {props.counts[1]}</p>
            </div>
        )
    }
};

Dashboard.propTypes = {
    countTickets: PropTypes.func,
    dashboard: PropTypes.bool,
    counts: PropTypes.array,
};

export default Dashboard;