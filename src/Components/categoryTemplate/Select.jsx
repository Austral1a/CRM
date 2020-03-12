import React, { useState, useEffect, useCallback } from 'react';
// select animation and animation delete when unmounted will ocurs
//import { selectAnimation, selectAnimationDestroy } from '../../css-materialize animations/select';
//
// css
import '../../styles/categoryTemplate/category.css';
//
// redux stuff
import { connect } from 'react-redux';
//
// action for updating db
import { updateDb } from '../../store/actions/index';
//
// action for handling changes in input
import { updateExistsCategoryLimit } from '../../store/actions/index';
//
import PropTypes from 'prop-types';
const mapStateToProps = (state) => ({
    categories: state.getCategoriesReducer.categories,
    user_uid: state.currUserReducer.userUid,
    changeLimitExistCateg: state.updateLimitCategReducer.changeLimit,
    checkbox: state.setCategCheckboxReducer.isChecked,
});

const mapDispatchToProps = (dispatch) => ({
    updateDbFromSelect: (updateOptions) => {
        dispatch(updateDb(updateOptions));
    },
    changeExistsCategLimit: (v) => {
        dispatch(updateExistsCategoryLimit(v));
    },
});
const ConnectedCategorySelect = ({ checkbox, user_uid, categories, changeLimitExistCateg, changeExistsCategLimit, updateDbFromSelect }) => {

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

            let updateCategoriesNew = +changeLimitExistCateg;
            let updateCategoriesAdd = +selectCategLimit + +changeLimitExistCateg;

            let updatesNewCateg = {};
            let updatesChangeCateg = {};
            updatesNewCateg['users/' + user_uid + '/categories/' + selectCategKey + '/limit'] = updateCategoriesNew;
            updatesChangeCateg['users/' + user_uid + '/categories/' + selectCategKey + '/limit'] = updateCategoriesAdd;
            try {
                checkbox ?
                    updateDbFromSelect(updatesChangeCateg)
                    : updateDbFromSelect(updatesNewCateg);
            } catch {
                return null;
            }

        };

    useEffect(() => {
        memoHandleChangeSelectLimit();
        memoHandleCurrCategory();
    }, [memoHandleChangeSelectLimit, memoHandleCurrCategory])
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