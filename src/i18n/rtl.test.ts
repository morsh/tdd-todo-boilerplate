import { getDIRFromLocale } from './rtl';

describe('getDIRByLocale', () => {
  it('should be `ltr` for empty string', () => {
    expect(getDIRFromLocale('')).toBe('ltr');
  });

  it('should be `ltr` for `en`', () => {
    expect(getDIRFromLocale('en')).toBe('ltr');
  });

  it('should be `rtl` for `he`', () => {
    expect(getDIRFromLocale('he')).toBe('rtl');
  });
});
