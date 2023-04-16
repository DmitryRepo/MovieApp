import React from "react";
import MovieCard from "../movie-card/movie-card";
import "./movie-list.css";

const MoviesList = (props) => {
  const moviesList = props.movies.map((movie) => {
    return (
      <div key={movie.id} className="movie-list">
        <MovieCard {...movie} />
      </div>
    );
  });
  return (
    <div className="list" key={props.id}>
      {moviesList}
    </div>
  );
};

export default MoviesList;


