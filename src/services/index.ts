import { createLogger, Logger, LogSource } from './Logger/Logger';
import { createTelemetryService, TelemetryService } from './Telemetry/TelemetryService';

export interface Services {
  logger: Logger;
  telemetry: TelemetryService;
}

export const createServices = (): Services => {
  const logger = createLogger('viva-sales-ci-teams', console.log, LogSource.VivaSalesCI);

  return ({
    logger,
    telemetry: createTelemetryService({ logger }),
  });
};
