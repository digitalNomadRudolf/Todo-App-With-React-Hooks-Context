import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import { TodoContext, TodoProvider, TodoState } from "../context/TodoContext";
import { ActionsType } from "../actions";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("TodoItem", () => {
  // Test correct action dispatch on toggle
  it("dispatches the correct action on toggle", async () => {
    // Create mock todo
    const mockTodo = { id: "1", text: "Mock Todo", isCompleted: false };
    // Dispatch using jest fn
    const dispatch = jest.fn();

    // Mock initialState
    const initialState = {
      todos: [mockTodo],
      userPreferences: {
        textSize: 12,
        theme: "light",
      },
    };
    // Mock useContext using jest spyOn()
    // Mocking a dispatch call?
    jest.spyOn(React, "useContext").mockImplementation(() => ({ dispatch }));

    render(
      <TodoContext.Provider
        value={{ state: initialState as TodoState, dispatch }}
      >
        <TodoItem todo={mockTodo} />
      </TodoContext.Provider>
    );

    const checkbox = screen.findByRole("checkbox");
    fireEvent.click(await checkbox);

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionsType.TOGGLE_TODO,
      payload: { id: "1" },
    });
  });
});
