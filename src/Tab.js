import React from 'react';
import CreateTab from './createtab.js';
import TabList from './tablist.js'

function Tab(props){
    return(
        <div className='tab'>
            <div className='tablist'>
            <TabList
            active={props.active}
            todos={props.todos}/>
            </div>
            <CreateTab
             create_tab_title={props.create_tab_title}
             rename_tab={props.rename_tab}
             delete_tab={props.delete_tab}/>
        </div>
    )
}



export default Tab;