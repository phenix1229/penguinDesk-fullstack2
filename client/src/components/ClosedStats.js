import React from 'react';
import PropTypes from 'prop-types';

const ClosedStats = ({counts, percent}) => {
    if(counts === 0){
        return (
            <div className="ui large statistics">
                <div className="red statistic">
                    <div className="value">
                        {counts}
                    </div>
                    <div className="label">
                        <h2>Closed Tickets</h2>
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
                    <div className="value">
                        {counts}
                    </div>
                    <div className="label">
                        <h2>Closed Tickets</h2>
                        <h3>{percent}%</h3>
                    </div>
                </div>
            </div>
        )
    }
    if(counts >= 5){
        return (
            <div className="ui large statistics">
                <div className="green statistic">
                    <div className="value">
                        {counts}
                    </div>
                    <div className="label">
                        <h2>Closed Tickets</h2>
                        <h3>{percent}%</h3>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
};

ClosedStats.propTypes = {
    counts: PropTypes.number,
    percent: PropTypes.number,
}

export default ClosedStats;