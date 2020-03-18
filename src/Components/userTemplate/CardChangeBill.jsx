import React, { useState, useEffect } from 'react';
// react redux stuf
import { connect } from 'react-redux';
//
// for toast anim
import { toastAnimation, toastAnimationDestroy } from '../../css-materialize animations/toast';
//
import PropTypes from 'prop-types';
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

const ConnectedCard = (props) => {
    const [checkbox, setCheckbox] = useState(true);
    const [newBill, setNewBill] = useState(0);

    const handleChangeCheckbox = (e) => {
        setCheckbox(e.target.checked);
    };
    const handleChangeInput = (e) => {
        setNewBill(e.target.value);
    };

    const changeBill = () => {
        if (newBill === '' || newBill == 0) {
            toastAnimation('Введите корректное число');
        } else {
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
                checkbox ? props.updateDb(updatesBillAdd)
                    : props.updateDb(updatesBillNew);
                toastAnimation('Счет успешно обновлен');
            } catch {
                toastAnimation('Что-то пошло не так');
            };
        }
    };

    useEffect(() => {
        return () => {
            toastAnimationDestroy();
        };
    }, []);

    return (
        <div className='card custom-card-change-bill '>
            <div className="card-content custom-card-content">
                <span className='card-title white-text'>Изменить счет ({props.user_bill} ₴)</span>
                <div className="switch">
                    <label className='white-text'>
                    Добавить к текущему счету?
                        <input
                            type="checkbox"
                            checked={checkbox}
                            onChange={handleChangeCheckbox} />
                        <span className='lever'></span>
                    </label>
                </div>
                <div className="input-field">
                    <input
                        type="number"
                        id='change-bill'
                        onChange={handleChangeInput}
                    />
                    <label htmlFor="change-bill">Введите число</label>
                </div>
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

ConnectedCard.propTypes = {
    user_uid: PropTypes.string.isRequired,
    user_bill: PropTypes.number.isRequired,
    updateDb: PropTypes.func.isRequired
}

export default Card;