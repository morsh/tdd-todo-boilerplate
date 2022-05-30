import { TelemetryService } from './TelemetryService';

export const createTelemetryTestkit = (): jest.MockedObjectDeep<TelemetryService> => ({
  sendTelemetryEvent: jest.fn()
});
