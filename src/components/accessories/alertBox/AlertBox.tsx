import React, { FunctionComponent } from "react";
import { IProps } from "./types";
import { useStyles } from "./consts";
import {
  CheckCircleRounded,
  HighlightOffRounded,
  InfoRounded,
  NewReleasesRounded,
} from "@mui/icons-material";

export const AlertBox: FunctionComponent<IProps> = ({
  type,
  message,
  title,
}) => {
  const classes = useStyles({ type: type });

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        {type === "warning" && <NewReleasesRounded />}
        {type === "info" && <InfoRounded />}
        {type === "error" && <HighlightOffRounded />}
        {type === "success" && <CheckCircleRounded />}
      </div>
      <div className={classes.main}>
        {title && <div className={classes.title}>{title}</div>}
        <div className={classes.content}>{message}</div>
      </div>
    </div>
  );
};
