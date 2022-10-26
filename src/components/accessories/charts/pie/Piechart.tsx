import React, { FC } from "react";
import { Pie } from "react-chartjs-2";
import { IOwnProps } from "./types";
import "./styles.scss";

export const Piechart: FC<IOwnProps> = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: title !== undefined,
        text: title,
      },
    },
  };
  return <Pie className="pie" options={options} data={data}></Pie>;
};
