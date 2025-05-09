import { useState } from "react";
import { Todo } from "../models/Todo";
import { TodoForm } from "./form";

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, task: "Handla", isDone: false },
    { id: 2, task: "Städa", isDone: false },
    { id: 3, task: "Ta ut hundarna", isDone: false },
    { id: 4, task: "Ringa vårdcentralen", isDone: false },
  ]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleClick = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markAsDone = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );

    setTodos(updatedTodos);
  };

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <h1>Todo:</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span className={todo.isDone ? "done" : ""}>{todo.task}</span>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => markAsDone(todo.id)}
            />
            <button onClick={() => handleClick(todo.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </>
  );
};
