import React from 'react';
const BillAmount = (props) => {
    return (
        <div className='available-bill'>
            <div className="card">
                <div className="card-content">
                    <span className="card-title white-text">Счет</span>
                    <h5 className="tooltipped" data-position='bottom' data-tooltip='Это ваш текущий счет'>{props.user_bill} {'U+20B4'}</h5>
                </div>
            </div>
        </div>
    );
};

export default BillAmount;