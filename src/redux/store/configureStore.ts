import { configureStore } from '@reduxjs/toolkit';
import { createServices, Services } from '../../services';
import { reducer } from '../reducers';

export const createStore = (locale: string) =>
  configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: createServices()
        }
      }),
    preloadedState: { locale }
  });

export type AppStore = ReturnType<typeof createStore>;
export type GetState = AppStore['getState'];
export type AppDispatch = AppStore['dispatch'];

export type RootState = ReturnType<GetState>;
export type ActionFn = (dispatch: AppDispatch, getState: GetState, { logger }: Services) => Promise<void>;
