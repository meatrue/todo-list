import { FC, ChangeEventHandler, MouseEventHandler } from "react";
import { Todo } from "../../types/todos";
import { todoDeleted, todoUpdated } from "../../effector";

interface TodoProps {
  data: Todo;
}

const TodoItem: FC<TodoProps> = ({ data }) => {
  const { title, isDone } = data;

  const changeTodoStatus: ChangeEventHandler<HTMLInputElement> = () => {
    todoUpdated({
      ...data,
      isDone: !data.isDone,
    });
  };

  const deleteTodo: MouseEventHandler<HTMLButtonElement> = () => {
    todoDeleted(data);
  };

  return (
    <div>
      <input type="checkbox" checked={isDone} onChange={changeTodoStatus} />
      <span>{title}</span>
      <button type="button" onClick={deleteTodo}>
        Удалить
      </button>
    </div>
  );
};

export default TodoItem;
