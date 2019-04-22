import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../data';
import callApi from '../utils/movie-api';

import style from './MoviePage.scss';

const MoviePage = props => {
  const { location } = props; // eslint-disable-line
  const { pathname } = location;
  const id = pathname.split('/')[2];
  const [movie, setMovie] = useState(null);

  useLayoutEffect(() => {
    callApi('movie', id).then(results => {
      setMovie(results);
    });
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