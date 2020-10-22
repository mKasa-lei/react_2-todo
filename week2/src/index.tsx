import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

type InputType = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  concatList: (i: string) => void;
};
const Input: React.FC<InputType> = (props) => {
  return (
    <div>
      <input
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.setText(event.target.value);
        }}
      />
      <button onClick={() => props.concatList(props.text)}>Add</button>
    </div>
  );
};

type PaginationType = {
  list: Array<string>;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  paginationArray: Array<number>;
  setPaginationArray: React.Dispatch<React.SetStateAction<number[]>>;
};

const Pagination: React.FC<PaginationType> = (props) => {
  const amountPage = props.list.length / 3;
  const { current, setCurrent, paginationArray, setPaginationArray } = props;
  const clickFirst = () => {
    setCurrent(1);
  };
  const clickLast = () => {
    setCurrent(10);
  };
  const clickPrevious = () => {
    if (props.current === 1) return;
    setCurrent(props.current - 1);
  };
  const clickNext = () => {
    if (current > Math.floor(amountPage)) return;
    setCurrent(props.current + 1);
  };
  const clickNumber = (i: number) => {
    if (i >= 3 && i <= 8) {
      setPaginationArray([i - 2, i - 1, i, i + 1, i + 2]);
    } else if (i === 2) {
      setPaginationArray([1, 2, 3, 4, 5]);
    }
    setCurrent(i);
  };

  const paginationNumber = paginationArray.map((value, index) => (
    <li key={index} className="Pagination">
      <a
        className={value === props.current ? "chosen" : "unchosen"}
        href="#"
        onClick={() => {
          clickNumber(value);
        }}
      >
        {value}
      </a>
    </li>
  ));

  return (
    <div>
      <a href="#" onClick={() => clickFirst()}>
        first
      </a>
      <a href="#" onClick={() => clickPrevious()}>
        ＜
      </a>
      {paginationNumber}
      <a href="#" onClick={() => clickNext()}>
        ＞
      </a>
      <a href="#" onClick={() => clickLast()}>
        last
      </a>
    </div>
  );
};

type ToDoListType = {
  text: string;
  list: Array<string>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setList: React.Dispatch<React.SetStateAction<Array<string>>>;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  paginationArray: number[];
  setPaginationArray: React.Dispatch<React.SetStateAction<number[]>>;
  toEdit: number;
  setToEdit: React.Dispatch<React.SetStateAction<number>>;
};

const TodoList: React.FC<ToDoListType> = (props) => {
  const { current, setCurrent, paginationArray, setPaginationArray } = props;

  const nowData = new Date();

  const Y = nowData.getFullYear();
  const M = ("00" + (nowData.getMonth() + 1)).slice(-2);
  const D = ("00" + nowData.getDate()).slice(-2);
  const h = ("00" + nowData.getHours()).slice(-2);
  const m = ("00" + nowData.getMinutes()).slice(-2);
  const s = ("00" + nowData.getSeconds()).slice(-2);

  const editTime = `${Y}/${M}/${D} ${h}:${m}:${s}`;

  const deleteList = (i: number, index: string) =>
    props.setList(props.list.filter((i) => i !== index));

  const EnterKeyPress = (event: React.KeyboardEvent) => {
    const EnterKeyCode = 13;
    if (event.keyCode === EnterKeyCode) {
      props.setToEdit(-1);
    }
  };
  const list = props.list;

  const todoList = props.list.map((value, index) =>
    props.toEdit !== index ? (
      <li key={index}>
        {value}
        {editTime}
        <a href="#" onClick={() => props.setToEdit(index)}>
          編集
        </a>
        <a href="#" onClick={() => deleteList(index, value)}>
          ×
        </a>
      </li>
    ) : (
      <input
        onKeyDown={EnterKeyPress}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          list[index] = event.target.value;
          props.setList(list);
        }}
      />
    )
  );
  return (
    <div>
      <ul>{todoList}</ul>
      <Pagination
        list={list}
        current={current}
        setCurrent={setCurrent}
        paginationArray={paginationArray}
        setPaginationArray={setPaginationArray}
      />
    </div>
  );
};
const Todo = () => {
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<Array<string>>([]);
  const [toEdit, setToEdit] = useState<number>(-1);
  const [current, setCurrent] = useState(0);
  const [paginationArray, setPaginationArray] = useState<Array<number>>([
    1,
    2,
    3,
    4,
    5,
  ]);
  const concatList = () => setList(list.concat(text));

  return (
    <React.Fragment>
      <Input text={text} setText={setText} concatList={concatList} />

      <TodoList
        text={text}
        list={list}
        setText={setText}
        setList={setList}
        current={current}
        setCurrent={setCurrent}
        paginationArray={paginationArray}
        setPaginationArray={setPaginationArray}
        toEdit={toEdit}
        setToEdit={setToEdit}
      />
    </React.Fragment>
  );
};

ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
