import React, { Component } from "react";
import { Input } from "antd";
import Switcher from "../switcher/switcher";
import MoviesList from "../movies-list/movies-list";

import "./app.css";
export default class App extends Component {
  state = {
    keyward: " ",
  };

  onTextChange = (event) => {
    this.setState({
      keyward: event.target.value,
    });
  };

  render() {
    const { keyward } = this.state;
    return (
      <div className="app">
        <Switcher />
        <Input
          className="input-search"
          placeholder="input placeholder"
          value={keyward}
          onChange={this.onTextChange}/>
        <MoviesList keyward={keyward} />
      </div>
    );
  }
}
