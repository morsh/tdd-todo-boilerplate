import { Logger } from './Logger';

export const createLoggerTestkit = (): jest.MockedObjectDeep<Logger> => ({
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn()
});
