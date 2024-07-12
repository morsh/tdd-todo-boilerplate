import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { chance } from "../../../__tests__/utils/chance";
import { createTelemetryService } from "./TelemetryService";
import { TelemetryEventDetails, TelemetryEventsApiPath } from "./consts";
import { telemetryEventBuilder } from "./telemetryEventBuilder";
import { Logger } from "../Logger/Logger";
import { createLoggerTestkit } from "../Logger/Logger.testkit";
import { runPendingPromises } from "../../../__tests__/utils/async";
import { getDefaultEventDetails } from "./getDefaultEventDetails";

const defaultEventDetails: TelemetryEventDetails = {
  UserAgent: "MOCK_USER_AGENT",
  UserInfo_Language: "en-US",
  UserInfo_TimeZone: chance.integer(),
  DeviceInfo_BrowserName: "MOCK_CHROME",
  DeviceInfo_BrowserVersion: "MOCK_CHROME_VERSION",
  DeviceInfo_OsName: "MOCK_MAC_OSX",
  DeviceInfo_OsVersion: "MOCK_MAC_OSX_VERSION",
  CategoryName: "MOCK_CATEGORY",
  FeatureName: "MOCK_FEATURE",
  HostType: "browser",
  AppModule: "MOCK_APP",
  ClientVersion: "MOCK_CLIENT_VERSION",
  Origin: chance.url(),
  Source: chance.string(),
};

describe.skip("TelemetryService", () => {
  let mockAxios: MockAdapter;
  let sentEvents: any[];
  let logger: Logger;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    logger = createLoggerTestkit();
  });

  afterAll(() => jest.useRealTimers());

  describe("when succeeded to send event", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      sentEvents = [];
      mockAxios.onPost(TelemetryEventsApiPath).reply((config) => {
        sentEvents = [...sentEvents, ...JSON.parse(config.data).events];
        return [200];
      });
    });

    it("should send default event details", () => {
      const { sendTelemetryEvent } = createTelemetryService({
        interval: 2000,
        logger,
      });
      const event1 = telemetryEventBuilder().build();
      sendTelemetryEvent(event1);
      expect(sentEvents).toEqual([{ ...getDefaultEventDetails(), ...event1 }]);
    });

    it("should imediately send first event", () => {
      const { sendTelemetryEvent } = createTelemetryService({
        defaultEventDetails,
        interval: 2000,
        logger,
      });
      const event1 = telemetryEventBuilder().build();
      sendTelemetryEvent(event1);
      expect(sentEvents).toEqual([{ ...defaultEventDetails, ...event1 }]);
    });

    it("should send additional events only after time interval", () => {
      const { sendTelemetryEvent } = createTelemetryService({
        defaultEventDetails,
        interval: 2000,
        logger,
      });
      const [event1, event2, event3] = chance.n(
        () => telemetryEventBuilder().build(),
        3
      );
      sendTelemetryEvent(event1);
      sendTelemetryEvent(event2);
      sendTelemetryEvent(event3);

      expect(sentEvents).toEqual([{ ...defaultEventDetails, ...event1 }]);

      jest.runAllTimers();

      expect(sentEvents).toEqual([
        { ...defaultEventDetails, ...event1 },
        { ...defaultEventDetails, ...event2 },
        { ...defaultEventDetails, ...event3 },
      ]);
    });
  });

  describe("when failed to send events", () => {
    beforeEach(() => {
      jest.useRealTimers();
      mockAxios.onPost(TelemetryEventsApiPath).networkError();
    });

    it("should send an error if failed to send telemetry event", async () => {
      const { sendTelemetryEvent } = createTelemetryService({
        defaultEventDetails,
        interval: 2000,
        logger,
      });
      const event1 = telemetryEventBuilder().build();
      sendTelemetryEvent(event1);
      await runPendingPromises();
      expect(logger.error).toBeCalledTimes(1);
      expect(logger.error).toBeCalledWith(
        expect.any(String),
        "failed to send telemetry event",
        expect.any(Object)
      );
    });
  });
});
