import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

const Todo: React.FC = () => {
  const [list, setList] = useState('こんにちは');
  const todo = [{ title: '' }];

  const changeText: Function = (event: React.ChangeEvent<HTMLInputElement>) => {
    setList(event.target.value);
  }

  const ListArray = list;

  const createTodo = (i: string) => {
    todo.push({ title: i });
    console.log(todo);
  }

  return (
    <React.Fragment>
      {/* <Input /> */}
      <TodoList
        title={list}
        list={todo}
        onChange={(value: string) => changeText(value)}
        onClick={(i: string) => createTodo(i)}
      />
    </React.Fragment>
  )
}

type PropsTodo = {
  title: string;
  list: Array<{ title: string }>;
  onChange: Function;
  onClick: Function;
}

const TodoList: React.FC<PropsTodo> = (props) => {

  const test = props.list.map((value, index) => {
    return (
      <li key={index}>
        <div >{value.title[index]}</div>
      </li>
    )
  });

  return (
    <div>
      <input type='text'
        value={props.title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event)}>
      </input>
      <input type='button' onClick={() => props.onClick(props.title)}></input>
      {test}
    </div>
  )
}





ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
