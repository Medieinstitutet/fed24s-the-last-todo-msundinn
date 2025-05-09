import { FormEvent, useState } from "react";
import { Todo } from "../models/Todo";
import { ErrorMessage } from "../models/ErrorMessage";

type TodoFormProps = {
  addTodo: (todo: Todo) => void;
};

export const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    task: "",
    isDone: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, task: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const newTodo: Todo = {
        ...todo,
        id: Date.now(),
      };

      addTodo(newTodo);
      setTodo({ id: 0, task: "", isDone: false });

      setErrors([]);
    }
  };

  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const validate = () => {
    let temp = [...errors];

    if (todo.task.trim().length < 2) {
      if (!temp.find((e) => e.type === "emptytask")) {
        temp.push({
          name: "task",
          error: "Du måste skriva minst 2 tecken.",
          type: "emptytask",
        });
      }
    } else {
      temp = temp.filter((e) => e.type !== "emptytask");
    }

    setErrors(temp);
    return temp.length === 0;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="task">Ny todo:</label>
          <div className="input-row">
            <input
              type="text"
              id="task"
              className="input-text"
              value={todo.task}
              onChange={handleChange}
              onBlur={validate}
            />
            <button type="submit">Spara</button>
          </div>
        </div>
      </form>
      <ul>
        {errors
          .filter((e) => e.name === "task")
          .map((e, i) => (
            <li key={i} className="error-li">
              {e.error}
            </li>
          ))}
      </ul>
    </>
  );
};
