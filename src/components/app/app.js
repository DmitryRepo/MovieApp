import React, { Component } from "react";
import { Input, Pagination } from "antd";
import Switcher from "../switcher/switcher";
import Spinner from "../spinner/spinner";
import MoviesList from "../movies-list/movies-list";
import MoviedbApi from "../../services/moviedb-api";
import ErrorMessage from "../error-message/error-message";
import "./app.css";

export default class App extends Component {
  constructor() {
    super();
    this.getDataApi();
  }
  state = {
    movies: [],
    loading: true,
    error: false,
  };

  getDataApi() {
    const keyward = "return";
    const api = new MoviedbApi();
    api.getResponseApi(keyward).then((data) =>
      this.setState({
        movies: data,
        loading: false,
        error:false,
      })
    ).catch(this.onError);
    
  }
  onError = (error) => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  render() {
    const { movies, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = hasData ? <MoviesList className="movie-list" movies={movies} /> : null;
    return (
      <div className="app">
        <Switcher />
        <Input className="input-search" />
        {errorMessage}
        {spinner}
        {content}
        <Pagination className="pagination" />
      </div>
    );
  }
}
