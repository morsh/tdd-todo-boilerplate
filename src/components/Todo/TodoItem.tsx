import { useSelector } from "react-redux";
import { useDispatcher } from "../../redux/dispatchers/useDispatcher";
import { getTodo } from "../../redux/reducers/todoSlice";

export const TodoItem = ({ id }: { id: number }) => {
  const { title } = useSelector(getTodo(id));
  const { deleteTodo } = useDispatcher("deleteTodo");

  return (
    <div data-hook="todo-title" data-id={id}>
      <span data-hook={`todo-title-${id}`}>{title}</span>
      <span>
        <button data-hook={`todo-delete-${id}`} onClick={() => deleteTodo(id)}>
          Delete
        </button>
      </span>
    </div>
  );
};
