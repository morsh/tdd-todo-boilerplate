import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Counter } from '../Counter/Counter';
import { About } from '../About/About';
import { Home } from './Routes/Home';
import { NoMatch } from './Routes/NoMatch';
import s from './AppRouter.module.css';
import { TodoRoot } from '../Todo';

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-hook='location-display'>{location.pathname}</div>;
};

export const AppRouter = () => (
  <div className={s.navRoutes} data-hook='app-router'>
    <Link className={s.link} data-hook='home-link' to='/'>Home</Link>
    <Link className={s.link} data-hook='about-link' to='/about'>About</Link>
    <Link className={s.link} data-hook='counter-link' to='/counter'>Counter</Link>

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/counter' element={<Counter />} />
      <Route path='/todo' element={<TodoRoot />} />
      <Route path='*' element={<NoMatch />} />
    </Routes>

    <LocationDisplay />
  </div>
);
