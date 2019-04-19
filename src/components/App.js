import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './MainPage';

import style from './App.scss';

const App = () => (
  <div className={style.wrapper}>
    <Switch>
      <Route exact path="/" component={MainPage}></Route>
      <Route exact path="/:id" component={MainPage}></Route>
    </Switch>
  </div>
);

export default App;
