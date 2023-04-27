import React from "react";
import MoviedbApi from "../../services/moviedb-api";

async function genresContext() {
  const ms = new MoviedbApi();
  const genres = await ms.getGengers();
  return genres;
}

const GenresContext = React.createContext(genresContext());

export default GenresContext;
