import { fetch } from './base.api';

type GetTodoResponse = Array<{
  id: number;
  name: string;
  done: boolean;
}>;

export const getTodoList = async (): Promise<GetTodoResponse> => {
  const { data } = await fetch.get<GetTodoResponse>('/todo');
  return data;
};

type PutTodoResponse = {
  id: number;
  name: string;
  done: boolean;
};

type PutTodoPayload = {
  id: number;
  name: string;
  done: boolean;
};

export const putTodo = async (
  todo: PutTodoPayload
): Promise<PutTodoResponse> => {
  const { data } = await fetch.put<PutTodoResponse>(`/todo/${todo.id}`, todo);
  return data;
};

type PostTodoPayload = {
  name: string;
  done?: boolean;
};

type PostTodoResponse = {
  id: number;
  name: string;
  done: boolean;
};

export const postTodo = async (
  todo: PostTodoPayload,
  done = false
): Promise<PostTodoResponse> => {
  const { data } = await fetch.post<PutTodoResponse>(`/todo`, {
    ...todo,
    done,
  });
  return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await fetch.delete(`/todo/${id}`);
};
