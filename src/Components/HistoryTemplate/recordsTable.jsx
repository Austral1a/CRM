import React, {useEffect, useLayoutEffect} from 'react';
import {connect} from 'react-redux';
import {getCategories, getCategRecords} from '../../store/actions/index';
import '../../styles/otherStyles/loader.css';

const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    get_records_success: state.getCategRecordsReducer.get_records_success,
    records: state.getCategRecordsReducer.records,
    sortBySumCheckbox: state.setRecordsSortCheckboxReducer.isBySumChecked,
    sortByCategCheckbox: state.setRecordsSortCheckboxReducer.isByCategChecked,
    sortByCategSelect: state.setRecordsSelectForSortByCateg.value,
    categories: state.getCategoriesReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
    getCategories: (user_uid) => {
        dispatch(getCategories(user_uid))
    },
    getRecords: (user_uid) => {
        dispatch(getCategRecords(user_uid));
    },
});



const ConnectedRecordsTable = ({
    user_uid,
    get_records_success,
    records,
    getCategories,
    getRecords,
    // state of sorting checbboex  is need in this comnponent to put them into array of dependencies of useEffect
    // in order to, table could handle changes in state and re-render if user wants to sort records by some filter changes
    sortBySumCheckbox,
    sortByCategCheckbox,
    sortByCategSelect,
}) => {

    useEffect(() => {
        getCategories(user_uid);
        getRecords(user_uid);
    }, [getCategories, getRecords, user_uid]);
    return (
        get_records_success ? (
            <table>
            {console.log(records)}
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Сумма</th>
                    <th>Дата</th>
                    <th>Категория</th>
                    <th>Тип</th>
                    </tr>
                </thead>
                
                <tbody>
                    {Object.values(records).map((record, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{record.income ? record.income : record.consumption}</td>
                                <td>{record.time}</td>
                                <td>{record.category}</td>
                                <td><p className={record.income ? 'income' : 'consumption'}>{record.income ? 'Доход' : 'Расход'}</p></td>
                            </tr>
                                )
                    })}
                </tbody>
            </table>) : <div className='loader'></div>
    );
};

const RecordsTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedRecordsTable);

export default RecordsTable;