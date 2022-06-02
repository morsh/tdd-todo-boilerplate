import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { chance } from '../../../__tests__/utils/chance';
import { createMockStore } from '../store/mockStore';
import { DispatchersContext } from './context';
import { createMockDispatcers } from './dispatchers.mock';
import { useDispatcher } from './useDispatcher';

const renderTest = (Component: ReactElement) => {
  const { store } = createMockStore();
  const { dispatchers, mockDispatcers } = createMockDispatcers();
  function Wrapper({ children }: any) {
    return (
      <DispatchersContext.Provider value={dispatchers}>
        <Provider store={store}>{children}</Provider>
      </DispatchersContext.Provider>
    );
  }
  render(Component, { wrapper: Wrapper });
  return { mockDispatcers };
};

describe('useDispatcher', () => {
  it('should dispatch addTodo', () => {
    const title = chance.string();
    const TestComponent = () => {
      const { addTodo } = useDispatcher('addTodo');
      return <button data-hook="test-button" onClick={() => addTodo(title)}>Test Click</button>;
    };

    const { mockDispatcers } = renderTest(<TestComponent />);
    userEvent.click(screen.getByTestId('test-button'));
    expect(mockDispatcers.addTodo).toBeCalled();
  });

  it('should dispatch two actions', () => {
    const title = chance.string();
    const id = chance.integer();
    const TestComponent = () => {
      const { addTodo } = useDispatcher('addTodo');
      const { deleteTodo } = useDispatcher('deleteTodo');

      return (
        <>
          <button data-hook="test-add-button" onClick={() => addTodo(title)}>Test Click</button>
          <button data-hook="test-delete-button" onClick={() => deleteTodo(id)}>Test Click</button>
        </>
      );
    };

    const { mockDispatcers } = renderTest(<TestComponent />);
    userEvent.click(screen.getByTestId('test-add-button'));
    expect(mockDispatcers.addTodo).toBeCalled();
    expect(mockDispatcers.deleteTodo).not.toBeCalled();

    jest.clearAllMocks();
    userEvent.click(screen.getByTestId('test-delete-button'));
    expect(mockDispatcers.addTodo).not.toBeCalled();
    expect(mockDispatcers.deleteTodo).toBeCalled();
  });
});
