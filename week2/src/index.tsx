import React, { useState } from 'react';
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

/**
 * TODOを作成（新規入力）する
 */

type inputProps = {
    todo: string[];
    text: string;
    addTodo: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<inputProps> = (props) => {
    return (
        <form>
            <input type="text" onChange={props.onChange} value={props.text} />
            <button type="button" onClick={props.addTodo}>追加</button>
        </form>
    );
}

/**
 * 追加されたTODOを管理する
 */
type listProps = {
    todo: Array<string>;
}
const TodoList: React.FC<listProps> = (props) => {
    const todoList =
        props.todo.map((item: string, index: number) => (
            <li key={index} className={index === 0 ? 'no-list' : 'add-list'}>
                <span>{item}</span>
                <button type="button">編集</button>
                <button type="button">✕</button>
            </li>
        ));
    return (
        <React.Fragment>
            <ul>{todoList}</ul>
        </React.Fragment>
    );
}

/**
 * トップレベルコンポーネント、state管理
 */
type todoProps = {

}
const Todo: React.FC<todoProps> = () => {
    const [text, setText] = useState<string>('');
    const [todo, setTodo] = useState<Array<string>>([text]);//Todoの中身

    const addTodo = () => {
        const newTodo = todo.concat(text);
        setTodo(newTodo);
        setText('');
        console.log(newTodo);
    }

    const textChange = (event: any) => {
        const value = event.target.value;
        setText(value);
    }

    return(
        <React.Fragment>
            <Input addTodo={addTodo} todo={todo} text={text} onChange={textChange}/>
            <TodoList todo={todo}/>
        </React.Fragment>
    );
}

ReactDOM.render(
    <Todo />,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();