import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './MainPage';
import MoviePage from './MoviePage';

import style from './App.scss';

const App = () => (
  <div className={style.wrapper}>
    <MainPage/>
  </div>
);

export default App;
