import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDispatchers } from '../../redux/dispatchers/context';
import { AppDispatch } from '../../redux/store/configureStore';
import { TodoList } from './TodoList';

export const TodoRoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadTodos } = useDispatchers();

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return <TodoList />;
};
