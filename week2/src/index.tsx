import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

type InputType = {
  text: string;
  time: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  concatList: () => void;
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
      <button onClick={() => props.concatList()}>Add</button>
    </div>
  );
};

type PaginationType = {
  list: listType;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  paginationArray: Array<number>;
  setPaginationArray: React.Dispatch<React.SetStateAction<Array<number>>>;
};

const Pagination: React.FC<PaginationType> = (props) => {
  const {
    list,
    current,
    setCurrent,
    paginationArray,
    setPaginationArray,
  } = props;
  const amountPage = list.length / 3;
  const clickFirst = () => {
    setCurrent(1);
  };
  const clickLast = () => {
    setCurrent(10);
  };
  const clickPrevious = () => {
    if (current === 1) return;
    setCurrent(current - 1);
  };
  const clickNext = () => {
    if (current > Math.floor(amountPage)) return;
    setCurrent(current + 1);
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
        className={value === current ? "chosen" : "unchosen"}
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
  list: listType;
  time: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setList: React.Dispatch<React.SetStateAction<listType>>;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  paginationArray: Array<number>;
  setPaginationArray: React.Dispatch<React.SetStateAction<Array<number>>>;
  toEdit: number;
  setToEdit: React.Dispatch<React.SetStateAction<number>>;
};

const TodoList: React.FC<ToDoListType> = (props) => {
  const {
    text,
    time,
    list,
    setList,
    current,
    setCurrent,
    paginationArray,
    setPaginationArray,
    toEdit,
    setToEdit,
  } = props;

  const deleteItem = (index: string) =>
    setList(list.filter((i) => i.textValue !== index));

  const EnterKeyPress = (event: React.KeyboardEvent) => {
    const EnterKeyCode = 13;
    if (event.keyCode === EnterKeyCode) {
      setToEdit(-1);
    }
  };

  const todoList = list.map((value, index) =>
    toEdit === index ? (
      <input
        onKeyDown={EnterKeyPress}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          list[index].textValue = event.target.value;
          setList(list);
        }}
      />
    ) : (
      <li key={index}>
        {list[index].textValue}
        {list[index].time}

        <a href="#" onClick={() => setToEdit(index)}>
          編集
        </a>
        <a href="#" onClick={() => deleteItem(list[index].textValue)}>
          ×
        </a>
      </li>
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

type listType = Array<{
  textValue: string;
  time?: string;
}>;

const Todo = () => {
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<listType>([]);
  const [toEdit, setToEdit] = useState<number>(-1);
  const [current, setCurrent] = useState(0);
  const [paginationArray, setPaginationArray] = useState<Array<number>>([
    1,
    2,
    3,
    4,
    5,
  ]);

  const nowData = new Date();

  const Y = nowData.getFullYear();
  const M = ("00" + (nowData.getMonth() + 1)).slice(-2);
  const D = ("00" + nowData.getDate()).slice(-2);
  const h = ("00" + nowData.getHours()).slice(-2);
  const m = ("00" + nowData.getMinutes()).slice(-2);
  const s = ("00" + nowData.getSeconds()).slice(-2);

  const time = `${Y}/${M}/${D} ${h}:${m}:${s}`;

  const concatList = () => {
    setList(list.concat({ textValue: text, time: time }));
  };

  return (
    <React.Fragment>
      <Input
        text={text}
        setText={setText}
        concatList={concatList}
        time={time}
      />
      <TodoList
        text={text}
        list={list}
        time={time}
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
