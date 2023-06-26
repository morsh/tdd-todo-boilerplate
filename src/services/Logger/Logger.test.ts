import { chance } from '../../../__tests__/utils/chance';
import { Logger, createLogger, LogSource, EventLevel } from './Logger';

describe('Logger', () => {
  let loggerName: string;
  let message: string;
  let guid: string;
  let params: { [key: string]: string };

  const withLevel = (level: EventLevel) => ({
    level, logSource: LogSource.SomeSource, loggerName
  });

  let mockOnEvent: jest.Mock;
  let logger: Logger;

  beforeEach(() => {
    loggerName = chance.string();
    message = chance.string();
    guid = chance.guid();
    params = { [chance.word()]: chance.string() };
    mockOnEvent = jest.fn();
    logger = createLogger(loggerName, mockOnEvent, LogSource.SomeSource);
  });

  describe('info', () => {
    it('should log info when calling info', () => {
      logger.info(guid, message);
      expect(mockOnEvent).toBeCalledWith(guid, message, { level: EventLevel.Info, logSource: 'SomeSource', loggerName });
    });

    it('should log info with params', () => {
      logger.info(guid, message, params);
      expect(mockOnEvent).toBeCalledWith(guid, message, withLevel(EventLevel.Info), params);
    });
  });

  describe('warning', () => {
    it('should log warning', () => {
      logger.warning(guid, message);
      expect(mockOnEvent).toBeCalledWith(guid, message, withLevel(EventLevel.Warning));
    });

    it('should log warning with params', () => {
      logger.warning(guid, message, params);
      expect(mockOnEvent).toBeCalledWith(guid, message, withLevel(EventLevel.Warning), params);
    });
  });

  describe('error', () => {
    it('should log error', () => {
      logger.error(guid, message);
      expect(mockOnEvent).toBeCalledWith(guid, message, withLevel(EventLevel.Error), { exception: {} });
    });

    it('should log error with an invalid exception object', () => {
      const unstringifiableValue = BigInt(9007199254740991);
      logger.error(guid, message, unstringifiableValue);
      expect(mockOnEvent).toBeCalledWith(guid, message, withLevel(EventLevel.Error), { exception: {} });
    });

    it('should log error with details and exception', () => {
      const exception = new Error(chance.string());
      logger.error(guid, message, exception);
      expect(mockOnEvent).toBeCalledWith(
        guid,
        message,
        withLevel(EventLevel.Error), {
          exception: expect.objectContaining({
            message: exception.message,
            stack: expect.stringContaining('Error:')
          })
        });
    });
  });
});
