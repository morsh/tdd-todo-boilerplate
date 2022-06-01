import { render } from '../../../__tests__/utils/testRenderer';
import { TodoRoot } from '.';

describe('TodoRoot', () => {

  it('should call load todos', () => {
    const { dispatchers } = render(<TodoRoot />);
    expect(dispatchers.loadTodos).toBeCalled();
  });
});
