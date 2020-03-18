import React, {useCallback} from 'react';
import {
    setCheckboxSortByCategTrue, 
    setCheckboxSortByCategFalse,
    setSelectSortByCateg
} from '../../../store/actions/index';
import {connect} from 'react-redux';
import {sortRecordsByCateg} from '../../../store/actions/index';
import {getCategRecords} from '../../../store/actions/index';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
    sortByCategCheckbox: state.setRecordsSortCheckboxReducer.isByCategChecked,
    sortByCategSelect: state.setRecordsSelectForSortByCateg.value,
    categories: state.getCategoriesReducer.categories,
    user_uid: state.currUserReducer.userUid,
});

const mapDispatchToProps = (dispatch) => ({
    getRecordsSortedByCateg: (categ) => {
        dispatch(sortRecordsByCateg(categ));
    },
    getCheckboxSortByCategTrue: () => {
        dispatch(setCheckboxSortByCategTrue());
    },
    getCheckboxSortByCategFalse: () => {
        dispatch(setCheckboxSortByCategFalse());
    },
    getSelectValueSortByCateg: (value) => {
        dispatch(setSelectSortByCateg(value));
    },
    getRecords: (user_uid) => {
        dispatch(getCategRecords(user_uid));
    },
});

const ConnectedCheckboxSortByCateg = ({
    sortByCategCheckbox,
    getRecordsSortedByCateg,
    getCheckboxSortByCategTrue,
    getCheckboxSortByCategFalse,
    sortByCategSelect,
    getSelectValueSortByCateg,
    categories,
    getRecords,
    user_uid
})  => {

    const getCategsNames = useCallback(
        () => { 
            let arr = [];
            Object.values(categories).map((categ) => arr.push(categ.name));
            return arr.filter(Boolean);

            /* 
            let obj = {};
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let curVal = arr[i];
                obj[curVal] = null;
            }
            return obj; */
        }, [categories]);

    return (
        <>
            <p>
                <label>
                    <input 
                        type="checkbox" 
                        className="filled-in"
                        checked={sortByCategCheckbox}
                        onChange={(e) => {
                            if( e.target.checked) {
                                getCheckboxSortByCategTrue();
                            } else {
                                getCheckboxSortByCategFalse();
                                getRecords(user_uid);
                            }
                        }}
                    />
                    <span>По категории</span>
                </label>
            </p>
            {sortByCategCheckbox ? (
                <div className="input-field">
                    <select 
                        className='browser-default'
                        value={sortByCategSelect}
                        onChange={(e) => {
                            getRecords(user_uid);
                            getSelectValueSortByCateg(e.target.value);
                            if( e.target.value ) {
                                getRecordsSortedByCateg(e.target.value);
                            }
                        }}
                    >
                        <option defaultValue value="">Выберете категорию</option>
                        {getCategsNames().map((name) => {
                            return <option key={name} value={name}>{name}</option>
                        })}
                    </select>
                </div>
            ) : getSelectValueSortByCateg()}
        </>
    );
};

const CheckboxSortByCateg = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCheckboxSortByCateg);

ConnectedCheckboxSortByCateg.propTypes = {
    sortByCategCheckbox: PropTypes.bool.isRequired,
    getRecordsSortedByCateg: PropTypes.func.isRequired,
    getCheckboxSortByCategTrue: PropTypes.func.isRequired,
    getCheckboxSortByCategFalse: PropTypes.func.isRequired,
    sortByCategSelect: PropTypes.string,
    getSelectValueSortByCateg: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    getRecords: PropTypes.func.isRequired,
    user_uid: PropTypes.string.isRequired,
}

export default CheckboxSortByCateg;
