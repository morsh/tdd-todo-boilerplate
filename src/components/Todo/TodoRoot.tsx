import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTodos } from '../../redux/reducers/todoSlice';
import { AppDispatch } from '../../redux/store/configureStore';
import { TodoList } from './TodoList';

export const TodoRoot = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadTodos);
  }, []);

  return <TodoList />;
};
