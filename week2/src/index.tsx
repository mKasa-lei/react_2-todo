import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";
import { useState } from "react";

type Todo = {
  id: number;
  name: string;
};

type TodoListItemProps = {
  todo: Todo;
  onDelete: (todo: Todo) => void;
};

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDelete }) => {
  const onClick = () => {
    onDelete(todo);
  };
  return (
    <li>
      {todo.name}
      <input type="button" onClick={onClick} value="×" />
    </li>
  );
};

type TodoListProps = {
  todos: Todo[];
  onDelete: (todo: Todo) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => (
  <ol>
    {todos.map((todo: any) => (
      <TodoListItem todo={todo} key={todo.id} onDelete={onDelete} />
    ))}
  </ol>
);

type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (event: React.FormEvent<HTMLFormElement>) => void;
  todo: Todo;
};

const Input: React.FC<InputProps> = ({ onChange, onAdd, todo }) => (
  <form onSubmit={onAdd}>
    <input onChange={onChange} value={todo.name} />
    <button type="submit">追加</button>
  </form>
);

type State = {
  newTodo: Todo;
  todos: Todo[];
};

const App = () => {
  const [newTodo, setNewTodo] = useState({ id: 1, name: "" });
  const [todos, settodos] = useState<Array<any>>([]);
  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo.name.length) {
      return;
    }

    setNewTodo({ id: newTodo.id + 1, name: "" });
    settodos([...todos, newTodo]);
  };

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputedValue = event.target.value;
    setNewTodo({ ...newTodo, name: inputedValue });
  };

  const deleteTodo = (todoToDelete: Todo) => {
    settodos([...todos.filter((todo) => todo.id !== todoToDelete.id)]);
  };

  return (
    <div>
      <h2>Todoリスト</h2>
      <Input todo={newTodo} onAdd={addTodo} onChange={handleTodoChange} />
      <TodoList todos={todos} onDelete={deleteTodo} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
