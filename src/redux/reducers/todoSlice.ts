import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActionFn, RootState } from '../store/configureStore';

export interface Todo {
  id: number;
  title: string;
  isActive: boolean;
}

export const loadTodos: ActionFn = async (dispatch) => {
  const { data: { todos } } = await axios.get('http://localhost:3001/todos');
  dispatch(todoSlice.actions.set(todos));
};

export const addTodo: (title: string) => ActionFn = title => async (dispatch) => {
  await axios.post('http://localhost:3001/todos', { title, isActive: true });
  dispatch(loadTodos);
};

export const deleteTodo: (id: number) => ActionFn = id => async (dispatch) => {
  await axios.delete(`http://localhost:3001/todos/${id}`);
  dispatch(todoSlice.actions.remove(id));
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    set: (_, action: { type: string; payload: Todo[] }) => action.payload,
    remove: (state, action: { type: string; payload: number }) => state.filter(({ id }) => id !== action.payload),
  }
});

export const getTodos = (state: RootState) => state.todos;
export const getTodo = (id: number) => (state: RootState) => state.todos.find(todo => todo.id === id)!;

export const todoReducer = todoSlice.reducer;

