import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/TodoList";

function App() {
  return (
    <TodoProvider>
      {/* Create TodoList and place it here */}
      <TodoList />
    </TodoProvider>
  );
}

export default App;
