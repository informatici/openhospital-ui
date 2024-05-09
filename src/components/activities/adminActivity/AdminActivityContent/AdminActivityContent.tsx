import React, { ReactNode } from "react";
import classes from "./AdminActivityContent.module.scss";

interface IOwnProps {
  title: ReactNode;
  children: ReactNode;
}

export const AdminActivityContent = ({ title, children }: IOwnProps) => {
  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
};
