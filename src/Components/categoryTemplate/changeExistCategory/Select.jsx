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
                return null;
            });
        }, [categories, selectCategName]);

    const memoHandleCurrCategory = useCallback(
        () => {
            Object.keys(categories).map((key) => {
                if (categories[key].name === selectCategName) {
                    setSelectCategKey(key);
                }
                return null;
            })
        }, [categories, selectCategName]);
    const UpdateDbChangeCategory = () => {
            if(selectCategName.trim() == '') {
                toastAnimation('Выберете категорию');
            } else if (changeLimitExistCateg == 0 || !changeLimitExistCateg) {
                toastAnimation('Укажите корректный лимит');
            } else if (+changeLimitExistCateg > +user_bill) {
                toastAnimation('Вы не можете установить такой лимит, так-как у вас не столько денег счету');
            } 
            else {
                let updateCategoriesNew = +changeLimitExistCateg;
                    let updateCategoriesAdd = +selectCategLimit + +changeLimitExistCateg;
                    let updatesNewCateg = {};
                    let updatesChangeCateg = {};
                    updatesNewCateg['users/' + user_uid + '/categories/' + selectCategKey + '/limit'] = updateCategoriesNew;
                    updatesChangeCateg['users/' + user_uid + '/categories/' + selectCategKey + '/limit'] = updateCategoriesAdd;
                    // update bill if user changing current category, and it will add residue to current bill
                    let updatesUpdateLimitChange = {}; // true checkbox
                    // we just subtract new limit from user bill because we just adding to an existing limit some value;  
                    updatesUpdateLimitChange['users/' + user_uid + '/info/bill'] = +user_bill - +changeLimitExistCateg;
                    let updatesUpdateLimitNew = {}; // false checkbbox
                    // here a lil bit harder,
                    // 1) but we are comparing new limit to a limit which already exists, 
                    //  and if it's bigger (exist limit > new limit) then we subtract difference between new limit and an exist limit from user bill.
                    // 2) that expression equals to the first one, but we are adding to user bill rather than subtracting
                    updatesUpdateLimitNew['users/' + user_uid + '/info/bill'] = (+changeLimitExistCateg > +selectCategLimit) ?
                        (user_bill - Math.abs(selectCategLimit - +changeLimitExistCateg)) :
                        (user_bill + Math.abs(selectCategLimit - +changeLimitExistCateg));
                    if (checkbox) {
                            try {
                                updateDbFromSelect(updatesChangeCateg);
                                toastAnimation('Категория была успешно обновлена');
                                updateDbFromSelect(updatesUpdateLimitChange);
                                changeExistsCategLimit(0);
                            } catch {
                                toastAnimation('Что-то пошло не так');
                            };
                    } else {
                            try {
                                updateDbFromSelect(updatesNewCateg);
                                toastAnimation('Категория была успешно обновлена');
                                updateDbFromSelect(updatesUpdateLimitNew);
                                changeExistsCategLimit(0);
                            } catch {
                                toastAnimation('Что-то пошло не так');
                            };
                    };
                };
            }

    useEffect(() => {
        getBill(user_uid);
        memoHandleChangeSelectLimit();
        memoHandleCurrCategory();
    }, [memoHandleChangeSelectLimit, memoHandleCurrCategory, getBill, user_uid, user_bill])

    useEffect(() => {
        return () => {
            toastAnimationDestroy();
        }
    }, [])
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
            >Добавить</button>
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