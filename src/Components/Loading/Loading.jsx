import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <Spin size="large" tip="Loading..." spinning={true} style={{ color: "#FFA500" }} />
    </div>
  );
};

export default Loading;
