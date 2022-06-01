import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../__tests__/utils/testRenderer';
import { AddTodo } from './AddTodo';

describe('AddTodo', () => {
  it('should add a new todo', () => {
    render(<AddTodo />);
    expect(screen.getByTestId('add-todo')).toBeInTheDocument();
  });

  it('should not call addItem when input is empty', () => {
    const { dispatchers } = render(<AddTodo />);
    userEvent.click(screen.getByTestId('add-todo-button'));
    expect(dispatchers.addTodo).not.toBeCalled();
  });
});
