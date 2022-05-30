import throttle from 'lodash/throttle';
import axios from 'axios';
import { EventSendingInterval, TelemetryEventsApiPath, TelemetryEventDetails } from './consts';
import { getDefaultEventDetails } from './getDefaultEventDetails';
import { Logger } from '../Logger/Logger';

interface TelemetryServiceParams {
  defaultEventDetails?: TelemetryEventDetails;
  interval?: number;
  logger: Logger;
}

export interface TelemetryService {
  sendTelemetryEvent: (event: Partial<TelemetryEventDetails>) => void;
}

export function createTelemetryService({
  defaultEventDetails = getDefaultEventDetails(),
  interval = EventSendingInterval,
  logger
}: TelemetryServiceParams): TelemetryService {
  const events: Set<TelemetryEventDetails> = new Set();

  const flushEvents = throttle(() => {
    axios.post(TelemetryEventsApiPath, { events: Array.from(events)})
      .catch(err => {
        logger.error('726bb118-0e7b-46a5-88bc-b555b41a4d54', 'failed to send telemetry event', err);
      });
    events.clear();
  }, interval);

  const sendTelemetryEvent = (event: Partial<TelemetryEventDetails>) => {
    events.add({ ...defaultEventDetails, ...event });
    flushEvents();
  };

  return {
    sendTelemetryEvent
  };
}
