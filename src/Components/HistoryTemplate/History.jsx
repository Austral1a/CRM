import React from 'react';
import '../../styles/otherStyles/loader.css';
import '../../styles/historyStyles/history.css';
import dateFilter from '../../filters/dateFilter';

import {connect} from 'react-redux';

import {getCategRecords} from '../../store/actions/index';

import {getCategories} from '../../store/actions/index';
import { useEffect } from 'react';

const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    categories: state.getCategoriesReducer.categories,
    get_categ_success: state.getCategoriesReducer.getCategoriesSuccess,
    get_records_success: state.getCategRecordsReducer.get_records_success,
    records: state.getCategRecordsReducer.records,
});

const mapDispatchToProps = (dispatch) => ({
    getCategories: (user_uid) => {
        dispatch(getCategories(user_uid))
    },
    getRecords: (user_uid) => {
        dispatch(getCategRecords(user_uid));
    }
});

const ConnectedHistory = ({
    user_uid,
    categories,
    get_categ_success,
    get_records_success,
    getCategories,
    getRecords,
    records
}) => {
    
    useEffect(() => {
        getCategories(user_uid);
        getRecords(user_uid);
    }, [getCategories, getRecords, user_uid]);

    return (
        <div className='wrapper-history'>
        <div className='history-description'>
            <h3>История записей</h3>
        </div>
        {get_records_success ?<table>
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
                            <tr>
                                <td>{idx + 1}</td>
                                <td>{record.income ? record.income : record.consumption}</td>
                                <td>{record.time}</td>
                                <td>{record.category}</td>
                                <td><p className={record.income ? 'income' : 'consumption'}>{record.income ? 'Доход' : 'Расход'}</p></td>
                            </tr>
                            )
                    })}
                </tbody>
            </table> : <div className='loader'></div>}
        </div>
    );
};

const History = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedHistory);

export default History;