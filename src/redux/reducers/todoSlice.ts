import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/configureStore';

export interface Todo {
  id: number;
  title: string;
  isActive: boolean;
}

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

