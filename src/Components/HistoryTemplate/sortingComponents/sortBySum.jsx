import React from 'react';
import {connect} from 'react-redux';
import {getCategRecords} from '../../../store/actions/index';
import PropTypes from 'prop-types';

import {
    sortRecordsBySum, 
    setCheckboxSortBySumTrue,
    setCheckboxSortBySumFalse
} from '../../../store/actions/index';


const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    sortBySumCheckbox: state.setRecordsSortCheckboxReducer.isBySumChecked,
});

const mapDispatchToProps = (dispatch) => ({
    getRecordsSortedBySum: () => {
        dispatch(sortRecordsBySum());
    },
    getCheckboxSortBySumTrue: () => {
        dispatch(setCheckboxSortBySumTrue());
    },
    getCheckboxSortBySumFalse: () => {
        dispatch(setCheckboxSortBySumFalse());
    },
    getRecords: (user_uid) => {
        dispatch(getCategRecords(user_uid));
    },
});

const ConnectedCheckboxSortBySum = ({
    getRecordsSortedBySum,
    getCheckboxSortBySumTrue,
    getCheckboxSortBySumFalse,
    sortBySumCheckbox,
    getRecords,
    user_uid
}) => {

    return (
        <p>
            <label>
                <input 
                    onChange={(e) => {
                        if( e.target.checked ) {
                            getCheckboxSortBySumTrue();
                            getRecordsSortedBySum();
                        } else {
                            getCheckboxSortBySumFalse();
                            getRecords(user_uid)
                        }
                    }}
                    type="checkbox" 
                    className="filled-in"
                    checked={sortBySumCheckbox}  
                />
                <span>По сумме</span>
            </label>
        </p>
    )
};

const CheckboxSortBySum = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCheckboxSortBySum);

ConnectedCheckboxSortBySum.propTypes = {
    user_uid: PropTypes.string.isRequired,
    getRecordsSortedBySum: PropTypes.func.isRequired,
    getCheckboxSortBySumTrue: PropTypes.func.isRequired,
    getCheckboxSortBySumFalse: PropTypes.func.isRequired,
    sortBySumCheckbox: PropTypes.bool.isRequired,
    getRecords: PropTypes.func.isRequired
}

export default CheckboxSortBySum;