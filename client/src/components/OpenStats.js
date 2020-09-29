import React from 'react';
import PropTypes from 'prop-types';

const OpenStats = ({counts, percent}) => {
    if(counts === 0){
        return (
            <div id="openStats" className="ui large statistics">
                <div className="green statistic">
                    <div className="value" style={{marginLeft:'12.5px'}}>
                        {counts}
                    </div>
                    <div className="label" style={{marginLeft:'12.5px'}}>
                        <h2>Open Tickets</h2>
                        <h3>{percent}%</h3>
                    </div>
                </div>
            </div>
        )
    };
    if(counts > 0 && counts < 5){
        return (
            <div className="ui large statistics">
                <div className="yellow statistic">
                    <div className="value" style={{marginLeft:'12.5px'}}>
                        {counts}
                    </div>
                    <div className="label" style={{marginLeft:'12.5px'}}>
                        <h2>Open Tickets</h2>
                        <h3>{percent}%</h3>
                    </div>
                </div>
            </div>
        )
    }
    if(counts >= 5){
        return (
            <div className="ui large statistics">
                <div className="red statistic">
                    <div className="value" style={{marginLeft:'12.5px'}}>
                        {counts}
                    </div>
                    <div className="label" style={{marginLeft:'12.5px'}}>
                        <h2>Open Tickets</h2>
                        <h3>{percent}%</h3>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
};

OpenStats.propTypes = {
    counts: PropTypes.number,
    percent: PropTypes.number,
}

export default OpenStats;