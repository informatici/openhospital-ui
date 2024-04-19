import React, { PropsWithChildren, ReactNode } from "react";
import classes from "./AdminActivityContent.module.scss";

type TProps = PropsWithChildren<{
  title: ReactNode;
}>;

export const AdminActivityContent = ({ title, children }: TProps) => {
  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <h2>{title}</h2>
      </div>
      <div className={classes.body}>{children}</div>
    </div>
  );
};
