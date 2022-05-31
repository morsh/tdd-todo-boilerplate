import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/reducers/todoSlice';
import { AppDispatch } from '../../redux/store/configureStore';

export const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div data-hook="add-todo">
      <input ref={inputRef} data-hook="add-todo-input" />
      <button data-hook="add-todo-button" onClick={() => dispatch(addTodo(inputRef.current!.value))}>Add</button>
    </div>
  );
};
