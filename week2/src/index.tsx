import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";
import { toEditorSettings } from "typescript";
import { clone } from "lodash";
import { promises } from "dns";

const Todo: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [editTodo, setEditTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<string>>(Array());
  const [editItem, setEditItem] = useState<number>(-1);
  const [current, setCurrent] = useState<number>(-1);

  const toAdd: Function = (e: any) => {
    e.preventDefault();
    if (todo) {
      setTodoList(todoList.concat(todo));
      setCurrent(current + 1);
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

  const toEdit: Function = (i: number, content: string) => {
    setEditItem(i);
    setEditTodo(content);
  };
  const onReChange: Function = (e: any) => {
    setEditTodo(e.target.value);
  };
  const pushEnter: Function = (e: any, i: number) => {
    if (e.key === "Enter") {
      todoList.splice(i, 1, editTodo);
      const test = clone(todoList);
      setTodoList(test);
      setEditItem(-1);
    }
  };
  const pushNumber: Function = (i: number) => {
    setCurrent(i);
  };
  const pushPrev: Function = () => {
    setCurrent(current - 1);
  };
  const pushNext: Function = () => {
    setCurrent(current + 1);
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
        toDelete={(i: number) => toDelete(i)}
        editItem={editItem}
        toEdit={(i: number, content: string) => toEdit(i, content)}
        onReChange={(e: any) => onReChange(e)}
        editTodo={editTodo}
        pushEnter={(e: any, i: number) => pushEnter(e, i)}
        pushNumber={(i: number) => pushNumber(i)}
        pushPrev={() => pushPrev()}
        pushNext={() => pushNext()}
        current={current}
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
  editItem: number;
  toEdit: Function;
  onReChange: Function;
  editTodo: string;
  pushEnter: Function;
  pushNumber: Function;
  pushPrev: Function;
  pushNext: Function;
  current: number;
};
const TodoList: React.FC<PropsTodoList> = (props) => {
  const list = props.todoList.map((content, i) => {
    return (
      <li key={i} className={props.current === i ? "active" : "none"}>
        {props.editItem !== i ? (
          <div>
            <span>{content}</span>
            <a href="#" onClick={() => props.toEdit(i, content)}>
              編集
            </a>
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={props.editTodo}
              onChange={(e) => props.onReChange(e)}
              onKeyPress={(e) => props.pushEnter(e, i)}
            />
          </div>
        )}
        <a href="#" onClick={() => props.toDelete(i)}>
          ×
        </a>
      </li>
    );
  });
  return (
    <React.Fragment>
      <ul>{list}</ul>
      <Pagination
        todoList={props.todoList}
        pushNumber={(i: number) => props.pushNumber(i)}
        pushPrev={() => props.pushPrev()}
        pushNext={() => props.pushNext()}
        current={props.current}
      />
    </React.Fragment>
  );
};

type PropsPagination = {
  todoList: Array<string>;
  pushNumber: Function;
  pushPrev: Function;
  pushNext: Function;
  current: number;
};
const Pagination: React.FC<PropsPagination> = (props) => {
  var currentlist = props.todoList;
  if (props.todoList.length > 5) {
    if (props.current < 2) {
      currentlist = props.todoList.filter((content, i) => {
        return i < 5;
      });
    } else if (props.current > 7) {
      currentlist = props.todoList.filter((content, i) => {
        return i > 4;
      });
    } else if (
      props.todoList[props.current - 2] &&
      props.todoList[props.current + 2]
    ) {
      currentlist = props.todoList.filter((content, i) => {
        return i > props.current - 3 && i < props.current + 3;
      });
    } else {
      currentlist = props.todoList.filter((content, i) => {
        return props.current - 5 < i;
      });
    }
  }
 
  const list = props.todoList.map((content, i) => {
    return (
      <li key={i}>
        <a href="#" onClick={() => props.pushNumber(i)}>
          {i + 1}
        </a>
      </li>
    );
  });
  return (
    <div>
      <a href="#" onClick={() => props.pushPrev()}>
        &lt;
      </a>
      <ol>{list}</ol>
      <a href="#" onClick={() => props.pushNext()}>
        &gt;
      </a>
    </div>
  );
};

ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
