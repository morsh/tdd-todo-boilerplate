
const RightToLeftLocales = ['he'];

export const getDIRFromLocale = (locale: string) => RightToLeftLocales.includes(locale) ? 'rtl' : 'ltr';
