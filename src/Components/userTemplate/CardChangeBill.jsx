import React, { useState, useEffect } from 'react';
// react redux stuf
import { connect } from 'react-redux';
//
// for toast anim
import { toastAnimation, toastAnimationDestroy } from '../../css-materialize animations/toast';
//

// update db
import { updateDb } from '../../store/actions/index';
//
const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    user_bill: state.userBillValueReducer.user_bill
});

const mapDispatchToProps = (dispatch) => ({
    updateDb: (updateOptions) => {
        dispatch((updateDb(updateOptions)));
    }
});
//TODO: Убрать errorDb state.
const ConnectedCard = (props) => {
    const [checkbox, setCheckbox] = useState(true);
    const [newBill, setNewBill] = useState(0);

    const handleChangeCheckbox = (e) => {
        setCheckbox(e.target.checked);
    };
    const handleChangeInput = (e) => {
        setNewBill(e.target.value);
    };

    const changeBill = async () => {
        // if need a new bill
        const postBillNew = Number(newBill)
        const updatesBillNew = {};
        updatesBillNew['users/' + props.user_uid + '/info/bill'] = postBillNew;
        ////
        // if need to add money into exist bill
        const postBillAdd = Number(newBill) + Number(props.user_bill);
        const updatesBillAdd = {};
        updatesBillAdd['users/' + props.user_uid + '/info/bill'] = postBillAdd;
        ////
        try {
            checkbox ? await props.updateDb(updatesBillAdd)
                : await props.updateDb(updatesBillNew);
            toastAnimation('Счет успешно обновлен');
        } catch {
            toastAnimation('Что-то пошло не так');
        };
    };

    useEffect(() => {
        return () => {
            toastAnimationDestroy();
        };
    }, []);

    return (
        <div className='card custom-card'>
            <div className="card-content custom-card-content">
                <span className='card-title white-text'>Изменить счет ({props.user_bill} грн)</span>
                <div className="switch">
                    <h6>Добавить к текущему счету?</h6>
                    <label className='white-text'>
                        -
                        <input
                            type="checkbox"
                            checked={checkbox}
                            onChange={handleChangeCheckbox} />
                        <span className='lever'></span>
                        +
                    </label>
                </div>
                <input
                    type="number"
                    placeholder='Введите число'
                    id='change-bill'
                    onChange={handleChangeInput}
                />
                <label htmlFor="change-bill"></label>
                <button
                    className='waves-effect waves-light btn btm-small'
                    onClick={changeBill}
                >Обновить счет</button>
            </div>
        </div>
    );
};
const Card = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCard);
export default Card;