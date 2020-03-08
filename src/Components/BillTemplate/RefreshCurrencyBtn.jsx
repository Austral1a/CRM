import React from 'react';

const RefreshCurrency = (props) => {
    return (
        <button
            className="waves-effect waves-light btn-small"
            onClick={props.onClick}>
            <i className='material-icons'>refresh</i>
        </button>
    )
}

export default RefreshCurrency;