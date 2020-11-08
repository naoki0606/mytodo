import React from 'react';

function TabListContent(props){
    return(
                
        <div className={props.todo.class} onClick={()=>{props.active(props.todo.id)}}>
            {props.title}
        </div>
    )

}


export default TabListContent;