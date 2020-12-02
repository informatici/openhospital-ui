import React from "react";
import { IPropsSummary, IProps } from "./types";
import "./styles.scss";
import classNames from "classnames";

import Arrow from "../../../assets/arrow-w.svg";

export const AccordionSummary: React.FC<IPropsSummary> = ({ 
  children,
  onClick
}) => {
  return (
    <div className="accordion_summary" onClick={onClick}>
      <span>{children}</span>
      <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
    </div>
  )
};

export const AccordionDetails: React.FC = ({ children }) => {
  return (
    <div className="accordion_details">{children}</div>
  )
};

export const Accordion: React.FC<IProps> = ({
  children,
  expanded
}) => {
  return (
    <div className={classNames("accordion", "collapse", { expanded })}>
      {children}
    </div>
  );
}
