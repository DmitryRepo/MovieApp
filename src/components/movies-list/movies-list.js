import React, { Component } from "react";
import MovieCard from "../movie-card/movie-card";
import MoviedbApi from "../../services/moviedb-api";
import AlertCard from '../alert-card/alert-card'
import { Pagination, Empty } from 'antd';

import { v4 as uuidv4 } from 'uuid';

import "./movie-list.css";

const lodash = require('lodash');
export default class MoviesList extends Component {
  moviesdbApi = new MoviedbApi();

  state = {
    currentPage: 1,
    totalResults: this.moviesdbApi.totalResults,
    greeting: true,
    notFound: false,
  };

  debounceRender = lodash.debounce(() => this.getMoviesApi(), 1000);

  componentDidUpdate(prevProps, prevState) {
    const { keyward } = this.props;
    const { currentPage } = this.state;
    if (keyward !== prevProps.keyward) {
      return this.debounceRender();
    }
    if (currentPage !== prevState.currentPage) {
      console.log(currentPage)
      this.getMoviesApi();
    }
    return false;
  }

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
    this.getMoviesApi();
    console.log('click')
  };

  getMoviesApi() {
    const { currentPage} = this.state;
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
        });
      });
    }
   
  createMoviesList() {
    const { movies } = this.state;
    if (movies) {
      return movies.map((item) => {
        if (item) return <MovieCard  key={item.id} moviesData={item} />;
        return <AlertCard key={uuidv4()} />;
      });
    }
    return false;
  }

  render() {
    const { movies, currentPage, totalResults,greeting, notFound } = this.state;
    if (greeting) return <Empty description="Type to find a movie" />;
    if (notFound) return <Empty description="We havn't fount this movie" />;
    console.log(this.state)
    return (
      <div className="movies-list">
        {this.createMoviesList()}
        {movies.length !== 0 && (
          <Pagination
            style={{ padding: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}
            defaultPageSize="20"
            size="middle"
            current={currentPage}
            onChange={this.onChangePage}
            total={totalResults}
          />
        )}      
      </div>
    );
  }
}

