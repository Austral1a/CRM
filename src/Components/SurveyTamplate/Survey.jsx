import React, { useEffect, useCallback } from 'react';

import '../../styles/otherStyles/loader.css';
import '../../styles/surveyStyle/survey.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {modalAnimation, modalDestroy, modalOpen} from '../../css-materialize animations/modal';
import { tooltipAnimation, tooltipDestroy } from '../../css-materialize animations/tooltip.js';
import { setFirstVisitSurveyPage, getVisitedPages } from '../../store/actions/index';

import { getCategories } from '../../store/actions/index';
const mapStateToProps = (state) => ({
    get_categ_success: state.getCategoriesReducer.getCategoriesSuccess,
    categories: state.getCategoriesReducer.categories,
    user_uid: state.currUserReducer.userUid,
    getVisitedPagesSuccess: state.getVisitedPagesReducer.getVisitedPagesSuccess,
    isVisitedSurveyPage: state.getVisitedPagesReducer.survey_page,
});
const mapDispatchToProps = (dispatch) => ({
    getCategories: (user_uid) => {
        dispatch(getCategories(user_uid))
    },
    setFirstVisitSurveyPage: (user_uid) => {
        dispatch(setFirstVisitSurveyPage(user_uid));
    },
    getVisitedPages: (user_uid) => {
        dispatch(getVisitedPages(user_uid));
    }
});
const ConnectedSurvey = ({ 
    getCategories, 
    get_categ_success, 
    categories, 
    user_uid,
    isVisitedSurveyPage,
    getVisitedPages,
    setFirstVisitSurveyPage
}) => {

    const modelRef = useCallback(
        (node) => {
            if (node != null) {
                modalAnimation(node);
            };
    }, []);

    const tooltipedRef = useCallback(
    (node) => {
        if (node != null) {
            tooltipAnimation(node);
        };
    }, []);

    useEffect(() => {
        document.title = 'Survey | Wallet'
        getCategories(user_uid);
        getVisitedPages(user_uid);
        if (!isVisitedSurveyPage) {
            if(get_categ_success) {
                modalOpen();
            };
        };
        return () => {
            //tooltipDestroy();
            modalDestroy();
        }
    }, [getCategories, user_uid, getVisitedPages, get_categ_success, isVisitedSurveyPage]);
    const tooltipText = (categ) => {
        if (categ.limit - categ.total > categ.limit) {
            return `Превышение на: ${Math.abs(categ.limit - (categ.limit - categ.total))} грн`
        } else if (categ.limit - categ.total < 0) {
            return `Доход: ${Math.abs(categ.limit - categ.total)} грн`
        } else if (categ.limit - categ.total > 0) {
            return `Осталось: ${categ.limit - (categ.limit - categ.total)} грн`;
        };
    };

    const handleClick = () => {
        setFirstVisitSurveyPage(user_uid);
    };

    return (
        <>
        <div className="wrapper-survey">
            <div className='categories-progress'>
                <h4>Обзор категорий</h4>
                {console.log(categories)}
                {Object.keys(categories).length > 0 ? get_categ_success ? Object.values(categories).map((categ) => {
                    return (
                        <React.Fragment key={categ.name}>
                                   {categ.total ? 
                                    <>
                                        <h5>{categ.name}: {categ.limit - categ.total} грн из {categ.limit} грн</h5>
                                        <div ref={tooltipedRef}  data-position="bottom" data-tooltip={tooltipText(categ)} className="progress tooltipped">
                                            <div className="determinate" style={{
                                                width: ((categ.limit - categ.total) / categ.limit) * 100 + '%',
                                                backgroundColor: `rgb(${255},${255 - ((((categ.limit - categ.total) / categ.limit) * 100) * 2.5)},0)`
                                            }}></div>
                                        </div>
                                    </>
                                        : <h5>В категории {categ.name} записей пока нет.</h5>}
                        </React.Fragment>
                    );
                }) : <div className='loader'></div>
                : <h4>У вас пока нету ни одной категории</h4>}
            </div>
        </div>
        {!isVisitedSurveyPage ?
                (
                    <div ref={modelRef} id='modal' className='modal'>
                        <div className='modal-content'>
                            <h4>Для чего это страница?</h4>
                            <p>
                                Эта страница показывает прогресс вашей категории,<br/> 
                                т.е расход в определённой категории или доход с нее.
                                Чем ближе вы к поставленому лимиту, тем полоска будет становится краснее.
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

const Survey = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedSurvey);

ConnectedSurvey.propTypes = {
    get_categ_success: PropTypes.bool.isRequired,
    categories: PropTypes.object.isRequired,
    user_uid: PropTypes.string.isRequired,
    getCategories: PropTypes.func.isRequired,
    isVisitedSurveyPage: PropTypes.bool.isRequired,
    getVisitedPages: PropTypes.func.isRequired,
    setFirstVisitSurveyPage: PropTypes.func.isRequired,
}

export default Survey;