import { WithTranslation, withTranslation } from 'react-i18next';

export const Home = withTranslation()(({ t }: WithTranslation) => (
  <div data-hook='page-home'>{t('pages.home')}</div>
));
