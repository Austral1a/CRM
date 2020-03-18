import React from 'react';
import '../../styles/otherStyles/loader.css';
import '../../styles/historyStyles/history.css';
/* import {
    useLocation
} from 'react-router-dom';
 */
//import {autocomplete, autocompleteDestroy} from '../../css-materialize animations/autocomplete';
/* 
import {connect} from 'react-redux';

import {getCategRecords} from '../../store/actions/index';

import {getCategories} from '../../store/actions/index';
 */
import CheckboxSortBySum from './sortingComponents/sortBySum';
import RecordsTable from './recordsTable';
import CheckboxSortByCateg from './sortingComponents/sortByCateg';
/* const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = (dispatch) => ({
    
});
 */
const History = () => {
    
    
    /* useEffect(() => {
        return () => {
            //autocompleteDestroy();
        }
    }, [autocompletedRef])
 */
    return (
        <div className='wrapper-history'>
        <div className='history-description'>
            <h3>История записей</h3>
        </div>
        <div className="card custom-card-table-filter">
            <div className="card-content">
                <h5 className='card-header'>Сортировка</h5>
                <CheckboxSortBySum/>
                <CheckboxSortByCateg />
            </div>
        </div>
        <div className="card custom-card-table">
            <div className="card-content">
                <RecordsTable />
            </div>
        </div>
        </div>
    );
};
/* 
const History = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedHistory);
 */
export default History;