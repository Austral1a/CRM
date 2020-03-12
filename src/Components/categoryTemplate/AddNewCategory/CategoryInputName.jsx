import React from 'react';

import { connect } from 'react-redux';

import { setNewCategoryName } from '../../../store/actions/index';

import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
    name: state.newNameCategoryReducer.newName,
});

const mapDispatchToProps = (dispatch) => ({
    setName: (name) => {
        dispatch(setNewCategoryName(name));
    }
});

const ConnectedAddToCategoryName = ({ name, setName }) => {
    return (
        <div className="input-field">
            <input
                type="text"
                id='category_name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="category_name">Название</label>
        </div>
    );
};

const AddToCategoryName = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedAddToCategoryName);

ConnectedAddToCategoryName.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired
}

export default AddToCategoryName;