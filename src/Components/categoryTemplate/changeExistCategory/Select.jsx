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
import firebase from 'firebase';
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

    const [selectCategKey, setSelectCategKey] = useState();
    const [selectCategName, setSelectCategName] = useState();
    const [selectCategLimit, setSelectLimit] = useState();
    //const [selectRef, setSelectRef] = useState(React.createRef());
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
    const UpdateDbChangeCategory =
        () => {
            let currCategoryLimit;
            firebase.database().ref(`users/${user_uid}/categories/${selectCategKey}/limit`).on('value', (snapshot) => {
                currCategoryLimit = (snapshot.val());
            });

            let updateCategoriesNew = +changeLimitExistCateg;
            let updateCategoriesAdd = +selectCategLimit + +changeLimitExistCateg;
            let updatesNewCateg = {};
            let updatesChangeCateg = {};
            updatesNewCateg['users/' + user_uid + '/categories/' + selectCategKey + '/limit'] = updateCategoriesNew;
            updatesChangeCateg['users/' + user_uid + '/categories/' + selectCategKey + '/limit'] = updateCategoriesAdd;
            // update bill if user changing current category, and it will add residue to current bill
            let updatesUpdateLimit = {};
            updatesUpdateLimit['users/' + user_uid + '/info/bill'] = (changeLimitExistCateg > currCategoryLimit) ?
                (user_bill - Math.abs(currCategoryLimit - changeLimitExistCateg)) :
                (user_bill + Math.abs(currCategoryLimit - changeLimitExistCateg));
            if (checkbox) {
                if ((changeLimitExistCateg + user_bill) > user_bill) {
                    toastAnimation('Вы не можете столько добавить, так-как у вас не так столько денег на счету');
                } else {
                    try {
                        updateDbFromSelect(updatesChangeCateg)
                        toastAnimation('Категория была успешно обновлена');
                    } catch {
                        toastAnimation('Что-то пошло не так');
                    };
                };
            } else {
                if (changeLimitExistCateg > user_bill) {
                    toastAnimation('Вы не можете установить такой лимит, так-как у вас не столько денег счету');
                } else {
                    updateDbFromSelect(updatesNewCateg);
                    toastAnimation('Категория была успешно обновлена');
                    updateDbFromSelect(updatesUpdateLimit)
                };
            };
        };

    useEffect(() => {
        getBill(user_uid);
        memoHandleChangeSelectLimit();
        memoHandleCurrCategory();
    }, [memoHandleChangeSelectLimit, memoHandleCurrCategory, getBill, user_uid])

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