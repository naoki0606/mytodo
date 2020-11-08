import React from 'react';
import TabListContent from './tablistcontent.js'

function TabList(props){
    const tablist = props.todos.map(todo=>{
        return(
            <TabListContent
            active={props.active}
            todo={todo}
            key={todo.id}
            title={todo.title}/>
        );
    })

    return(
        props.todos.length?tablist:<div className='nothing'>
            TO Create New Tab, Click 'Create' →
        </div>
    )
}

export default TabList;