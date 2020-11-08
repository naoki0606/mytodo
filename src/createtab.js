import React from 'react';

function CreateTab(props){
    function create_tab_title(){
        if(window.confirm('新しいTAB作りますか？')){
            const tab_title = window.prompt('タイトルを入力してください');
            if(tab_title!==null && tab_title.trim()){
                props.create_tab_title(tab_title);
            }
        }
    }

    function rename_tab(){
        const rename = window.prompt('変更後のリスト名を入力してください');
        if(rename!==null && rename.trim()){
            props.rename_tab(rename);
        }
    }

    function delete_tab(){
        
        if(window.confirm('このタブを削除しますか')){
            props.delete_tab();
        }
    }

    return(
        <section className='tab_menue'>
            <button className='createtab' onClick={create_tab_title}>Create</button>
            <button className='createtab'　onClick={rename_tab}>Rename</button>
            <button className='createtab' onClick={delete_tab}>Delete</button>
        </section>
        )
    }

export default CreateTab;