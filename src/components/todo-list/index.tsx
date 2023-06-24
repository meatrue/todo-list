import { FC } from "react";
import { useUnit } from "effector-react";

import { $priorities, $todos } from "../../effector";
import Todo from "../todo";

const TodoList: FC = () => {
  const priorities = useUnit($priorities);
  const todos = useUnit($todos);

  return (
    <ul>
      {priorities.map(({ id, value }) => (
        <li key={id}>
          {value}

          <ul>
            {todos
              .filter((todo) => todo.priorityId === id)
              .map((todo) => (
                <li key={todo.id}>
                  <Todo data={todo} />
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
