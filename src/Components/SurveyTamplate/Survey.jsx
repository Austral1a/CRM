import React, { useEffect, useCallback } from 'react';

import '../../styles/otherStyles/loader.css';
import '../../styles/surveyStyle/survey.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { tooltipAnimation, tooltipDestroy } from '../../css-materialize animations/tooltip.js';

import { getCategories } from '../../store/actions/index';
const mapStateToProps = (state) => ({
    get_categ_success: state.getCategoriesReducer.getCategoriesSuccess,
    categories: state.getCategoriesReducer.categories,
    user_uid: state.currUserReducer.userUid,
});
const mapDispatchToProps = (dispatch) => ({
    getCategories: (user_uid) => {
        dispatch(getCategories(user_uid))
    },
});
const ConnectedSurvey = ({ getCategories, get_categ_success, categories, user_uid }) => {

    const tooltipedRef = useCallback(
    (node) => {
        if (node != null) {
            tooltipAnimation(node);
        };
    }, []);

    useEffect(() => {
        getCategories(user_uid);
    }, [getCategories, user_uid]);
    useEffect(() => {
        return () => {
            tooltipDestroy();
        }
    }, [])

    const tooltipText = (categ) => {
        if (categ.limit - categ.total > categ.limit) {
            return `Превышение на: ${Math.abs(categ.limit - (categ.limit - categ.total))} грн`
        } else if (categ.limit - categ.total < 0) {
            return `Доход: ${Math.abs(categ.limit - categ.total)} грн`
        } else if (categ.limit - categ.total > 0) {
            return `Осталось: ${categ.limit - (categ.limit - categ.total)} грн`;
        }
    }
    return (
        <div className="wrapper-survey">
            <div className='categories-progress'>
                <h4>Обзор категорий</h4>
                {get_categ_success ? Object.values(categories).map((categ) => {
                    return (
                        <React.Fragment key={categ.name}>
                            {categ.total ?
                                <>
                                    <h5>{categ.name}: {categ.limit - categ.total} грн из {categ.limit} грн</h5>
                                    <div ref={tooltipedRef}  data-position="bottom" data-tooltip={tooltipText(categ)} className="progress tooltipped">
                                        <div className="determinate" style={{
                                            width: ((categ.limit - categ.total) / categ.limit) * 100 + '%',
                                            backgroundColor: `rgb(170,${255 - ((((categ.limit - categ.total) / categ.limit) * 100) * 2.5)},0)`
                                        }}></div>
                                    </div>
                                </>
                                : <h5>В категории {categ.name} вы пока не добавляли записей</h5>}
                        </React.Fragment>
                    );
                }) : <div className='loader'></div>}
            </div>
        </div>
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
    getCategories: PropTypes.func.isRequired
}

export default Survey;