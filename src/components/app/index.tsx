import { FC, useEffect } from "react";

import TodoAddingForm from "../todo-adding-form";
import TodoList from "../todo-list";
import { pageLoaded } from "../../effector";

const App: FC = () => {
  useEffect(() => {
    pageLoaded();
  }, []);

  return (
    <div>
      <h1>Список задач</h1>

      <TodoAddingForm />

      <TodoList />
    </div>
  );
};

export default App;
