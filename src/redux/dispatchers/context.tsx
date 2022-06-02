import { createContext } from 'react';
import { Dispatchers } from './dispatchers';

export const DispatchersContext = createContext<Dispatchers>(null as any);

export const DispatchersProvider = ({ dispatchers, children }: React.PropsWithChildren<{ dispatchers: Dispatchers }>) => {
  return (
    <DispatchersContext.Provider value={dispatchers}>
      {children}
    </DispatchersContext.Provider>
  );
};
