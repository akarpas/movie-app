import React, { useState } from 'react';

import style from './MainPage.scss';

const MainPage = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => setInputValue(event.target.value);

  return (
    <React.Fragment>
      <header className={style.appHeader}>
        <h3>Movie Spy</h3>
        <input
          className={style.search}
          onChange={handleChange}
          value={inputValue}
          type="input"
          id="search"
          placeholder="search"
        />
      </header>
      <div style={{ color: 'white' }}>{inputValue}</div>
    </React.Fragment>
  )
}

export default MainPage;