import { render, screen } from '../../../__tests__/utils/testRenderer';
import { AddTodo } from './AddTodo';

describe('TodoList', () => {
  it('should add a new todo', () => {
    render(<AddTodo />);
    expect(screen.getByTestId('add-todo')).toBeInTheDocument();
  });
});
