import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { InfoBoxType, IProps } from "./types";
import "./styles.scss";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";

const InfoBox: FunctionComponent<IProps> = ({ type, message }) => {
  const renderIcon = () => {
    switch (type) {
      case InfoBoxType.Warning:
        return <WarningIcon className="infoBox_icon" />;
      case InfoBoxType.Error:
        return <ErrorIcon className="infoBox_icon" />;
      default:
        return <InfoIcon className="infoBox_icon" />;
    }
  };
  return (
    <div data-cy="info-box" className={classNames(`infoBox ${type}`)}>
      <h5>
        {renderIcon()}
        {message}
      </h5>
    </div>
  );
};

export default InfoBox;
