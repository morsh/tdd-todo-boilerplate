import { WithTranslation, withTranslation } from 'react-i18next';

export const NoMatch = withTranslation()(({ t }: WithTranslation) => (
  <div data-hook='page-no-match'>{t('pages.no-match')}</div>
));
