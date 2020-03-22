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
import {modalAnimation, modalDestroy, modalOpen} from '../../css-materialize animations/modal';
import { setFirstVisitCategoryPage, getVisitedPages } from '../../store/actions/index';
import { setNewCategoryLimit, setNewCategoryName } from '../../store/actions/index';


const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    categories: state.getCategoriesReducer.categories,
    get_categ_success: state.getCategoriesReducer.getCategoriesSuccess,
    changeLimitExistCateg: state.updateLimitCategReducer.changeLimit,
    user_bill: state.userBillValueReducer.user_bill,

    newName: state.newNameCategoryReducer.newName,
    newLimit: state.newLimitCategoryReducer.newLimit,

    checkbox: state.setCategCheckboxReducer.isChecked,

    isVisitedCategoryPage: state.getVisitedPagesReducer.category_page,

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
    setFirstVisitCategoryPage: (user_uid) => {
        dispatch(setFirstVisitCategoryPage(user_uid));
    },
    getVisitedPages: (user_uid) => {
        dispatch(getVisitedPages(user_uid));
    },
    setLimit: (limit) => {
        dispatch(setNewCategoryLimit(limit));
    },
    setName: (name) => {
        dispatch(setNewCategoryName(name));
    }

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
    categories,
    setFirstVisitCategoryPage,
    getVisitedPages,
    isVisitedCategoryPage,
    setLimit,
    setName
}) => {

    const modelRef = useCallback(
        (node) => {
            if (node != null) {
                modalAnimation(node);
            };
    }, []);

    const [categNames, setCategNames] = useState([]);
    const updateDbAddNewCategory = () => {
        let postCategories = {
            name: newName,
            limit: newLimit,
        };
        if (newLimit > user_bill) {
            toastAnimation('У вас нет столько денег на счету!')
        } else if (categNames.includes(newName.toLowerCase())) {
            toastAnimation('Такая категория уже существует');
        } else if (newName == '') {
            toastAnimation('Введите корректное название');
        } 
        else if (newLimit <= 0) {
            toastAnimation('Введите корректный лимит');
        } 
        else {

            let updatesNewCateg = {};
            let postKey = firebase.database().ref().child(`users${user_uid}`).push().key;
            updatesNewCateg['users/' + user_uid + '/categories/' + postKey] = postCategories;

            let updatesNewBill = {};
            updatesNewBill['users/' + user_uid + '/info/bill'] = user_bill - newLimit;
            try {
                updateDb(updatesNewCateg);
                toastAnimation('Новая категория была успешно добавлена');
                updateDb(updatesNewBill);
                setLimit('');
                setName('');
            } catch {
                toastAnimation('Что-то пошло не так');
            };
        }
    };

    const getCategNames = useCallback(() => {
        let arr = [];
        Object.values(categories).map((categ) => {
            arr.push(categ.name.toLowerCase());
        });
        setCategNames(arr);
    }, [categories]);
    useLayoutEffect(() => {
        getCategNames()
    }, [getCategNames])
    useEffect(() => {
        document.title = 'Categories | Wallet'
        getBill(user_uid);
        getCategories(user_uid);
        getVisitedPages(user_uid);
        if (!isVisitedCategoryPage) {
            if(get_categ_success) {
                modalOpen();
            }
        };
        return () => {
            toastAnimationDestroy();
            modalDestroy();
        }
    }, [getCategories, user_uid, getBill, getVisitedPages, isVisitedCategoryPage, get_categ_success]);
    const handleClick = () => {
        setFirstVisitCategoryPage(user_uid);
    }
    return (
        <>
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
        </div>
        {!isVisitedCategoryPage ?
                (
                    <div ref={modelRef} id='modal' className='modal'>
                        <div className='modal-content'>
                            <h4>Для чего это страница?</h4>
                            <p>
                                На этой странице вы можете создавать или редактировать категории.
                                Для того что-бы создать категорию, в форме с левой стороны введите название и ниже в поле ее лимит.
                                Что-бы изменить категорию, с правой стороны выберите одну из них и введите новый лимит, или добавьте
                                к текущему включив переключатель под кнопкой "Изменить". 
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
    getBill: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    setFirstVisitCategoryPage: PropTypes.func.isRequired,
    getVisitedPages: PropTypes.func.isRequired,
    isVisitedCategoryPage: PropTypes.bool.isRequired,
    setLimit: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
}

export default Category;