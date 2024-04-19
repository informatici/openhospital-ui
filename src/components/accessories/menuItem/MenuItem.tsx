import React, { ReactNode } from "react";
import classes from "./MenuItem.module.scss";
import classnames from "classnames";
import { ArrowForwardIosRounded } from "@material-ui/icons";

interface IOwnProps {
  icon: ReactNode;
  trailingIcon?: ReactNode;
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export const MenuItem = ({
  icon,
  trailingIcon,
  label,
  selected,
  onClick,
}: IOwnProps) => {
  return (
    <div
      className={classnames(classes.menuItem, selected ? classes.active : null)}
      onClick={onClick}
    >
      {icon}
      <span className={classes.label}>{label}</span>
      {trailingIcon || <ArrowForwardIosRounded />}
    </div>
  );
};
