import moment from "moment";
import React from "react";
import { LazyEchartsC } from "./echarts/lazyEchartsC";
import { SeparateOutC } from "./separateOut/separateOutC";

export const AppC: React.FC = () => {
  console.log("test", moment());
  return (
    <>
      <SeparateOutC />
      <LazyEchartsC />
    </>
  );
};
