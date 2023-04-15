import React, { Component } from "react";
import "./switcher.css";
import { Tabs } from "antd";

export default class Switcher extends Component {
  render() {
    const { TabName } = Tabs;
    return (
      <div className="switcher">
        <Tabs
          defaultActiveKey="history"
          onChange={() =>{}}>
          <TabName tab="search" key="search" />
          <TabName tab="rated" key="rated" />
        </Tabs>
      </div>
    );
  }
}
