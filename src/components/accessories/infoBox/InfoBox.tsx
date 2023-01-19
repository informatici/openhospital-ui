import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { IProps } from "./types";
import "./styles.scss";
import InfoIcon from "@material-ui/icons/Info";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";

const InfoBox: FunctionComponent<IProps> = ({ type, message }) => {
  return (
    <div className={classNames(`infoBox ${type}`)}>
      <h5>
        {type === "info" ? (
          <InfoIcon fontSize="small" />
        ) : type === "warning" ? (
          <WarningIcon fontSize="small" />
        ) : (
          <ErrorIcon fontSize="small" />
        )}
        &nbsp; {message}
      </h5>
    </div>
  );
};

export default InfoBox;
