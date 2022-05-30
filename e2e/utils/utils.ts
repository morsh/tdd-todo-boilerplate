import 'expect-puppeteer';
import { HTTPRequest } from 'puppeteer';

export const byHook = (hook: string) => `[data-hook="${hook}"]`;

export const getText = async (selector: string) => {
  return page.$eval(selector, (el) => (el as HTMLElement).innerText);
};

export const findByText = async (text: string) => {
  const [div] = await page.$x(`//div[contains(., '${text}')]`);
  return div;
};


interface InterceptCallback {
  url: string;
  callback: (request: HTTPRequest) => any;
}

export type InterceptMap = InterceptCallback[];

export const intercept = async (interceptMap: InterceptMap) => {
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.isInterceptResolutionHandled()) {
      return;
    }
    const handler = interceptMap.find(entry => request.url().includes(entry.url));
    if (handler) {
      handler.callback(request);
      return;
    }
    request.continue();
  });
};
