import { createDispatcers, Dispatchers } from "./dispatchers";

const mockObject = <T>(obj: T): jest.MockedObjectDeep<T> => {
  return Object.keys(obj as object).reduce(
    (newObj, key) => ({
      ...newObj,
      [key]: jest.fn(),
    }),
    {} as jest.MockedObjectDeep<T>
  );
};

const mockDispatchers = <T>(obj: T, mockTarget: any): any => {
  return Object.keys(obj as object).reduce(
    (newObj, key) => ({
      ...newObj,
      [key]: () => mockTarget[key],
    }),
    {}
  );
};

export const createMockDispatcers = () => {
  const realDispatchers = createDispatcers();
  const spyableMethods = mockObject(realDispatchers);
  const dispatchers = mockDispatchers(
    realDispatchers,
    spyableMethods
  ) as Dispatchers;
  return {
    mockDispatcers: spyableMethods,
    dispatchers,
  };
};
