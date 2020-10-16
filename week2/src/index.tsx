import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";
import { clone } from "lodash";

const Todo: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [editTodo, setEditTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<string>>([]);
  const [editItem, setEditItem] = useState<number>(-1);
  const [current, setCurrent] = useState<number>(0);
  const [date, setDate] = useState<string | number>("");

  const getDate: Function = () => {
    const now = new Date();
    const year = now.getFullYear();
    const mon = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    setDate(year + "/" + mon + "/" + day + " " + hour + ":" + min + ":" + sec);
  };
  const toAdd: Function = (e: any) => {
    e.preventDefault();
    if (todo) {
      if (todoList.length > 99) {
        return;
      } else {
        setTodoList(todoList.concat(todo));
        getDate();
        for (var n = 1; n < 10; n++) {
          if (todoList.length === 10 * n) {
            console.log(todoList.length);
            setCurrent(current + 1);
          }
        }
      }
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
      getDate();
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
        date={date}
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
  date: string | number;
};
const TodoList: React.FC<PropsTodoList> = (props) => {
  const list = props.todoList.map((content, i) => {
    return (
      <li
        key={i}
        className={props.current === Math.floor(i / 10) ? "active" : "none"}
      >
        {props.editItem !== i ? (
          <div>
            <span>{content}</span>
            <span>{props.date}</span>
            <button onClick={() => props.toEdit(i, content)}>
              編集
            </button>
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
        <button onClick={() => props.toDelete(i)}>
          ×
        </button>
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
  const paginations = Math.floor((props.todoList.length - 1) / 10 + 1);

  const paginationList =
    props.todoList.length === 0
      ? Array(1).fill(null)
      : Array(paginations).fill(null);

  const displayList = (i: number) => {
    if (paginations > 5) {
      if (
        props.todoList[(props.current - 2) * 10] &&
        props.todoList[(props.current + 2) * 10]
      ) {
        if (i > props.current - 3 && i < props.current + 3) return "active";
        else return "none";
      } else if (
        props.current - 5 < i &&
        !props.todoList[(props.current + 1) * 10]
      )
        return "active";
      else if (props.current < 2) {
        if (i < 5) return "active";
        else return "none";
      } else if (props.current > 7) {
        if (i > 4) return "active";
        else return "none";
      } else {
        return "none";
      }
    } else {
      return "active";
    }
  };

  const list = paginationList.map((content, i) => {
    return (
      <li
        className={displayList(i)}
        key={i}
        onClick={() => props.pushNumber(i)}
      >
        {i + 1}
      </li>
    );
  });
  return (
    <div>
      <span onClick={() => props.pushPrev()}>&lt;</span>
      <ol>{list}</ol>
      <span onClick={() => props.pushNext()}>&gt;</span>
    </div>
  );
};

ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
