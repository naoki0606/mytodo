import React from 'react';
import Lists from './lists.js';

function Content(props){
    return(
        
        <div className='content'>
            <ul className='content_ul'>
                <Lists
                todos={props.todos}
                checkchange={props.checkchange}/>
            </ul>
        </div>
    )
}

export default Content;