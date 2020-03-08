import React from 'react';
import '../../styles/UserTemplateStyle/user.css'
const User = (props) => {

    return (
        <div className='user-information'>
            {props.user_img}
            {props.user_email}
            {props.user_name}
        </div>
    )

}

export default User;