import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

type InputProps={
  value:string
  setText:React.Dispatch<React.SetStateAction<string>>
}
const Input:React.FC<InputProps> = (props) => {
  return (
    <li>
      <input type="text" onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => {
            props.setText(event.target.value)
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
  list:string
  setList:React.Dispatch<React.SetStateAction<string>>
}

const TodoList:React.FC<ToDoListProps> = (props) => {
    return (
        <Pagination />
    );
}

const Todo = () => { 
  const [text,setText]=useState<string>("")
  const [list,setList]=useState<string>("")

    return(
        <React.Fragment>
            <Input
            value={text}
            setText={setText}
            />

            <TodoList
            list={list}
            setList={setList}
            />
        </React.Fragment>
    )
}

ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
