import React, { useEffect } from 'react';
// css
import '../../styles/categoryTemplate/category.css';
//

import { selectAnimation, selectAnimationDestroy } from '../../css-materialize animations/select';
const Category = () => {

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
    )
}

export default Category;