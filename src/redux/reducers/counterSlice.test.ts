import { counterSlice, incrementBy4WithDelay, increment, getCount, decrement, incrementByAmount } from './counterSlice';
import { createMockStore } from '../store/mockStore';
import { chance } from '../../../__tests__/utils/chance';

describe('counterSlice', () => {

  it('should increment counter by 1', () => {
    const { store } = createMockStore({ reducer: { counter: counterSlice.reducer }});
    store.dispatch(increment());
    expect(getCount(store.getState())).toEqual(1);
  });

  it('should decrement counter by 1', () => {
    const { store } = createMockStore({ reducer: { counter: counterSlice.reducer }});
    store.dispatch(decrement());
    expect(getCount(store.getState())).toEqual(-1);
  });

  it('should increment counter by {amount}', () => {
    const { store } = createMockStore({ reducer: { counter: counterSlice.reducer }});
    const amount = chance.integer();
    store.dispatch(incrementByAmount(amount));
    expect(getCount(store.getState())).toEqual(amount);
  });

  it('should increment counter by 4', async () => {
    const { store, services } = createMockStore({ reducer: { counter: counterSlice.reducer }});
    const promise = store.dispatch(incrementBy4WithDelay);
    expect(services.logger.info).toBeCalledWith(expect.any(String), 'calling api...');
    await promise;
    expect(services.logger.info).toBeCalledWith(expect.any(String), 'got result');
    expect(store.getState()).toMatchObject({ counter: 4 });
    expect(services.logger.info).toBeCalledWith(expect.any(String), 'Number of todos after loading: 4');
  });
});
