import React, { FC } from "react";
import { Pie } from "react-chartjs-2";
import { IOwnProps } from "./types";
import "./styles.scss";

export const Piechart: FC<IOwnProps> = ({ data, title, height, width }) => {
  const defaultWidth = "325px";
  const defaultHeight = "325px";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: title !== undefined,
        text: title,
      },
    },
  };
  return (
    <Pie
      className="pie"
      height={height ?? defaultHeight}
      width={width ?? defaultWidth}
      style={{
        maxHeight: height ?? defaultHeight,
        maxWidth: width ?? defaultWidth,
      }}
      options={options}
      data={data}
    ></Pie>
  );
};
