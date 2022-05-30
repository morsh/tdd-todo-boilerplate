import 'expect-puppeteer';
import { HTTPRequest } from 'puppeteer';
import { byHook, findByText, getText, intercept, InterceptMap } from './utils/utils';

const NotAvailableLocale = 'na';
const interceptMap: InterceptMap= [
  {
    url: '/v1.0/App/Settings',
    callback: (request: HTTPRequest) => request.respond({ status: 200, body: JSON.stringify({ features: [] })})
  },
  {
    url: `/translations/messages.${NotAvailableLocale}.json`,
    callback: (request: HTTPRequest) => request.abort()
  }
];

describe('Demo App E2E', () => {

  beforeEach(async () => {
    await intercept(interceptMap);
  });

  it('should load home page', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector(byHook('root-app'));

    await expect(getText(byHook('page-home'))).resolves.toEqual('You are home');
  });

  it('should load home page in Hebrew', async () => {
    await page.goto('http://localhost:3000/?locale=he');
    await page.waitForSelector(byHook('root-app'));

    await expect(getText(byHook('page-home'))).resolves.toEqual('את.ה בדף הבית');
  });

  it('should show `Loading...` before i18n resources were loaded', async () => {
    await page.goto(`http://localhost:3000/?locale=${NotAvailableLocale}`);
    await expect(findByText('Loading...')).resolves.toBeTruthy();
  });
});
