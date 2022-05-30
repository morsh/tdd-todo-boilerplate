import React, { Suspense, useMemo } from 'react';
import App from '../App/App';
import { createStore } from '../../redux/store/configureStore';
import { Provider } from 'react-redux';
import { init18n } from '../../i18n/i18n';
import { getDIRFromLocale } from '../../i18n/rtl';
import { Helmet } from 'react-helmet';
import { getLocaleFromUrlParams } from '../../utils/getLocaleFromUrlParams';
import { Loader } from '../Loader/Loader';
import './Root.css';

export const Root = () => {

  const locale = useMemo(() => {
    const urlLocale = getLocaleFromUrlParams();
    init18n(urlLocale).catch(console.error);
    return urlLocale;
  }, []);

  const store = useMemo(() => {
    return createStore(locale);
  }, []);

  return (
    <Suspense data-hook='app-fallback' fallback={<Loader />}>
      <Helmet htmlAttributes={{ lang: locale, dir: getDIRFromLocale(locale) }} />
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </Suspense>
  );
};
