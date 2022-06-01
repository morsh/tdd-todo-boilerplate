import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/configureStore';

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

