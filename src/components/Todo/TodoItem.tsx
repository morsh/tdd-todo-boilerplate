import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodo } from '../../redux/reducers/todoSlice';
import { AppDispatch } from '../../redux/store/configureStore';


export const TodoItem = ({ id }: { id: number }) => {
  const { title } = useSelector(getTodo(id));
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div data-hook="todo-title" data-id={id}>
      <span data-hook={`todo-title-${id}`}>{title}</span>
      <span><button data-hook={`todo-delete-${id}`} onClick={() => dispatch(deleteTodo(id))}>Delete</button></span>
    </div>
  );
};
