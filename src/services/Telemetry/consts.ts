
export const TelemetryEventsApiPath = '/user/v1.0-preview/telemetry/events';
export const EventSendingInterval = 5000;

export enum EventLevels {
  critical = 1,
  error = 2,
  warning = 3,
  info = 4,
  verbose = 5
}

export const EventLevelValues: EventLevels[] = Object.values(EventLevels).filter(x => typeof x === 'number') as any;

export interface TelemetryEventDetails {
  UserAgent: string;
  UserInfo_Language: string;
  UserInfo_TimeZone: number;
  DeviceInfo_BrowserName?: string;
  DeviceInfo_BrowserVersion?: string;
  DeviceInfo_OsName?: string;
  DeviceInfo_OsVersion?: string;
  CategoryName: string;
  FeatureName?: string;
  HostType: string;
  AppModule?: string;
  ClientVersion?: string;
  Origin: string;
  Source?: string;
  ActionOn?: string;
  Action?: string;
  Message?: string;
  Level?: EventLevels;
}


