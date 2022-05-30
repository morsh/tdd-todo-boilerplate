import { withTranslation, WithTranslation } from 'react-i18next';
import { ReactComponent as Logo } from '../../images/logo.svg';
import s from './About.module.css';

export const About = withTranslation()(({ t }: WithTranslation) =>
  <div data-hook='about-page' className={s.about}>
    <Logo data-hook='about-image' height={50} />
    <span>{t('pages.about.desc')}</span>
  </div>
);
