import { useSelector } from 'react-redux';
import { getTodos } from '../../redux/reducers/todoSlice';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const todos = useSelector(getTodos);

  if (todos.length === 0) {
    return (
      <div data-hook="todo-list">
        <div data-hook="empty-list">
          No Items
        </div>
      </div>
    );
  }

  return (
    <div data-hook="todo-list">
      {todos.map(({ id }) => (<TodoItem key={id} id={id} />))}
    </div>
  );
};
