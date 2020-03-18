import React, {useState, useEffect, useLayoutEffect,useCallback } from 'react';
// css
import '../../styles/categoryTemplate/category.css';
import '../../styles/otherStyles/loader.css';
//
import PropTypes from 'prop-types';
// redux stuff
import { connect } from 'react-redux';
//
// action for updating db
import { updateDb } from '../../store/actions/index';
//
// action for getting categories data
import { getCategories } from '../../store/actions/index';
//
// checkbox which is asking, add to limit or replace old value?
import AddToLimitCheckbox from './changeExistCategory/AddToLimitCheckbox';
//

//
import CategorySelect from './changeExistCategory/Select';
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
import { getUserBillValue } from '../../store/actions/index';
//animation for toast 
import { toastAnimation, toastAnimationDestroy } from '../../css-materialize animations/toast';
//
const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    categories: state.getCategoriesReducer.categories,
    get_categ_success: state.getCategoriesReducer.getCategoriesSuccess,
    changeLimitExistCateg: state.updateLimitCategReducer.changeLimit,
    user_bill: state.userBillValueReducer.user_bill,

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
    getBill: (user_uid) => {
        dispatch(getUserBillValue(user_uid));
    },

});
const ConnectedCategory = ({
    user_bill,
    user_uid,
    getCategories,
    updateDb,
    get_categ_success,
    newName,
    newLimit,
    getBill ,
    categories}) => {

    const [categNames, setCategNames] = useState([]);
    const updateDbAddNewCategory = () => {
        let postCategories = {
            name: newName,
            limit: newLimit,
        };
        if (newLimit > user_bill) {
            toastAnimation('У вас нет столько денег на счету!')
        } else if (categNames.includes(newName)) {
            toastAnimation('Такая категория уже существует');
        } else {

            let updatesNewCateg = {};
            let postKey = firebase.database().ref().child(`users${user_uid}`).push().key;
            updatesNewCateg['users/' + user_uid + '/categories/' + postKey] = postCategories;

            let updatesNewBill = {};
            updatesNewBill['users/' + user_uid + '/info/bill'] = user_bill - newLimit;
            try {
                updateDb(updatesNewCateg);
                toastAnimation('Новая категория была успешно добавлена');
                updateDb(updatesNewBill);
            } catch {
                toastAnimation('Что-то пошло не так');
            };
        }
    };

    const getCategNames = useCallback(() => {
        let arr = [];
        Object.values(categories).map((categ) => {
            arr.push(categ.name);
        });
        setCategNames(arr);
    }, [categories]);
    useLayoutEffect(() => {
        getCategNames()
    }, [getCategNames])
    useEffect(() => {
        getBill(user_uid);
        getCategories(user_uid);
        return () => {
            toastAnimationDestroy();
        }
    }, [getCategories, user_uid, getBill]);

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
                        {console.log(categNames)}
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

ConnectedCategory.propTypes = {
    user_bill: PropTypes.number.isRequired,
    user_uid: PropTypes.string.isRequired,
    getCategories: PropTypes.func.isRequired,
    updateDb: PropTypes.func.isRequired,
    get_categ_success: PropTypes.bool.isRequired,
    newName: PropTypes.string.isRequired,
    newLimit: PropTypes.string.isRequired,
    getBill: PropTypes.func.isRequired
}

export default Category;