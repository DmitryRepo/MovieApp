import React, { Component } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MoviedbApi from "../../services/MoviedbApi";
import AlertCard from "../AlertCard/AlertCard";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import EmptyCard from "../EmptyCard/EmptyCard";
import { Pagination, Row } from "antd";

import { v4 as uuidv4 } from "uuid";

import "./MovieList.css";

const lodash = require("lodash");
export default class MoviesList extends Component {
  moviesdbApi = new MoviedbApi();

  state = {
    currentPage: 1,
    totalResults: this.moviesdbApi.totalResults,
    greeting: true,
    notFound: false,
    loading: false,
    error: false,
  };

  debounceRender = lodash.debounce(() => this.getMoviesApi(), 400);

  componentDidUpdate(prevProps, prevState) {
    const { keyward } = this.props;
    const { currentPage } = this.state;
    if (keyward !== prevProps.keyward) {
      this.setState({
        loading: true,
      });
      return this.debounceRender();
    }
    if (currentPage !== prevState.currentPage) {
      this.getMoviesApi();
    }
    return;
  }

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
      loading: true,
    });
    this.debounceRender();
  };

  getMoviesApi() {
    const { currentPage } = this.state;
    const { keyward } = this.props;
    this.moviesdbApi
      .getResponseMovies(keyward, currentPage)
      .then((movies) => {
        if (movies.length === 0) {
          return this.setState({
            notFound: true,
            greeting: false,
          });
        }
        return this.setState({
          movies,
          totalResults: this.moviesdbApi.totalResults,
          greeting: false,
          notFound: false,
          loading: false,
          error: false,
        });
      })
      .catch(this.onError);
  }

  createMoviesList() {
    const { movies } = this.state;
    const { guestSessionId, genresAll } = this.props;
    if (movies) {
      return movies.map((item) => {
        if (item){          
          return (
            <MovieCard
              guestSessionId={guestSessionId}
              key={item.id}
              moviesData={item}
              genresAll={genresAll}
            />
          );}
        return <AlertCard key={uuidv4()} />;
      });
    }
    return false;
  }

  onError = (error) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  render() {
    const {
      movies,
      currentPage,
      totalResults,
      greeting,
      notFound,
      loading,
      error,
    } = this.state;
    const { loader } = this.props;
    if (loader && greeting) return <Spinner />;
    if (greeting) return <EmptyCard description="Type to find a movie" />;
    if (notFound) return <EmptyCard description="We havn't fount this movie" />;
    const listMovies = error ? <ErrorMessage /> : this.createMoviesList();
    return (
      <Row>
        <div className="movies-list">
          {loading && !error ? <Spinner /> : listMovies}
          {movies.length !== 0 && !error && !loading && (
            <Pagination
              style={{
                padding: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              defaultPageSize="20"
              size="small"
              current={currentPage}
              onChange={this.onChangePage}
              total={totalResults}
            />
          )}
        </div>
      </Row>
    );
  }
}
