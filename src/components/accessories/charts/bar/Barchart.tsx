import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import "./styles.scss";
import { IOwnProps } from "./types";

export const Barchart: FC<IOwnProps> = ({ data, title, width, height }) => {
  const defaultHeight = "320px";
  const defaultWidth = "400px";

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
    <Bar
      className="bar"
      width={width ?? defaultWidth}
      height={height ?? defaultHeight}
      options={options}
      style={{
        maxHeight: height ?? defaultHeight,
        maxWidth: width ?? defaultWidth,
      }}
      data={data}
    ></Bar>
  );
};
