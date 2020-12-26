import './App.css';
import React from 'react';
import Tab from './Tab.js'
import Content from './Content.js'
import Option from './Option.js'

const todolist=[];

//TODOLISのイメージ
　// [ 
  //  {title:@@@,　// タブ名
  //  class       //選択されたタブにselectedクラスを与えdisplay:hidden;を外すことで表示する
  //  active      //現在selectedクラスがついているかの判定に使う　@return  true|false  selectedクラスあり|無し
  //  id          // keyとなるユニークID
  //  list:[　　  //連想配列の形で　タブ内のtodolistを下記の内容で管理する
  //          (説明)
  //          title   タブ内のtodo名
  //          check   チェック判定
  //          id      一意のid

  //    　　　{title:'',　check:false, 　id:''  },　{title:'',　check:false, id:''  },　{title:'',check:false}
  // 
  //   　　　]
  //  　},
  // 
  //  {title:@@@,
  //  class  ＠＠＠     
  //  active  ＠＠＠    
  //  id      ＠＠＠    
  //   list:[
  //    　　　{title:'',check:false  },{title:'',check:false  },{title:'',check:false}
  //   　　　]
  //  　},
  // 　~~~~~~~~~~~~~
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
        //現在選択されているタブを特定
        if(todo.active){
          //タイトル及びIDを生成して対象タブ内のtodolist連想配列に追加
          const list_content={title:addlist, check:false, id:UniqueId()}
          todo.list.push(list_content);
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

  //選択されたタブをIDで判断しselectedクラス(表示/それ以外はhiddenになる)をつける
  active(id){
    const todos = this.state.todos.map(todo=>{
      return {title:todo.title, class:'none', active:false, id:todo.id, list:todo.list}
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
      return {title:todo.title, class:'none', active:false, id:todo.id, list:todo.list}
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

  // 選択されたタブ名の変更
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

//選択されたタブの削除 
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



  // リストのチェックボックスのトグル
  checkchange(li){
        const todos = this.state.todos.map(todo=>{
      //現在selectedクラス(active=true)になっているタブないの処理に入る 
      if(todo.active){
      // 
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



  render(){
    return(
      <div className='box'>
          <Tab
          todos={this.state.todos}
          active={this.active}
          create_tab_title={this.create_tab_title}
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
