import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { IProps } from "./types";
import "./styles.scss";

const InfoBox: FunctionComponent<IProps> = ({ type, message }) => {
  return (
    <div className={classNames(`infoBox ${type}`)}>
      <h4>{message}</h4>
    </div>
  );
};

export default InfoBox;
