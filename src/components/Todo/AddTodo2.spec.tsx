import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../__tests__/utils/testRenderer';
import { AddTodo, AddTodoComponent } from './AddTodo2';

describe('AddTodo', () => {
  it('should add a new todo', () => {
    render(<AddTodo />);
    expect(screen.getByTestId('add-todo')).toBeInTheDocument();
  });

  it('should not call addItem when input is empty', () => {
    const bla = jest.fn();
    render(<AddTodoComponent onClick={bla} />);
    userEvent.click(screen.getByTestId('add-todo-button'));
    expect(bla).not.toBeCalled();
  });
});
