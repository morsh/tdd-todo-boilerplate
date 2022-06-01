import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDispatchers } from '../../redux/dispatchers/context';
import { AppDispatch } from '../../redux/store/configureStore';

export const AddTodo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useDispatchers();

  const onClick = useCallback(() => {
    if (inputRef.current!.value) {
      dispatch(addTodo(inputRef.current!.value));
    }
  }, []);

  return (
    <div data-hook="add-todo">
      <input ref={inputRef} data-hook="add-todo-input" />
      <button data-hook="add-todo-button" onClick={onClick}>Add</button>
    </div>
  );
};
