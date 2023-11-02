import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  createContext,
  useReducer,
} from "react";
import { ReducerAction, Todo } from "../types";
import { ActionsType } from "../actions";
import { v4 as uuidv4 } from "uuid";

export interface TodoState {
  todos: Todo[];
  userPreferences: {
    textSize: number;
    theme: "light" | "dark";
  };
}

interface TodoContextType {
  state: TodoState;
  dispatch: Dispatch<ReducerAction>;
}

const initialState: TodoState = {
  todos: [
    { id: "1", text: "Do the laundry", isCompleted: false },
    { id: "2", text: "Grocery shopping", isCompleted: true },
  ],
  userPreferences: {
    textSize: 12,
    theme: "light",
  },
};

const todoReducer = (state: TodoState, action: ReducerAction) => {
  switch (action.type) {
    case ActionsType.ADD_TODO_ITEM:
      // Create new todo object with a unique id, text from action.payload and completed false
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            text: action.payload.text,
            isCompleted: false,
          },
        ],
      };

    case ActionsType.REMOVE_TODO_ITEM:
      // Filter out the todo with an id matching action.payload from the todos array
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return {
        ...state,
        todos: updatedTodos,
      };

    case ActionsType.TOGGLE_TODO:
      const toggledTodo = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });

      console.log(toggledTodo);
      return { ...state, todos: toggledTodo };

    case ActionsType.UPDATE_PREFERENCES:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

// Create TodoContext using createContext
// Todo starts out as an empty array
export const TodoContext = createContext<TodoContextType>({
  state: initialState,
  dispatch: () => {},
});

// Create TodoProvider that wraps its children with the TodoContext.Provider
// User useReducer to pass the current state and dispatch function to your context
export const TodoProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer<React.Reducer<TodoState, ReducerAction>>(
    todoReducer,
    initialState
  );

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
