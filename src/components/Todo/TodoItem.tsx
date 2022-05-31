import { useSelector } from 'react-redux';
import { getTodo } from '../../redux/reducers/todoSlice';


export const TodoItem = ({ id }: { id: number }) => {
  const { title } = useSelector(getTodo(id));
  return (
    <div data-hook="todo-title">
      {title}
    </div>
  );
};
