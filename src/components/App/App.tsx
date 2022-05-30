import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from '../AppRouter/AppRouter';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsLoaded } from '../../redux/selectors';

function App() {
  const { t } = useTranslation();
  const isLoaded = useSelector(getIsLoaded);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className='App' data-hook='root-app'>
      <Router>
        <div>{t('app.title')}</div>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
