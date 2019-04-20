import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from './MoviePage.scss';

const API_KEY = '6e13b454073848d7b6853f415e2636be';

const MoviePage = props => {
  const { location } = props; // eslint-disable-line
  const { pathname } = location;
  const id = pathname.split('/')[2];
  const [movie, setMovie] = useState(null);
  useLayoutEffect(() => {
    async function fetchData() {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
      const response = await fetch(url);
      const data = await response.json();
      const { poster_path, genres, title, overview, release_date, tagline } = data; // eslint-disable-line
      setMovie({poster_path, genres, title, overview, release_date, tagline});
    }
    fetchData();
  }, [pathname]);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return movie ? (
    <div className={style.container}>
      <img className={style.poster} src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} />
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
        <Link className={style.link} to={{ pathname: '/' }}>
          Go Back
        </Link>
      </div>
    </div>
  ): (<div>Loading...</div>);
};

export default MoviePage;