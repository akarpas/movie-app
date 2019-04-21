import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, IMAGE_BASE_URL, API_BASE_URL } from '../data';

import style from './MoviePage.scss';

const MoviePage = props => {
  const { location } = props; // eslint-disable-line
  const { pathname } = location;
  const id = pathname.split('/')[2];
  const [movie, setMovie] = useState(null);
  useLayoutEffect(() => {
    async function fetchData() {
      // TO DO: Set API Utility File to make calls to API
      const url = `${API_BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;
      const response = await fetch(url);
      const data = await response.json();
      const { poster_path, genres, title, overview, release_date, tagline } = data; // eslint-disable-line
      setMovie({poster_path, genres, title, overview, release_date, tagline});
    }
    fetchData();
  }, [pathname]);

  const goBack = () => props.history.goBack(); // eslint-disable-line

  return movie ? (
    <div className={style.container}>
      <img className={style.poster} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <div className={style.details}>
        <h1>{movie.title}</h1>
        <strong>Genres:</strong> {movie.genres.map((genre, index) => {
          const comma = index < movie.genres.length - 1;
          return <span key={genre.id}>{genre.name}{comma && ', '}</span>;
        })}
        <h4>{movie.tagline}</h4>
        <p>{movie.overview}</p>
        <strong>Release Date: </strong>{movie.release_date}
        <br /><br />
        <Link className={style.link} to={{ pathname: `/similar/${id}` }}>
          View Similar Movies
        </Link>
        <br />
        <button type="button" className={style.button} onClick={goBack}>
          Go Back
        </button>
      </div>
    </div>
  ): (<div className={style.loading}>Loading...</div>);
};

export default MoviePage;