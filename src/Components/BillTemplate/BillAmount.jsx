import React, {useCallback} from 'react';
import {tooltipAnimation, tooltipDestroy} from '../../css-materialize animations/tooltip';
import { useEffect } from 'react';
const BillAmount = (props) => {

    const tooltipedRef = useCallback(
        (node) => {
            if (node != null) {
                tooltipAnimation(node);
            };
        }, []);
    useEffect(() => {
        return () => {
            tooltipDestroy()
        }
    }, []);
    return (
        <div className='available-bill'>
            <div className="card">
                <div className="card-content">
                    <span className="card-title white-text">Счет</span>
                    <h5 ref={tooltipedRef} className="tooltipped" data-position='bottom' data-tooltip='Это ваш текущий счет'>{props.user_bill} ₴</h5>
                </div>
            </div>
        </div>
    );
};

export default BillAmount;