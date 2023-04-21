import React from 'react';
import MoviedbApi from '../../services/moviedb-api'


async function genresContext() {
  const api = new MoviedbApi();
  const genres = await api.getGengers();
  return genres;
}

const GenresContext = React.createContext(genresContext());

export default GenresContext;
