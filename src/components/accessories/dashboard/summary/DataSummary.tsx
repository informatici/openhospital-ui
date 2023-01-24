import React, { FC } from "react";
import { IOwnProps } from "./types";
import "./styles.scss";

/**
 * This component can be use in combination with charts in order to show summarize(total for example) values
 */
export const DataSummary: FC<IOwnProps> = ({ label, value }) => {
  return (
    <div className="summary">
      <div className="summary__value">{value}</div>
      <span className="summary__label">{label}</span>
    </div>
  );
};
