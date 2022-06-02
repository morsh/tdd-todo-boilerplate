import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/configureStore';
import { DispatchersContext } from './context';
import { Dispatchers } from './dispatchers';

export const useDispatcher = <T extends keyof Dispatchers>(dispatcher: T): Record<T, Dispatchers[T]> => {
  const dispatchers = useContext(DispatchersContext);
  const dispatch = useDispatch<AppDispatch>();
  return {
    [dispatcher]: (...args: any[]) => dispatch((dispatchers[dispatcher] as any)(...args))
  } as any;
};
