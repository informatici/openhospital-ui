import React from "react";
import { TLabelBadgeProps } from "./types";

import "./styles.scss";

export const LabelBadge: React.FC<TLabelBadgeProps> = ({
  color = "default",
  label,
}) => {
  return (
    <div className={`labelBadge ${color}`}>
      <span>{label}</span>
    </div>
  );
};
