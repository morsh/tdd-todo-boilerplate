import { chance } from '../../../__tests__/utils/chance';
import { Todo } from '../../redux/reducers/todoSlice';

export const todoBuilder = () => {
  const todo: Todo = {
    id: chance.integer(),
    title: chance.word(),
    isActive: true,
  };
  const api = {
    build: () => todo,
  };
  return api;
};
