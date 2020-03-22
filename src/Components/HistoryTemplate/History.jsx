import React,{useEffect, useCallback} from 'react';
import '../../styles/otherStyles/loader.css';
import '../../styles/historyStyles/history.css';
import CheckboxSortBySum from './sortingComponents/sortBySum';
import RecordsTable from './recordsTable';
import CheckboxSortByCateg from './sortingComponents/sortByCateg';
import {connect} from 'react-redux';
import {modalAnimation, modalDestroy, modalOpen} from '../../css-materialize animations/modal';
import { setFirstVisitHistoryPage, getVisitedPages } from '../../store/actions/index';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
    return {
        user_uid: state.currUserReducer.userUid,
        isVisitedHistoryPage: state.getVisitedPagesReducer.history_page,
        get_records_success: state.getCategRecordsReducer.get_records_success,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setFirstVisitHistoryPage: (user_uid) => {
        dispatch(setFirstVisitHistoryPage(user_uid));
    },
    getVisitedPages: (user_uid) => {
        dispatch(getVisitedPages(user_uid));
    }
});

const ConnectedHistory = ({
    user_uid,
    isVisitedHistoryPage,
    setFirstVisitHistoryPage,
    getVisitedPages,
    get_records_success
}) => {

    
    const modelRef = useCallback(
        (node) => {
            if (node != null) {
                modalAnimation(node);
            };
    }, []);

    useEffect(() => {
        document.title = 'History | Wallet'
        getVisitedPages(user_uid)
        if (!isVisitedHistoryPage) {
            if(get_records_success) {
                modalOpen();
            }
        };
        return () => {
            modalDestroy();
        };
    }, [isVisitedHistoryPage, getVisitedPages, user_uid, get_records_success]);
    const handleClick = () => {
        setFirstVisitHistoryPage(user_uid);
    }

    return (
        <>
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
        {!isVisitedHistoryPage ?
                (
                    <div ref={modelRef} id='modal' className='modal'>
                        <div className='modal-content'>
                            <h4>Для чего это страница?</h4>
                            <p>
                                На этой странице отображается вся история ваших расходов, доходов, также присутсвует сортировка
                                для удобного просмотра записей.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleClick} className="modal-close waves-effect waves-green btn-flat">Больше не показывать</button>
                        </div>
                    </div>
                    ) : null}
        </>
    );
};

const History = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedHistory);

ConnectedHistory.propTypes = {
    get_records_success: PropTypes.bool.isRequired,
    user_uid: PropTypes.string.isRequired,
    isVisitedHistoryPage: PropTypes.bool.isRequired,
    setFirstVisitHistoryPage: PropTypes.func.isRequired,
    getVisitedPages: PropTypes.func.isRequired,
}

export default History;