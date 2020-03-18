import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    setCategoryCheckBoxTrue,
    setCategoryCheckboxFalse,
} from '../../../store/actions/index';

const mapStateToProps = (state) => ({
    checkbox: state.setCategCheckboxReducer.isChecked,
});

const mapDispatchToProps = (dispatch) => ({
    checkboxOnChangeTrue: () => {
        dispatch(setCategoryCheckBoxTrue());
    },
    checkboxOnChangeFalse: () => {
        dispatch(setCategoryCheckboxFalse());
    }
});

const ConnectedAddToLimitCheckbox = ({ checkbox, checkboxOnChangeTrue, checkboxOnChangeFalse }) => {

    const handleChangeCheckbox = () => {
        if (checkbox) {
            checkboxOnChangeFalse();
        } else {
            checkboxOnChangeTrue();
        }
    }

    return (
        <div className="switch">
            <label>
                Добавить к текущему лимиту?
                <input
                    onChange={handleChangeCheckbox}
                    type="checkbox"
                    checked={checkbox} />
                <span className='lever'></span>
            </label>
        </div>
    );
};

const AddToLimitCheckbox = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedAddToLimitCheckbox);

ConnectedAddToLimitCheckbox.propTypes = {
    checkbox: PropTypes.bool.isRequired,
    checkboxOnChangeTrue: PropTypes.func.isRequired,
    checkboxOnChangeFalse: PropTypes.func.isRequired
}

export default AddToLimitCheckbox;