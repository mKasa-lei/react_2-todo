import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

type InputProps={
  value:string
  setText:React.Dispatch<React.SetStateAction<string>>
  concatList:(i:string)=>void

}
const Input:React.FC<InputProps> = (props) => {
  return (
    <div>
      <input type="text" onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => {
            props.setText(event.target.value)
      }
      } />
      <button onClick={()=>props.concatList(props.value)}>Add</button>
    </div>
  )
}

type PaginationProps={
  listCopy:Array<string>;
}

const Pagination:React.FC<PaginationProps> = (props) => {
  const [CurrentIndex,setCurrentIndex]=useState(0)
  const [paginationLength,setPaginationLength]=useState<Array<number>>([1,2,3,4,5])
  const [lastNumber,setLastNumber]=useState(paginationLength.slice(-1)[0])
  const amountPage=props.listCopy.length / 3;
  const paginationCopy=paginationLength.concat([lastNumber]);
  const ClickFirst=()=>{
    setCurrentIndex(1)
  }
  const ClickLast=()=>{
    setCurrentIndex(Math.floor(amountPage))
  }
  const ClickPrevious=()=>{
    if (CurrentIndex===1){
      return;
    }
    setCurrentIndex(CurrentIndex-1)
    console.log(CurrentIndex)
  }
  const ClickNext=()=>{    
    if (CurrentIndex>(Math.floor(amountPage))){
      return;
    }
    if(props.listCopy.length / 3 > lastNumber){
      setLastNumber(lastNumber+1)
      setPaginationLength(paginationCopy)
      console.log(paginationCopy)
    }
    setCurrentIndex(CurrentIndex+1)
  }
  const PaginationClick=(i:number)=>{
    if (CurrentIndex>(Math.floor(amountPage))){
      return;
    }
    if(props.listCopy.length / 3 > lastNumber){
      setLastNumber(lastNumber+1)
      setPaginationLength(paginationCopy)
      console.log(paginationCopy)
    }
    if(paginationLength.length>(CurrentIndex/5)){
    }
    setCurrentIndex(i+1)
    console.log(CurrentIndex)
  };

  const rendPagination=
  paginationLength.map((value,index)=>(
    <li key={index} className="Pagination chosen">
      <a className={index===CurrentIndex-1 ? 'chosen':'unchosen'} href='#' onClick={()=>{PaginationClick(index)}}>
        {index+1}
      </a>
    </li>
  ))

  return(
    <div>
      <a href='#' onClick={()=>ClickFirst()}>first</a>
      <a href="#" onClick={()=>ClickPrevious()}>
        ＜
      </a>
      {rendPagination}
      <a href="#" onClick={()=>ClickNext()}>
        ＞
      </a>
      <a href='#' onClick={()=>ClickLast()}>last</a>
    </div>
  )
}

type ToDoListProps={
  text:string;
  list:Array<string>;
  setText:React.Dispatch<React.SetStateAction<string>>
  changeTag:number;
  setChangeTag:React.Dispatch<React.SetStateAction<number>>
  setList:React.Dispatch<React.SetStateAction<Array<string>>>;
  editList:()=>JSX.Element
  deleteList:(i:number,index:string)=>void;
}

const TodoList:React.FC<ToDoListProps> = (props) => {
  const nowData = new Date();

  const Y = nowData.getFullYear()
  const M = ("00" + (nowData.getMonth()+1)).slice(-2)
  const D = ("00" + nowData.getDate()).slice(-2)
  const h = ("00" + nowData.getHours()).slice(-2)
  const m = ("00" + nowData.getMinutes()).slice(-2)
  const s = ("00" + nowData.getSeconds()).slice(-2)

  const keyPress = (event: React.KeyboardEvent) => {
    const EnterKeyCode=13;
    if (event.keyCode === EnterKeyCode){
      props.setChangeTag(-1)
    }
  }  

  const listCopy=props.list;

  const listMap=props.list.map((value,index)=>(
      props.changeTag !==index ? (
      <li key={index}>
        {value}
        {Y+"/"+M+"/"+D+" "+h+":"+m+":"+s}
        <a href="#" onClick={()=>props.setChangeTag(index)}>編集</a>
        <a href="#" onClick={()=>props.deleteList(index,value)}>消去</a>
      </li>
      ):(
      <input
      onKeyDown={keyPress}
      onChange={
        (event: React.ChangeEvent<HTMLInputElement>) => {
          listCopy[index] = event.target.value ;
          props.setList(listCopy)
        }
      }
      />
      )
  ))
    return (
      <div>
        <ul>{listMap}</ul>
        <Pagination
        listCopy={listCopy} 
        />
      </div>
    );
}

const Todo = () => { 
  const [text,setText]=useState<string>("")
  const [list,setList]=useState<Array<string>>([]);
  const [changeTag,setChangeTag]=useState<number>(-1)
  const concatList=()=>setList(list.concat(text))
  const deleteList=(i:number,index:string)=>setList(list.filter(i=>i!==index))
  const editList=()=>
  {return (
  <input type="text" onChange={
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value)
    }
    } />
  )}

  
    return(
        <React.Fragment>
            <Input
            value={text}
            setText={setText}
            concatList={concatList}
            />
            
            <TodoList
            text={text}
            list={list}
            setText={setText}
            setList={setList}
            deleteList={deleteList}
            changeTag={changeTag}
            setChangeTag={setChangeTag}
            editList={editList}
            />
        </React.Fragment>
    )
}

ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
