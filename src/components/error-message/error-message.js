import React from "react";
import { Alert } from "antd";

import "./error-massage.css";

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <Alert message="Alert" type="error" description="Connecting to Network" />
    </div>
  );
};

export default ErrorMessage;
