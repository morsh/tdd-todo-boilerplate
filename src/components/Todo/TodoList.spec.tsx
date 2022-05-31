import { chance } from '../../../__tests__/utils/chance';
import { render, screen } from '../../../__tests__/utils/testRenderer';
import { Todo } from '../../redux/reducers/todoSlice';
import { todoBuilder } from './todoBuilder';
import { TodoList } from './TodoList';

describe('TodoList', () => {

  it('should an empty list', () => {
    render(<TodoList />);
    expect(screen.getByTestId('empty-list')).toBeInTheDocument();
  });

  it('should render a single item', () => {
    const todo = todoBuilder().build();
    render(<TodoList />, { preloadedState: { todos: [todo] } });
    expect(screen.getByTestId('todo-title')).toHaveTextContent(todo.title);
  });

  it('should render a list of items', async () => {
    const todos: Todo[] = chance.n(() => todoBuilder().build(), chance.integer({ min: 1, max: 10 }));
    render(<TodoList />, { preloadedState: { todos } });
    expect(await screen.findAllByTestId('todo-title')).toHaveLength(todos.length);
    expect((await screen.findAllByTestId('todo-title'))[0]).toHaveTextContent(todos[0].title);
  });
});
