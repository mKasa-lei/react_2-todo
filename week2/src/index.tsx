import React, { useRef,useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

type InputProps={
  // listState:string|null
}
const Input:React.FC<InputProps> = (props) => {
  const [textState,setTextState]=useState(String)

  return (
    <li>
      <input type="text" onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => {
            const textValue:string = String(event.target.value);
            setTextState(textValue)
            console.log(textState);
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

}
const TodoList:React.FC<ToDoListProps> = (props) => {
    // const [listState,setListState]=useState(String);

    return (
        <Pagination />
    );
}

const Todo = () => { 
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
