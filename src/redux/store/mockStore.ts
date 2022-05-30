import { configureStore } from '@reduxjs/toolkit';
import { createMockServices, MockedServices } from '../../services/mockServices';
import { AppStore, RootState } from './configureStore';
import { reducer } from '../reducers';

interface StubResult { store: AppStore; services: MockedServices }

interface Params { preloadedState?: Partial<RootState>; reducer?: any; services?: MockedServices }

export const createMockStore = ({ preloadedState, reducer: mockReducer, services }: Params): StubResult => {
  const mockServices = services || createMockServices() ;
  const store = configureStore({
    reducer: mockReducer || reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: mockServices
      }
    }),
    preloadedState
  });

  return { store, services: mockServices };
};
