import React, { ReactNode, useState } from "react";
import classes from "./MenuItem.module.scss";
import classnames from "classnames";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../accordion/Accordion";
import "./styles.scss";

interface IOwnProps {
  icon: ReactNode;
  trailingIcon?: ReactNode;
  label: string;
  selected?: boolean;
  expandedContent?: ReactNode;
  onClick: () => void;
}

export const MenuItem = ({
  icon,
  trailingIcon,
  label,
  selected,
  expandedContent,
  onClick,
}: IOwnProps) => {
  const [expanded, setExpanded] = useState(false);
  const menu = (
    <div
      className={classnames(classes.menuItem, selected ? classes.active : null)}
      onClick={onClick}
    >
      {icon}
      <span className={classes.label}>{label}</span>
      {trailingIcon}
    </div>
  );

  if (expandedContent) {
    return (
      <Accordion data-cy={"expandable-item"} expanded={expanded}>
        <AccordionSummary onClick={() => setExpanded(!expanded)}>
          {menu}
        </AccordionSummary>
        <AccordionDetails>{expandedContent}</AccordionDetails>
      </Accordion>
    );
  }

  return menu;
};
