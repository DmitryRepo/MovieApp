import React, { Component } from "react";
import "./switcher.css";
import { Tabs } from "antd";

export default class Switcher extends Component {
  state = {
    tabs: ["Search", "Rated"],
  };
  render() {
    const { tabs } = this.state;
    return (
      <div className="switcher">
        <Tabs
          defaultActiveKey="1"
          centered
          items={tabs.map((item, i) => {
            const id = String(i + 1);
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
