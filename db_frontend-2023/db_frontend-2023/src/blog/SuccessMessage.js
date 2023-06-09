import React from 'react';
import { Link } from 'react-router-dom';

const SuccessMessage = (props) => {
    // destructure the props
    const { post_id, action, link, link_text } = props;
    return (
        <div>
            <p>Post {post_id} {action} successfully</p>
            <p></p>
            <div>
                <Link to={link}>{link_text}</Link>
            </div>
            <p>&nbsp;</p>
        </div>
    );
}

export default SuccessMessage;
