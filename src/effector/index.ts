import { createEffect, createEvent, createStore, sample } from "effector";
import { Priority, PriorityJSON, Todo } from "../types/todos";
import { JSON_SERVER_BASE_URL } from "../constants";
import { getPriorityFromJSON } from "../utils/todo";

enum TodoAddingError {
  EMPTY_FIELD = "Пустое поле",
  DUPLICATE_VALUE = "Это дело уже добавлено",
}

export const pageLoaded = createEvent<void>();
export const todoUpdated = createEvent<Todo>();
export const todoDeleted = createEvent<Todo>();
export const todoAdded = createEvent<Todo>();

const getPrioritiesFx = createEffect(async (): Promise<PriorityJSON[]> => {
  const response = await fetch(`${JSON_SERVER_BASE_URL}/priorities`);
  return response.json();
});

const getTodosFx = createEffect<void, Todo[]>(async () => {
  const response = await fetch(`${JSON_SERVER_BASE_URL}/todos`);
  const result = await response.json();

  return result;
});

const updateTodosFx = createEffect<Todo, void>(async (todo) => {
  fetch(`${JSON_SERVER_BASE_URL}/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
});

const deleteTodoFx = createEffect<Todo, void>(async (todo) => {
  fetch(`${JSON_SERVER_BASE_URL}/todos/${todo.id}`, {
    method: "DELETE",
  });
});

const addTodoFx = createEffect<Todo, void>(async (todo) => {
  if ($error.getState()) return;
  
  fetch(`${JSON_SERVER_BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
});

sample({
  clock: pageLoaded,
  target: [getPrioritiesFx, getTodosFx],
});

sample({
  clock: todoUpdated,
  target: updateTodosFx,
});

sample({
  clock: todoDeleted,
  target: deleteTodoFx,
});

sample({
  clock: todoAdded,
  target: addTodoFx,
});

export const $priorities = createStore<Priority[]>([]).on(
  getPrioritiesFx.done,
  (_, { result }) => [
    ...result.map((priority) => getPriorityFromJSON(priority)),
  ]
);

export const $todos = createStore<Todo[]>([]);
export const $error = createStore<TodoAddingError | null>(null);

$todos.on(getTodosFx.done, (_, { result }) => [...result]);

$todos.on(updateTodosFx.done, (todos, { params }) =>
  todos.map((todo) => {
    if (todo.id === params.id) {
      return params;
    }

    return todo;
  })
);

$todos.on(deleteTodoFx.done, (todos, { params }) =>
  todos.filter((todo) => todo.id !== params.id)
);

$todos.on(addTodoFx.done, (todos, { params }) => [...todos, params]);

$error.on(todoAdded, (_, todo) => {
  if (!todo.title || !todo.priorityId) return TodoAddingError.EMPTY_FIELD;

  if ($todos.getState().find(
    ({title}) => title.trim().toLowerCase() === todo.title.toLowerCase())
  ) return TodoAddingError.DUPLICATE_VALUE;

  return null;
});
