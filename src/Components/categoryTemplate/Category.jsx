import React, { useState, useEffect } from 'react';
// css
import '../../styles/categoryTemplate/category.css';
import '../../styles/otherStyles/loader.css';
//
// redux stuff
import { connect } from 'react-redux';
//
// action for updating db
import { updateDb } from '../../store/actions/index';
//
// action for getting categories data
import { getCategories } from '../../store/actions/index';
//
import { updateExistsCategoryLimit } from '../../store/actions/index';
// checkbox which is asking, add to limit or replace old value?
import AddToLimitCheckbox from './AddToLimitCheckbox';
//

//
import CategorySelect from './Select';
//

//
import AddToCategoryName from './AddNewCategory/CategoryInputName';
//

//
import AddToCategoryInput from './AddNewCategory/CategoryInputLimit';
//

//
import firebase from 'firebase';
//
const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    categories: state.getCategoriesReducer.categories,
    get_categ_success: state.getCategoriesReducer.getCategoriesSuccess,
    changeLimitExistCateg: state.updateLimitCategReducer.changeLimit,

    newName: state.newNameCategoryReducer.newName,
    newLimit: state.newLimitCategoryReducer.newLimit,

    checkbox: state.setCategCheckboxReducer.isChecked,
});

const mapDispatchToProps = (dispatch) => ({
    updateDb: (updateOptions) => {
        dispatch(updateDb(updateOptions))
    },
    getCategories: (user_uid) => {
        dispatch(getCategories(user_uid))
    },
    changeExistsCategLimit: (v) => {
        dispatch(updateExistsCategoryLimit(v));
    },
});
const ConnectedCategory = ({
    changeLimitExistCateg,
    user_uid,
    getCategories,
    updateDb,
    get_categ_success,
    newName,
    newLimit }) => {
    //TODO: Сделать валидацию полей
    //TODO: state для селектора

    useEffect(() => {
        getCategories(user_uid);
    }, [getCategories, user_uid])

    const updateDbAddNewCategory = () => {
        let postCategories = {
            name: newName,
            limit: +newLimit,
        };

        let updates = {};
        let postKey = firebase.database().ref().child(`users${user_uid}`).push().key;
        updates['users/' + user_uid + '/categories/' + postKey] = postCategories;
        updateDb(updates);
    }



    return (
        <div className='wrapper-category'>
            <div className="card category-create">
                <div className="card-content">
                    <h5>Новая категория</h5>
                    <AddToCategoryName />
                    <AddToCategoryInput />
                    <button
                        className="waves-effect waves-light btn btn-small"
                        onClick={updateDbAddNewCategory}
                    >Добавить</button>
                </div>
            </div>
            <div className="card category-change">
                <div className="card-content">
                    {get_categ_success ?
                        <>
                            <h5>Редактировать категории</h5>
                            <div className="input-field">
                                <CategorySelect />
                            </div>
                            <AddToLimitCheckbox
                            />
                        </>
                        : <div className='loader'></div>}
                </div>
            </div>
        </div >
    );
};

const Category = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCategory);

export default Category;