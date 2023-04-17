import React, { Component } from "react";
import { Spin } from "antd";
import "./spinner.css";
export default class Spinner extends Component {
  render() {
    return <Spin tip="Loading..."></Spin>;
  }
}
