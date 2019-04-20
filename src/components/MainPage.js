import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import debounce from 'lodash.debounce';
import MovieList from './MovieList';
import MoviePage from './MoviePage';

import style from './MainPage.scss';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = debounce((value) => {
    setSearchTerm(value);
  }, 1000);

  return (
    <React.Fragment>
      <header className={style.appHeader}>
        <h3>Movie Spy</h3>
        <input
          className={style.search}
          onChange={event => handleChange(event.target.value)}
          type="input"
          id="search"
          placeholder="search"
        />
      </header>
      <MovieList searchTerm={searchTerm} />
      <Switch>
        <Route path="/movie/:id" component={MoviePage} />
      </Switch>
    </React.Fragment>
  );
};

export default MainPage;