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
const Pagination = () => {
  return(
    <div></div>
  )
}

type ToDoListProps={
  text:string
  list:Array<string>
  setList:React.Dispatch<React.SetStateAction<Array<string>>>
  deleteList:(i:number,index:string)=>void
}

const TodoList:React.FC<ToDoListProps> = (props) => {
  const listMap=props.list.map((value,index)=>(
    <li key={index}>
      {value}
      <a href="#" onClick={()=>props.deleteList(index,value)}>消去</a>
    </li>
  ))
    return (
      <div>
        <ul>{listMap}</ul>
        <Pagination />
      </div>
    );
}

const Todo = () => { 
  const [text,setText]=useState<string>("")
  const [list,setList]=useState<Array<string>>([]);
  const concatList=()=>setList(list.concat(text))
  const deleteList=(i:number,index:string)=>setList(list.filter(i=>i!==index))
  const editList=
  
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
            setList={setList}
            deleteList={deleteList}
            />
        </React.Fragment>
    )
}

ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
