import { ActionFn } from '../store/configureStore';
import { incrementBy4WithDelay } from './counter';
import { loadTodos, addTodo, deleteTodo } from './todo';

export const createDispatcers = () => ({
  incrementBy4WithDelay,
  loadTodos,
  addTodo,
  deleteTodo
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const forceTypes: () => { [key: string]: (...args: any[]) => ActionFn } = createDispatcers;

export type Dispatchers = ReturnType<typeof createDispatcers>;
