import {
  deleteTodo,
  getTodoList,
  postTodo,
  putTodo,
} from '../../apis/todo.api';
import { Todo, TodoList } from '../../types/todo.type';

export const getTodoListDatas = async (): Promise<TodoList> => {
  const result = await getTodoList();

  return {
    todo: result.filter((t) => !t.done),
    completed: result.filter((t) => t.done),
  };
};

export const updateTodoList = async (
  todoList: TodoList,
  todo: Todo
): Promise<TodoList> => {
  const newTodoList = todoList;
  const updatedTodo = await putTodo(todo);
  if (updatedTodo.done) {
    // => Complete
    newTodoList.todo = todoList.todo
      .filter((t) => t.id !== updatedTodo.id)
      .sort((a, b) => (a.id < b.id ? 1 : 0));
    newTodoList.completed.push(updatedTodo);
    newTodoList.completed.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    newTodoList.completed = todoList.completed.filter(
      (t) => t.id !== updatedTodo.id
    );
    newTodoList.todo.push(updatedTodo);
    newTodoList.todo.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  return newTodoList;
};

export const addNewTodo = async (
  todoList: TodoList,
  name: string
): Promise<TodoList> => {
  const newTodoList = todoList;
  const result = await postTodo({ name });
  if (result.done) {
    // => Complete
    newTodoList.todo = todoList.todo
      .filter((t) => t.id !== result.id)
      .sort((a, b) => (a.id < b.id ? 1 : 0));
    newTodoList.completed.push(result);
    newTodoList.completed.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    newTodoList.completed = todoList.completed.filter(
      (t) => t.id !== result.id
    );
    newTodoList.todo.push(result);
    newTodoList.todo.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  return newTodoList;
};

export const removeTodo = async (
  todoList: TodoList,
  todo: Todo
): Promise<TodoList> => {
  const newTodoList = todoList;
  await deleteTodo(todo.id);

  if (todo.done) {
    newTodoList.completed = todoList.completed.filter((t) => t.id !== todo.id);
    newTodoList.completed.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    newTodoList.todo = todoList.todo.filter((t) => t.id !== todo.id);
    newTodoList.todo.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  return newTodoList;
};
