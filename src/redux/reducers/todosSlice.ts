import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/configureStore";

export interface ITodoItem {
  title: string;
}

export const todosSlice = createSlice({
  name: "todos",
  initialState: [] as ITodoItem[],
  reducers: {},
});

export const getTodos = (state: RootState) => state.todos;
