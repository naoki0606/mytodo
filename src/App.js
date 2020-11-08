import './App.css';
import React from 'react';
import Tab from './Tab.js'
import Content from './Content.js'
import Option from './Option.js'

const todolist=[];

//TODOLISのイメージ
// [ 
  //  {title:@@@,
  //    list:[
  //    {title:'',check:false, id:''  },{title:'',check:false, id:''  },{title:'',check:false}
  //   ]
  //  },
  //  {title:@@@,
  //    list:[
  //    {title:'',check:false  },{title:'',check:false  },{title:'',check:false}
  //   ]
  //  },~~~~~~~~~~~~~
  // ]

// ユニークなIDの生成
  function UniqueId(){
  return new Date().getTime().toString(36)+'-'+Math.random().toString(36);
}

class App extends React.Component{
  constructor(){
    super();
    this.state={
      todos:todolist,
    }
    this.create_tab_title=this.create_tab_title.bind(this)
    this.active=this.active.bind(this);
    this.newlist=this.newlist.bind(this);
    this.checkchange=this.checkchange.bind(this);
    this.delete=this.delete.bind(this);
    this.all_delete=this.all_delete.bind(this);
    this.rename_tab=this.rename_tab.bind(this);
    this.delete_tab=this.delete_tab.bind(this);
  }

//タブ内に新しいリストを追加 
  newlist(){
    const addlist = window.prompt('リスト名を入力してください');
    if(addlist!==null && addlist.trim()){
      const todos = this.state.todos.map(todo=>{
        if(todo.active){
          const list_contetn={title:addlist, check:false, id:UniqueId()}
          todo.list.push(list_contetn);
          return{title:todo.title, class:todo.class, active:todo.active, id:todo.id, list:todo.list}
        } else{
          return(todo)
        }
      });
      
      this.setState({
        todos:todos
      })
    }
  }

//選択されたタブをIDで判断し表示 
  active(id){
    const todos = this.state.todos.map(todo=>{
      return {title:todo.title, class:'', active:false, id:todo.id, list:todo.list}
    })

    const pos = this.state.todos.map(todo=>{
      return todo.id;
    }).indexOf(id);

    todos[pos].class='selected';
    todos[pos].active=true;
    

    this.setState({
      todos:todos
    })

  }

  //新しいタブを作成すると同時に選択される 
  create_tab_title(tab_title){

    const todos = this.state.todos.map(todo=>{
      return {title:todo.title, class:'', active:false, id:todo.id, list:todo.list}
    })

    const table={
      title:'',
      class:'selected',
      active:true,
      id:'',
      list:[]
    };

    table.title=tab_title;
    table.id= UniqueId();
    todos.push(table);
    this.setState({
      todos:todos
    });
  }


  // リストのチェックボックスのトグル
  checkchange(li){
        const todos = this.state.todos.map(todo=>{
      if(todo.active){
          const pos = todo.list.map(list=>{
            return list.id
          }).indexOf(li.id);
          todo.list[pos].check = !todo.list[pos].check;
        return(todo);
      } else{
        return(todo);
      }
    });

    this.setState({
      todos:todos
    })
  }

// テェックされたリストの削除
  delete(){
    const todos = this.state.todos.map(todo=>{
      if(todo.active){
          const unchecked_list = todo.list.filter(function(list){
            return list.check === false;
          })
          todo.list = unchecked_list;
          return(todo);
      } else{
        return(todo);
      }
    });

    this.setState({
      todo:todos
    });
  }

//　選択中の全リストの削除 
  all_delete(){
    if(window.confirm('are you sure?')){
      const todos = this.state.todos.map(todo=>{
        if(todo.active){
            todo.list = [];
            return(todo);
        } else{
          return(todo);
        }
      });
      
      this.setState({
        todos:todos
      });

    }

  }

  rename_tab(rename){
    const todos = this.state.todos.map(todo=>{
      if(todo.active){
          todo.title = rename;
          return(todo);
      } else{
        return(todo);
      }
    });
    
    this.setState({
      todos:todos
    });
  }

  delete_tab(){
    const todos = this.state.todos.map(todo=>{
      if(todo.active){
          todo.id = 'a';
          return(todo);
      } else{
        return(todo);
      }
    });

    const pos = this.state.todos.map(todo=>{
      return todo.id;
    }).indexOf('a');

    todos.splice(pos,1);

    this.setState({
      todos:todos
    });

  }

  render(){
    return(
      <div className='box'>
          <Tab
          active={this.active}
          create_tab_title={this.create_tab_title}
          todos={this.state.todos}
          rename_tab={this.rename_tab}
          delete_tab={this.delete_tab}/>
          <Content
          todos={this.state.todos}
          checkchange={this.checkchange}/>
          <Option
          newlist={this.newlist}
          delete={this.delete}
          all_delete={this.all_delete}/>
      </div>
    )
  }
}

export default App;
