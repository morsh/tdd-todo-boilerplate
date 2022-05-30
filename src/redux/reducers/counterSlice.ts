import { createSlice } from '@reduxjs/toolkit';
import { ActionFn, RootState } from '../store/configureStore';

export const incrementBy4WithDelay: ActionFn = async (dispatch, getState, { logger }) => {
  logger.info('f42dd6e5-8893-49b3-b87e-e2856b1b8c49', 'calling api...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  logger.info('6a686287-56bc-43e9-b864-d93955738a87', 'got result');
  dispatch(counterSlice.actions.incrementByAmount(4));

  logger.info('a8f7b9a0-388c-4b37-a335-e3bf104759bb', `Number of todos after loading: ${getState().counter}`);
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    incrementByAmount: (state, action: { type: string; payload: number }) => state + action.payload,
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const getCount = (state: RootState) => state.counter;

export const counterReducer = counterSlice.reducer;

