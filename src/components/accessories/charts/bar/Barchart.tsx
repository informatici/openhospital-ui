import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import { IOwnProps } from "./types";
import "./styles.scss";

export const Barchart: FC<IOwnProps> = ({ data, title }) => {
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
  return <Bar className="bar" options={options} data={data}></Bar>;
};
