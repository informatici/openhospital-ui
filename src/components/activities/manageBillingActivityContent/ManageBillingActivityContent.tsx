import React, { FC, Fragment } from "react";
import { IProps } from "./types";
import "./styles.scss";

const ManageBillingActivityContent: FC<IProps> = ({ content }) => {
  const Content = content;
  return (
    <Fragment>
      <div className="manageBills__content_body">{Content}</div>
    </Fragment>
  );
};

export default ManageBillingActivityContent;
