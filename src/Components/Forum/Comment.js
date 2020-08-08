import React, { Component } from 'react';

const Comment = (props) => {
    return ( 
        <>
            <p>{props.user_id}</p>
            <p>{props.text_content}</p>
        </>
     );
}
 
export default Comment;