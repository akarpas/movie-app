import React, { useState } from 'react';
import MovieList from './MovieList';
import debounce from 'lodash.debounce';

import style from './MainPage.scss';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = debounce((value) => {
    setSearchTerm(value)
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
    </React.Fragment>
  )
}

export default MainPage;