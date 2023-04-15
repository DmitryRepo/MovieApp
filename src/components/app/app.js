import React, { Component } from "react";
import { Input, Pagination } from "antd";
import Switcher from "../switcher/switcher";
import MoviesList from "../movies-list/movie-list";
import "./app.css";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Switcher/>
        <Input className="input-search" />
        <MoviesList/>
        <Pagination className="pagination" />
      </div>
    );
  }
}
