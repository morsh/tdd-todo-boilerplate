import Bowser from 'bowser';

export const getDefaultEventDetails = () => {
  const { browser, os } = Bowser.parse(window.navigator.userAgent);

  return ({
    UserAgent: window.navigator.userAgent,
    UserInfo_Language: window.navigator.language,
    DeviceInfo_BrowserName: browser.name,
    DeviceInfo_BrowserVersion: browser.version,
    DeviceInfo_OsName: os.name,
    DeviceInfo_OsVersion: os.versionName,
    CategoryName: 'browser log',
    FeatureName: undefined,
    HostType: 'browser',
    AppModule: undefined,
    ClientVersion: undefined,
    Origin: window.location.origin,
    Source: undefined,
    ActionOn: undefined,
    Action: undefined,
    Message: undefined,
    Level: undefined
  });
};
