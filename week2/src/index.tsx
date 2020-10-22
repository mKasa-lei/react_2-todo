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
  listCopy: Array<string>;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  paginationArray: number[];
  setPaginationArray: React.Dispatch<React.SetStateAction<number[]>>;
};

const Pagination: React.FC<PaginationType> = (props) => {
  const amountPage = props.listCopy.length / 3;
  const ClickFirst = () => {
    props.setCurrent(1);
  };
  const ClickLast = () => {
    props.setCurrent(10);
  };
  const ClickPrevious = () => {
    if (props.current === 1) return;
    props.setCurrent(props.current - 1);
  };
  const ClickNext = () => {
    if (props.current > Math.floor(amountPage)) return;
    props.setCurrent(props.current + 1);
  };
  const PaginationClick = (i: number) => {
    if (i >= 3 && i <= 8) {
      props.setPaginationArray([i - 2, i - 1, i, i + 1, i + 2]);
    } else if (i === 2) {
      props.setPaginationArray([1, 2, 3, 4, 5]);
    }
    props.setCurrent(i);
  };

  const rendPagination = props.paginationArray.map((value, index) => (
    <li key={index} className="Pagination">
      <a
        className={value === props.current ? "chosen" : "unchosen"}
        href="#"
        onClick={() => {
          PaginationClick(value);
        }}
      >
        {value}
      </a>
    </li>
  ));

  return (
    <div>
      <a href="#" onClick={() => ClickFirst()}>
        first
      </a>
      <a href="#" onClick={() => ClickPrevious()}>
        ＜
      </a>
      {rendPagination}
      <a href="#" onClick={() => ClickNext()}>
        ＞
      </a>
      <a href="#" onClick={() => ClickLast()}>
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
  const { current, setCurrent } = props;
  const { paginationArray, setPaginationArray } = props;

  const nowData = new Date();

  const Y = nowData.getFullYear();
  const M = ("00" + (nowData.getMonth() + 1)).slice(-2);
  const D = ("00" + nowData.getDate()).slice(-2);
  const h = ("00" + nowData.getHours()).slice(-2);
  const m = ("00" + nowData.getMinutes()).slice(-2);
  const s = ("00" + nowData.getSeconds()).slice(-2);

  const currentTime = Y + "/" + M + "/" + D + " " + h + ":" + m + ":" + s;

  const deleteList = (i: number, index: string) =>
    props.setList(props.list.filter((i) => i !== index));

  const keyPress = (event: React.KeyboardEvent) => {
    const EnterKeyCode = 13;
    if (event.keyCode === EnterKeyCode) {
      props.setToEdit(-1);
    }
  };
  const listCopy = props.list;

  const listMap = props.list.map((value, index) =>
    props.toEdit !== index ? (
      <li key={index}>
        {value}
        {currentTime}
        <a href="#" onClick={() => props.setToEdit(index)}>
          編集
        </a>
        <a href="#" onClick={() => deleteList(index, value)}>
          ×
        </a>
      </li>
    ) : (
      <input
        onKeyDown={keyPress}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          listCopy[index] = event.target.value;
          props.setList(listCopy);
        }}
      />
    )
  );
  return (
    <div>
      <ul>{listMap}</ul>
      <Pagination
        listCopy={listCopy}
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
