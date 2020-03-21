import React, { useState, useEffect, useCallback } from 'react';
//
// css
import '../../../styles/categoryTemplate/category.css';
//
// redux stuff
import { connect } from 'react-redux';
//
// action for updating db
import { updateDb } from '../../../store/actions/index';
//
// action for handling changes in input
import { updateExistsCategoryLimit } from '../../../store/actions/index';
//
import PropTypes from 'prop-types';
import { toastAnimation, toastAnimationDestroy } from '../../../css-materialize animations/toast';
import { getUserBillValue } from '../../../store/actions/index';
import { toast } from 'materialize-css';
const mapStateToProps = (state) => ({
    categories: state.getCategoriesReducer.categories,
    user_uid: state.currUserReducer.userUid,
    changeLimitExistCateg: state.updateLimitCategReducer.changeLimit,
    checkbox: state.setCategCheckboxReducer.isChecked,
    user_bill: state.userBillValueReducer.user_bill,
});

const mapDispatchToProps = (dispatch) => ({
    updateDbFromSelect: (updateOptions) => {
        dispatch(updateDb(updateOptions));
    },
    changeExistsCategLimit: (v) => {
        dispatch(updateExistsCategoryLimit(v));
    },
    getBill: (user_uid) => {
        dispatch(getUserBillValue(user_uid));
    },
});
const ConnectedCategorySelect = ({
    checkbox,
    user_uid,
    categories,
    changeLimitExistCateg,
    changeExistsCategLimit,
    updateDbFromSelect,
    getBill,
    user_bill
}) => {

    const [selectCategKey, setSelectCategKey] = useState('');
    const [selectCategName, setSelectCategName] = useState('');
    const [selectCategLimit, setSelectLimit] = useState(0);
    const handleChangeSelectName = (e) => {
        setSelectCategName(e.target.value);
    };
    const renderOptions = () => {
        return (
            <>
                {Object.values(categories).map((categ) => {
                    return (
                        <option key={Math.random()} value={categ.name}>{categ.name} ( {categ.limit} грн)</option>
                    )
                })};
            </>
        );
    };
    const memoHandleChangeSelectLimit = useCallback(
        () => {
            Object.values(categories).map((categ) => {
                if (categ.name === selectCategName) {
                    setSelectLimit(categ.limit);
                }
            });
        }, [categories, selectCategName]);

    const memoHandleCurrCategory = useCallback(
        () => {
            Object.keys(categories).map((key) => {
                if (categories[key].name === selectCategName) {
                    setSelectCategKey(key);
                }
            })
        }, [categories, selectCategName]);
    const UpdateDbChangeCategory = () => {
        // 2 parts ( 1. If checkbox is true; 2. If checbkbox is false )
        if(selectCategName.trim() == '') {
            toastAnimation('Выберете категорию');
        } else if (changeLimitExistCateg == 0 || !changeLimitExistCateg) {
            toastAnimation('Укажите корректный лимит');
        } else if (checkbox) {
            if (+changeLimitExistCateg > +user_bill) {
                toastAnimation(`У вас не столько нет столько денег на счету. Ваш счет - ${user_bill} грн`);
            } else {
                // update limit 
                let updateCategoriesAdd = +selectCategLimit + +changeLimitExistCateg;
                let updatesChangeCateg = {};
                updatesChangeCateg['users/' + user_uid + '/categories/' + selectCategKey + '/limit'] = updateCategoriesAdd;
                // udate bill
                let updatesUpdateLimitChange = {}
                updatesUpdateLimitChange['users/' + user_uid + '/info/bill'] = +user_bill - +changeLimitExistCateg;
                try {
                    updateDbFromSelect(updatesUpdateLimitChange);
                    updateDbFromSelect(updatesChangeCateg);
                    toastAnimation(`Категория ${selectCategName} была обновлена.`);
                    changeExistsCategLimit('')
                } catch {
                    toastAnimation('Что-то пошло не так.');
                }}
            } else {
                if(+user_bill < (+changeLimitExistCateg - +selectCategLimit)) {
                    toastAnimation(`У вас не столько денег на счету. Ваш счет - ${user_bill} грн`);
                } else {
                    // update limit
                    let updateCategoriesNew = +changeLimitExistCateg;
                    let updatesNewCateg = {};
                    updatesNewCateg['users/' + user_uid + '/categories/' + selectCategKey + '/limit'] = updateCategoriesNew;
                    // update user_bill
                    let updatesUpdateLimitNew = {};
                    updatesUpdateLimitNew['users/' + user_uid + '/info/bill'] = +selectCategLimit > +changeLimitExistCateg  ? 
                    +user_bill + (+selectCategLimit - +changeLimitExistCateg)
                    :
                    +user_bill - (+changeLimitExistCateg - +selectCategLimit);
                    try {
                        updateDbFromSelect(updatesNewCateg);
                        updateDbFromSelect(updatesUpdateLimitNew);
                        toastAnimation(`Категория ${selectCategName} была обновлена.`);
                        changeExistsCategLimit('');
                    } catch {
                        toastAnimation('Что-то пошло не так.');
                    };
                }
            };
        };

    useEffect(() => {
        getBill(user_uid);
        memoHandleChangeSelectLimit();
        memoHandleCurrCategory();
    }, [memoHandleChangeSelectLimit, memoHandleCurrCategory, getBill, user_uid, user_bill]);

    useEffect(() => {
        return () => {
            toastAnimationDestroy();
        }
    }, []);
    return (
        // temporary measure (select tag appearance)
        <>
            <select className="browser-default" value={selectCategName} onChange={handleChangeSelectName}>
                <option defaultValue value="">Выберите один из вариантов</option>
                {renderOptions()}
            </select>
            <div className="input-field">
                <input
                    type='number'
                    id='category_value'
                    value={changeLimitExistCateg}
                    onChange={(e) => changeExistsCategLimit(e.target.value)}
                />
                <span className="helper-text">Лимит</span>
            </div>

            <button
                onClick={UpdateDbChangeCategory}
                className="waves-effect waves-light btn btn-small"
            >Изменить</button>
        </>
    );
};

const CategorySelect = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCategorySelect);

ConnectedCategorySelect.propTypes = {
    checkbox: PropTypes.bool.isRequired,
    user_uid: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    changeLimitExistCateg: PropTypes.string.isRequired,
    changeExistsCategLimit: PropTypes.func.isRequired,
    updateDbFromSelect: PropTypes.func.isRequired
};

export default CategorySelect;