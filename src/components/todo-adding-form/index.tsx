import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
  useMemo,
  useEffect,
} from "react";
import { useUnit } from "effector-react";

import { $priorities, todoAdded } from "../../effector";
import { Todo } from "../../types/todos";

const TodoAddingForm: FC = () => {
  const priorities = useUnit($priorities);

  const [todoTitle, setTodoTitle] = useState<string>("");
  const currentPrioritiInit = useMemo(
    () => (priorities && priorities[0] ? priorities[0].id : ""),
    [priorities]
  );
  const [currentPriority, setCurrentPriority] = useState<string>("");

  useEffect(() => {
    setCurrentPriority(currentPrioritiInit);
  }, [currentPrioritiInit]);

  const changeTodoTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodoTitle(e.target.value);
  };

  const changePriority: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCurrentPriority(e.target.value);
  };

  const resetTodo = (): void => {
    setTodoTitle("");
    setCurrentPriority(currentPrioritiInit);
  };

  const submitTodo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: String(new Date()),
      title: todoTitle,
      priorityId: currentPriority,
      userId: "1",
      isDone: false,
    };

    if (!todoTitle || !currentPriority) return;

    todoAdded(newTodo);
    resetTodo();
  };

  return (
    <div>
      <h2>Добавить задачу</h2>
      <form onSubmit={submitTodo}>
        <div>
          <label>Название:</label>
          <input
            type="text"
            placeholder="Название задачи..."
            onChange={changeTodoTitle}
            value={todoTitle}
          />
        </div>
        <div>
          {!!priorities && (
            <select value={currentPriority} onChange={changePriority}>
              {priorities.map(({ id, value }) => (
                <option key={id} value={id}>
                  {value}
                </option>
              ))}
            </select>
          )}
        </div>

        <button type="submit" disabled={!todoTitle || !currentPriority}>
          Добавить
        </button>
      </form>
    </div>
  );
};

export default TodoAddingForm;
