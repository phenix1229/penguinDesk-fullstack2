import React from 'react';
import PropTypes from 'prop-types';

const Search = (props) => {
    return(
        <div>
            <form className="ui form">
                <div className="field">
                    <br />
                    <h3>Search Tickets:</h3>
                    <input 
                        onChange={props.handleChange}
                        type="text" placeholder="Search by issue..."
                        value={props.searchTerm}
                        style={{border:'1px solid grey'}}
                    />
                    <br />
                    <br />
                </div>
            </form>
        </div>
    )
};

Search.propTypes = {
    handleChange: PropTypes.func,
    searchTerm: PropTypes.string
}

export default Search;