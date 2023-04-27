import React, { Component } from "react";
import { Row, Pagination } from "antd";
import MoviedbApi from "../../services/moviedb-api";
import MovieCard from "../movie-card/movie-card";
import EmptyCard from "../empty-card/empty-card";
import Spinner from "../spinner/spinner";
import "./rated-list.css";

export default class RatedList extends Component {
  moviesService = new MoviedbApi();

  state = {
    moviesData: null,
    currentPage: 1,
    totalResults: this.moviesService.totalResults,
  };

  componentDidMount() {
    const { currentPage } = this.state;
    this.getRatedMovies(currentPage);
  }

  componentDidUpdate(prevState) {
    const { currentPage } = this.state;
    if (currentPage !== prevState.currentPage) {
      this.getRatedMovies();
    }
    return false;
  }

  onChangePage = (page) =>
    this.setState({ currentPage: page, moviesData: null });

  getRatedMovies = () => {
    const { guestSessionId } = this.props;
    const { moviesData, currentPage } = this.state;
    if (!moviesData) {
      return this.moviesService
        .getRatedMovies(guestSessionId, currentPage)
        .then((movies) =>
          this.setState({
            moviesData: movies,
            totalResults: this.moviesService.totalResults,
          })
        );
    }
    return false;
  };

  renderPage = () => {
    const { moviesData } = this.state;
    const { guestSessionId, genresAll } = this.props;
    if (moviesData.length !== 0) {
      return moviesData.map((movie) => (
        <MovieCard
          guestSessionId={guestSessionId}
          key={movie.id}
          moviesData={movie}
          genresAll={genresAll}
        />
      ));
    } else {
      return (
        <div style={{ marginTop: "0%" }}>
          <EmptyCard description="No rated movie yet" />
        </div>
      );
    }
  };

  render() {
    const { moviesData, currentPage, totalResults } = this.state;
  
    if (!moviesData) return <Spinner />;
    const pagination = moviesData.length>0 ?
        <Pagination
          defaultPageSize="20"
          size="small"
          current={currentPage}
          onChange={this.onChangePage}
          total={totalResults}
          onShowSizeChange={this.onShowSizeChange}
        /> : null
      
    return (
      <Row>
        <div className="rated-list">
          {this.renderPage()}
        </div>
        {pagination}
      </Row>
    );
  }
}
