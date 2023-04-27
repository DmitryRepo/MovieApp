import React, { Component } from "react";
import { Input } from "antd";
import Switcher from "../switcher/switcher";
import MoviesList from "../movies-list/movies-list";
import RatedList from "../rated-list/rated-list";
import MoviedbApi from "../../services/moviedb-api";
import GenresContext from '../context/genres-context';

import "./app.css";
export default class App extends Component {

  static contextType = GenresContext;

  moviesService = new MoviedbApi ();

  state = {
    keyward: " ",
    loader: false,
    pageView: "1",
    guestSessionId: " ",
  };

  switchPage = (page) => {
    this.setState({ pageView: page, keyward: '' });
  };

  componentDidMount() {
    const getStorage = localStorage.getItem("guestSessionId");
    if (!getStorage) {
      this.moviesService.openGuestSession().then((res) => {
        localStorage.setItem(
          "guestSessionId",
          JSON.stringify(res.guest_session_id)
        );
        return this.renderPage();
      });
    }
    this.getGenres(this.context)
    return this.renderPage();
  }

  getGenres(context){
    context.then((res) => this.setState({ genresAll: res }));
  };

  onTextChange = (event) => {
    this.setState({
      keyward: event.target.value,
      loader: true,
    });
  };

  renderPage() {
    return this.setState({
      guestSessionId: JSON.parse(localStorage.getItem("guestSessionId")),
    });
  }
  searchPage() {
    const { keyward, loader, guestSessionId, genresAll } = this.state;
    return (
      <>
        <Input
          className="input-search"
          placeholder="input placeholder"
          value={keyward}
          onChange={this.onTextChange}
        />
        <MoviesList keyward={keyward} loader={loader} guestSessionId = {guestSessionId} genresAll = {genresAll} />
      </>
    );
  }
  render() {
    const { pageView, guestSessionId, genresAll } = this.state;
    const switcherPage = pageView === "2" ? <RatedList guestSessionId ={guestSessionId} genresAll = {genresAll}/> : this.searchPage();
    return (
      <div className="app">
        <Switcher switchPage={this.switchPage} />
        {switcherPage}
      </div>
    );
  }
}
