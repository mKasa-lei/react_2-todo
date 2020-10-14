import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";
import { toEditorSettings } from "typescript";
import { clone } from "lodash";

const Todo: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<string>>(Array());
  const [editing, setEditing] = useState<boolean>(true);
  const toAdd: Function = (e: any) => {
    e.preventDefault();
    if (todo) {
      setTodoList(todoList.concat(todo));
    }
  };
  const changeTxt: Function = (e: any) => {
    setTodo(e.target.value);
  };
  const toDelete: Function = (i: number) => {
    todoList.splice(i, 1);
    const test = clone(todoList);
    setTodoList(test);
  };

  const toEdit: Function = () => {
    setEditing(!editing);
  };
  return (
    <React.Fragment>
      <Input
        todo={todo}
        toAdd={(e: any) => toAdd(e)}
        onChange={(e: any) => changeTxt(e)}
      />
      <TodoList
        todoList={todoList}
        toDelete={(content: string) => toDelete(content)}
        editing={editing}
        toEdit={() => toEdit()}
      />
    </React.Fragment>
  );
};
type PropsInput = {
  todo: string;
  toAdd: Function;
  onChange: Function;
};
const Input: React.FC<PropsInput> = (props) => {
  return (
    <form onSubmit={(e) => props.toAdd(e)}>
      <input
        type="text"
        value={props.todo}
        onChange={(e) => props.onChange(e)}
      />
      <input type="submit" value="追加" />
    </form>
  );
};

type PropsTodoList = {
  todoList: Array<string>;
  toDelete: Function;
  editing: boolean;
  toEdit: Function;
};
const TodoList: React.FC<PropsTodoList> = (props) => {
  const list = props.todoList.map((content, i) => {
    return (
      <li key={i}>
        {props.editing ? (
          <div>
            <span>{content}</span>
            <a href="#" onClick={() => props.toEdit()}>
              編集
            </a>
          </div>
        ) : (
          <div>
            <input type="text" value={content} />
          </div>
        )}
        <a href="#" onClick={() => props.toDelete(content)}>
          ×
        </a>
      </li>
    );
  });
  return <ul>{list}</ul>;
};

ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
