import { useCallback, useRef } from "react";
import { useDispatcher } from "../../redux/dispatchers/useDispatcher";

export const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useDispatcher("addTodo");

  const onClick = useCallback(() => {
    if (inputRef.current!.value) {
      addTodo(inputRef.current!.value);
    }
  }, []);

  return (
    <div data-hook="add-todo">
      <input ref={inputRef} data-hook="add-todo-input" />
      <button data-hook="add-todo-button" onClick={onClick}>
        Add
      </button>
    </div>
  );
};
