import React from 'react';
function Lists (props){

    const active_todo = props.todos.filter(function(todo){
        return todo.active;
    })


    if(!active_todo.length>= 1){
        return(
            <li>
                ***Description***
                <br/>
                <br/>
                Create ====> you can create new tab menue
                <br/> 
                <br/> 
                Rename ====> you can re-name selected tab menue
                <br/> 
                <br/> 
                Delete ====> you can delete selected tab menue
                <br/> 
                <br/> 
                New    ====> you can create task list in the tab
                <br/> 
                <br/> 
                Order  ====> you can rearrange task list as you like
                <br/> 
                <br/> 
                Delete ====> you can delete the list you can check the box
                <br/> 
                <br/> 
                All Delete ====> you can delete all list content
            </li>
        )
    } else{
        const active_list = active_todo[0].list.map(li=>{
             return(
              <li key={li.id}><label><input type='checkbox' checked={li.check} onChange={()=>props.checkchange(li)}/>{li.title}</label></li>
            )
        })
        return active_list;
    }

}


export default Lists;