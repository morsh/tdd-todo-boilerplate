import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, getCount, incrementByAmount, incrementBy4WithDelay } from '../../redux/reducers/counterSlice';
import type { AppDispatch } from '../../redux/store/configureStore';
import { useTranslation } from 'react-i18next';
import { Button } from '../styled/Button';

export function Counter() {
  const count = useSelector(getCount);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  return (
    <div data-hook='counter-page'>
      <Button data-hook='counter-inc' onClick={() => dispatch(increment())}>{t('pages.counter.increment')}</Button>
      <span data-hook='counter-value'>{count}</span>
      <Button data-hook='counter-dec' onClick={() => dispatch(decrement())}>{t('pages.counter.decrement')}</Button>
      <Button data-hook='counter-inc2' onClick={() => dispatch(incrementByAmount(2))}>{t('pages.counter.increase2')}</Button>
      <Button data-hook='counter-inc4' onClick={() => dispatch(incrementBy4WithDelay)}>{t('pages.counter.increase4')}</Button>
    </div>
  );
}

