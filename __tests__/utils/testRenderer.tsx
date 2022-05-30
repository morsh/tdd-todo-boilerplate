import React, { ReactElement } from 'react';
import { render as testRender, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppStore, RootState } from '../../src/redux/store/configureStore';
import { createMockStore } from '../../src/redux/store/mockStore';

interface Params {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  renderOptions?: RenderOptions;
}

function render(ui: ReactElement, { preloadedState, ...renderOptions}: Params = {}) {
  const { store, services } = createMockStore({ preloadedState });

  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }

  const result = testRender(ui, { wrapper: Wrapper, ...renderOptions });
  return { result, services };
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };

