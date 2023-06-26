export enum LogSource {
  SomeSource = 'SomeSource'
}
export enum EventLevel {
  Info,
  Error,
  Warning
}

export interface InternalEventDetails {
  logSource: LogSource;
  level: EventLevel;
}

type OnEvent = (msg: string, details: InternalEventDetails, params?: object) => void;

export function createLogger(loggerName: string, onEvent: OnEvent, source: LogSource) {

  const sendToOnEvent = (...args: any[]) => (onEvent as any)(...args.filter(arg => !!arg)) as OnEvent;

  const info = (guid: string, msg: string, params?: object) => {
    sendToOnEvent(guid, msg, { level: EventLevel.Info, logSource: source, loggerName }, params);
  };

  const warning = (guid: string, msg: string, params?: object) => {
    sendToOnEvent(guid, msg, { level: EventLevel.Warning, logSource: source, loggerName }, params);
  };

  const error = (guid: string, msg: string, exception?: any) => {
    let exceptionObj = {};
    try {
      exceptionObj = exception ? JSON.parse(JSON.stringify(exception, Object.getOwnPropertyNames(exception))) : {};
    } catch (e) { }
    sendToOnEvent(guid, msg, { level: EventLevel.Error, logSource: source, loggerName }, { exception: exceptionObj });
  };

  return {
    info,
    warning,
    error
  };
}

export type Logger = ReturnType<typeof createLogger>;
