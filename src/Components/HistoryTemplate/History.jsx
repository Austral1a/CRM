import React from 'react';
import '../../styles/otherStyles/loader.css';
import '../../styles/historyStyles/history.css';
import CheckboxSortBySum from './sortingComponents/sortBySum';
import RecordsTable from './recordsTable';
import CheckboxSortByCateg from './sortingComponents/sortByCateg';

const History = () => {
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

export default History;