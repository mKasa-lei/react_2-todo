import React, { useRef,useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

type InputProps={
}
const Input:React.FC<InputProps> = (props) => {
  const inputEl=useRef(null);
  useEffect(() => {
    console.log(inputEl.current);
}, []);
  const onClick = () => {
    alert(inputEl)
  };
  return (
    <li>
      <input ref={inputEl} type="text" />
      <button onClick={onClick}>Add</button>
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
