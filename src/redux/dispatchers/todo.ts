import axios from 'axios';
import { todoSlice } from '../reducers/todoSlice';
import { ActionFn } from '../store/configureStore';

export const loadTodos = (): ActionFn => async (dispatch) => {
  const { data: { todos } } = await axios.get('http://localhost:3001/todos');
  dispatch(todoSlice.actions.set(todos));
};

export const addTodo: (title: string) => ActionFn = title => async function (dispatch) {
  await axios.post('http://localhost:3001/todos', { title, isActive: true });
  dispatch(loadTodos());
};

export const deleteTodo: (id: number) => ActionFn = id => async (dispatch) => {
  await axios.delete(`http://localhost:3001/todos/${id}`);
  dispatch(todoSlice.actions.remove(id));
};
