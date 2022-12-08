import React, { FC } from "react";
import { IOwnProps } from "./types";
import "./styles.scss";
import SkeletonLoader from "../../skeletonLoader/SkeletonLoader";

/**
 * This component can be use in combination with charts in order to show summarize(total for example) values
 */
export const DataSummary: FC<IOwnProps> = ({ label, value }) => {
  return (
    <div className="summary">
      <span className="summary__value">{value}</span>
      <span className="summary__label">{label}</span>
    </div>
  );
};
