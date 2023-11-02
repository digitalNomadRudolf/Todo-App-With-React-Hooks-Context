import React, { FC, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem.tsx";

interface Props {}

const TodoList: FC<Props> = (props): JSX.Element => {
  // Use useContext to get access to todos
  const todosContext = useContext(TodoContext);
  const { todos } = todosContext.state;

  return (
    <div>
      {/* Map through todos and render a TodoItem for each todo */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
