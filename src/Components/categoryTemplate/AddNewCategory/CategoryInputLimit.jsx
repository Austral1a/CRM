import React from 'react';

import { connect } from 'react-redux';

import { setNewCategoryLimit } from '../../../store/actions/index';

import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
    limit: state.newLimitCategoryReducer.newLimit,
});

const mapDispatchToProps = (dispatch) => ({
    setLimit: (limit) => {
        dispatch(setNewCategoryLimit(limit));
    }
});

const ConnectedAddToCategoryInput = ({ limit, setLimit }) => {
    return (
        <div className="input-field">
            <input
                type='number'
                id='category_value'
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
            />
            <span className="helper-text">Лимит</span>
        </div>
    );
};

const AddToCategoryInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedAddToCategoryInput);

ConnectedAddToCategoryInput.propTypes = {
    limit: PropTypes.string.isRequired,
    setLimit: PropTypes.func.isRequired,
}

export default AddToCategoryInput;