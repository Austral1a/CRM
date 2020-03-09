import React, { useState, useEffect } from 'react';

import firebase from 'firebase';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    user_bill: state.userBillValueReducer.user_bill
});

const ConnectedCard = (props) => {
    const [checkbox, setCheckbox] = useState(false);
    const [newBill, setNewBill] = useState(0);

    const handleChangeCheckbox = (e) => {
        setCheckbox(e.target.checked);
    }
    const handleChangeInput = (e) => {
        setNewBill(e.target.value);
    }

    const changeBill = async () => {
        // if need new bill
        const postBillNew = {
            bill: Number(newBill),
        }
        const updatesBillNew = {};
        updatesBillNew['users/' + props.user_uid + '/info/'] = postBillNew;
        ////
        // if need to add money into exist bill
        const postBillAdd = {
            bill: Number(newBill) + Number(props.user_bill),
        };
        const updatesBillAdd = {};
        updatesBillAdd['users/' + props.user_uid + '/info/'] = postBillAdd;
        ////
        try {
            checkbox ? await firebase.database().ref().update(updatesBillAdd)
                : await firebase.database().ref().update(updatesBillNew);
        } catch {
            console.log('error')
        }
    }

    return (
        <div className='card custom-card'>
            {console.log(props.user_uid)}
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
                    className='waves-effect waves-light btm-small'
                    onClick={changeBill}
                >Обновить счет</button>
            </div>
        </div>
    );
};
const Card = connect(
    mapStateToProps
)(ConnectedCard);
export default Card;