import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from '../AppRouter/AppRouter';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

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
