import { counterReducer } from '../reducers/counterSlice';
import { simpleSlice } from '../reducers/simpleSlice';
import { todoReducer } from './todoSlice';

const locale = simpleSlice('locale', 'en');

export const reducer = {
  locale: locale.reducer,
  counter: counterReducer,
  todos: todoReducer
};
