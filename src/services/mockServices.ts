import { Services } from '.';
import { createLoggerTestkit } from './Logger/Logger.testkit';
import { createTelemetryTestkit } from './Telemetry/TelemetryService.testkit';

export type MockedServices = jest.MockedObjectDeep<Services>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const createMockServices = (services: any = {}) => ({
  logger: createLoggerTestkit(),
  telemetry: createTelemetryTestkit(),
  ...services
});
