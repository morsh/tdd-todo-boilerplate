import React, { ReactElement } from 'react';
import { render as testRender, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RootState } from '../../src/redux/store/configureStore';
import { createMockStore } from '../../src/redux/store/mockStore';
import { DispatchersContext } from '../../src/redux/dispatchers/context';
import { createMockDispatcers } from '../../src/redux/dispatchers/dispatchers.mock';
import { createDispatcers, Dispatchers } from '../../src/redux/dispatchers/dispatchers';

interface Params {
  preloadedState?: Partial<RootState>;
  realReducers?: boolean;
  renderOptions?: RenderOptions;
}

function render(ui: ReactElement, { preloadedState, realReducers, ...renderOptions}: Params = {}) {
  const { store, services } = createMockStore({ preloadedState });

  let dispatchers: Dispatchers;
  let mockDispatchers: Dispatchers;
  if (realReducers) {
    const realDispatchers = createDispatcers();
    dispatchers = realDispatchers;
    mockDispatchers = realDispatchers;
  } else {
    const mock = createMockDispatcers();
    dispatchers = mock.dispatchers;
    mockDispatchers = mock.mockDispatcers;
  }

  function Wrapper({ children }: any) {
    return (
      <DispatchersContext.Provider value={dispatchers}>
        <Provider store={store}>{children}</Provider>
      </DispatchersContext.Provider>
    );
  }

  const result = testRender(ui, { wrapper: Wrapper, ...renderOptions });
  return { result, store, services, dispatchers: mockDispatchers };
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };

