import React, { FC, useContext } from "react";
import { Todo } from "../types";
import { TodoContext } from "../context/TodoContext.tsx";
import { ActionsType } from "../actions";
import { BsXCircle } from "react-icons/bs";

interface Props {
  todo: Todo;
}

const TodoItem: FC<Props> = ({ todo }): JSX.Element => {
  // Utilize useContext hook to access the dispatch function from context
  const { dispatch } = useContext(TodoContext);

  const toggleComplete = (id: string) => {
    // dispatch the action for toggling isCompleted
    dispatch({
      type: ActionsType.TOGGLE_TODO,
      payload: { id },
    });
  };

  const removeTodo = (id: string) => {
    dispatch({
      type: ActionsType.REMOVE_TODO_ITEM,
      payload: { id },
    });
  };

  // Use BEM convention
  return (
    <div className="todo">
      <div className="todo__text">{todo.text}</div>
      <div className="todo__checkbox">
        <input
          type="checkbox"
          defaultChecked={todo.isCompleted === true}
          onClick={() => toggleComplete(todo.id)}
        />
      </div>
      <div className="todo__remove" onClick={() => removeTodo(todo.id)}>
        <BsXCircle />
      </div>
    </div>
  );
};

export default TodoItem;
