import { chance } from '../../../__tests__/utils/chance';
import { EventLevelValues, TelemetryEventDetails } from './consts';

export const telemetryEventBuilder = () => {
  const event: Partial<TelemetryEventDetails> = {
    ActionOn: chance.string(),
    Action: chance.string(),
    Message: chance.string(),
    Level: chance.pickone(EventLevelValues),
  };
  const api = {
    build: () => event,
  };
  return api;
};
