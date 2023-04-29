import React, { Component } from "react";
import "./Switcher.css";
import { Tabs } from "antd";

export default class Switcher extends Component {
  state = {
    tabs: ["Search", "Rated"],
  };
  render() {
    const { tabs } = this.state;
    const { switchPage } = this.props
    return (
      <div className="switcher">
        <Tabs
          defaultActiveKey="1"
          centered
          onChange={(item) => switchPage(item)}
          items={tabs.map((item, i) => {
            const id = String(i+1);
            return {
              label: item,
              key: id,
            };
          })}
        />
      </div>
    );
  }
}
