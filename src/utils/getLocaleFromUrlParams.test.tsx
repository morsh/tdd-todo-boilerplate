import { chance } from '../../__tests__/utils/chance';
import { getLocaleFromUrlParams } from './getLocaleFromUrlParams';

describe('getLocaleFromUrlParams', () => {

  it('should return "en" string', () => {
    window.location.assign(chance.url());
    expect(getLocaleFromUrlParams()).toEqual('en');
  });

  it('should return locale from url string', () => {
    const locale = chance.locale();
    window.location.assign(chance.url() + '?locale=' + locale);
    expect(getLocaleFromUrlParams()).toEqual(locale);
  });
});
