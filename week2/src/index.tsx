import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

type InputProps={
  handleClick:()=>void
}
const Input:React.FC<InputProps> = () => {
  return (
    <li>
      <input type="text" onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => {
            props.handleClick(event.target.value)
      }
      } />
      <button>Add</button>
    </li>
  )
}
const Pagination = () => {
  return(
    <div></div>
  )
}
type ToDoListProps={
  text:string
}
const TodoList:React.FC<ToDoListProps> = (props) => {
  const [list,SetList]=useState("fill");
    return (
        <Pagination />
    );
}

const Todo = () => { 
  const [text,setText]=useState<string>("")
  const handleClick=()=>{
    setText(String)
  }
    return(
        <React.Fragment>
            <Input />
            <TodoList />
        </React.Fragment>
    )
}


ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
