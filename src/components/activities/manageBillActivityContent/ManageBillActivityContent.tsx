import React, { Fragment, FC } from "react";
import { IProps } from "./types";
import "./styles.scss";

const ManageBillActivityContent: FC<IProps> = ({ title, content }) => {
  const Content = content;
  return (
    <Fragment>
      <div className="manageBills__content_header">
        <h3>{title}</h3>
      </div>
      <div className="manageBills__content_body">{Content}</div>
    </Fragment>
  );
};

export default ManageBillActivityContent;
