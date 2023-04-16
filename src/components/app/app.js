import React, { Component } from "react";
import { Input, Pagination } from "antd";
import Switcher from "../switcher/switcher";
import MoviesList from "../movies-list/movies-list";
import MoviedbApi from "../../services/moviedb-api";
import "./app.css";

export default class App extends Component {
  constructor(){
    super()
    this.getDataApi()
  }
  state = {
    movies: []
  }
  getDataApi(){
    const keyward = 'return' 
    const api = new MoviedbApi()
    api.getResponseApi(keyward).then(
      data => this.setState({
        movies:data
      })
    ) 
  }
  render() {
    const {movies} = this.state
    return (
      <div className="app">
          <Switcher/>
          <Input className="input-search" />
          <MoviesList movies ={ movies }/>
          <Pagination className="pagination" />  
      </div>
    );
  }
}


