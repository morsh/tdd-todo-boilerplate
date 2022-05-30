import { counterReducer } from '../reducers/counterSlice';
import { simpleSlice } from '../reducers/simpleSlice';

const locale = simpleSlice('locale', 'en');

export const reducer = {
  locale: locale.reducer,
  counter: counterReducer,
};
