import React, {useState, useEffect, useCallback} from 'react';
import '../../styles/UserTemplateStyle/changeUsername.css';
import {collapsibleAnimation, collapsibleDestroy, isOpen} from '../../css-materialize animations/collapsible';
import { toastAnimation, toastAnimationDestroy } from '../../css-materialize animations/toast';
import {updateDb} from '../../store/actions/index';
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        username: state.getUsernameReducer.username,
        user_uid: state.currUserReducer.userUid,
    };
};
const mapDispatchToProps = (dispatch) => ({
    updateDbNewUsername: (options) => dispatch(updateDb(options)),
});

const ConnectedChangeUsername = ({
    username,
    updateDbNewUsername,
    user_uid
}) => {
    const [newUsername, setNewUsername] = useState('');
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

    const collapsibleRef = useCallback(
        (node) => {
            if (node != null) {
                collapsibleAnimation(node, {
                    onOpenStart: () => setIsCollapsibleOpen(true),
                    onCloseEnd: () => setIsCollapsibleOpen(false),
                });
            };
        }, []);

    useEffect(() => {
        return () => {
            collapsibleDestroy();
            toastAnimationDestroy();
        };
    }, []);

    const onUpdateDb = () => {
        if( newUsername.trim() === '' ) {
            toastAnimation('Укажите имя');
            setNewUsername('');
        } else if (newUsername === username) {
            toastAnimation('У вас сейчас это-же имя пользователя');
        } else if (newUsername.length > 25) {
            toastAnimation('Максимальная длина имени 25 символов');
            setNewUsername('');
        } 
        else {

            let postNewUsername = newUsername.trim()

            let updatesNewUsername = {};
            try {
                updatesNewUsername['users/' + user_uid + '/info/username'] = postNewUsername;
                updateDbNewUsername(updatesNewUsername);
                toastAnimation('Ваше имя пользователя было обновлено');
                setNewUsername('');
            } catch {
                toastAnimation('Что-то пошло не так');
            }

        }
    }

    

    return (
        <ul ref={collapsibleRef} className='collapsible'>
            <li>
                <div className="collapsible-header">Изменить имя пользователя <i className='material-icons'>expand_more</i></div>
                <div className="collapsible-body">
                    { isCollapsibleOpen ? 
                    <>
                    <div className="input-field">
                        <input 
                            type="text" 
                            id='change-username' 
                            placeholder='Новое имя пользователя'
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            />
                    </div>
                    <button onClick={onUpdateDb} className='waves-effect waves-light btn btn-small'>Обновить</button>
                    </>
                    : null}
                </div>
            </li>
        </ul>
    );
};

const ChangeUsername = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedChangeUsername);

export default ChangeUsername;