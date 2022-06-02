import { useEffect } from 'react';
import { useDispatcher } from '../../redux/dispatchers/useDispatcher';
import { TodoList } from './TodoList';

export const TodoRoot = () => {
  const { loadTodos } = useDispatcher('loadTodos');

  useEffect(() => {
    loadTodos();
  }, []);

  return <TodoList />;
};
