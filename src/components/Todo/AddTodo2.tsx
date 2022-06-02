import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/dispatchers/todo';
import { AppDispatch } from '../../redux/store/configureStore';

export const AddTodoComponent = ({ onClick }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick2 = useCallback(() => {
    if (inputRef.current!.value) {
      onClick(inputRef.current!.value);
    }
  }, []);

  return (
    <div data-hook="add-todo">
      <input ref={inputRef} data-hook="add-todo-input" />
      <button data-hook="add-todo-button" onClick={onClick2}>Add</button>
    </div>
  );
};

export const AddTodo = () => {
  const dispatch = useDispatch<AppDispatch>();
  return <AddTodoComponent onClick={(title: string) => dispatch(addTodo(title))} />;
};
