import { createSlice } from '@reduxjs/toolkit';

export const simpleSlice = <T>(name: string, initialState: T) => createSlice({
  name,
  initialState,
  reducers: {
  }
});
