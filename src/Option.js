import React from 'react';

function Option(props){
    return(
        <div className='option'>
            <div onClick={props.newlist}>New</div>
            <div>Order</div>
            <div onClick={props.delete}>Delete</div>
            <div onClick={props.all_delete}>All Delete</div>
        </div>
    )
}

export default Option;