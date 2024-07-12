import { counterReducer } from "../reducers/counterSlice";
import { simpleSlice } from "../reducers/simpleSlice";
import { todosSlice } from "./todosSlice";

const locale = simpleSlice("locale", "en");

export const reducer = {
  locale: locale.reducer,
  counter: counterReducer,
  todos: todosSlice.reducer,
};
