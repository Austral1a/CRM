import React, { useEffect } from 'react';
// css
import '../../styles/categoryTemplate/category.css';
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
// select animation and animation delete when unmounted will ocurs
import { selectAnimation, selectAnimationDestroy } from '../../css-materialize animations/select';
//
const mapDispatchToProps = (dispatch) => ({
    updateDb: (updateOptions) => {
        dispatch(updateDb(updateOptions))
    },
    getCategories: (user_uid) => {
        dispatch(getCategories(user_uid))
    }
});

const ConnectedCategory = () => {

    useEffect(() => {
        selectAnimation()

        return () => {
            selectAnimationDestroy();
        };
    });

    return (
        <div className='wrapper-category'>
            <div className="card category-create">
                <div className="card-content">
                    <h5>Новая категория</h5>
                    <div className="input-field">
                        <input
                            type="text"
                            id='category_name' />
                        <label htmlFor="category_name">Название</label>
                    </div>
                    <div className="input-field">
                        <input
                            type='number'
                            id='category_value'
                        />
                        <label htmlFor="category_value">Лимит</label>
                    </div>
                </div>
            </div>
            <div className="card category-change">
                <div className="card-content">
                    <h5>Редактировать категории</h5>
                    <div className="input-field">
                        <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <input
                            type='number'
                            id='category_value'
                        />
                        <label htmlFor="category_value">Лимит</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Category = connect(
    null,
    mapDispatchToProps
)(ConnectedCategory);

export default Category;