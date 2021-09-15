import React, { Fragment, FC } from "react";
import { IProps } from "./types";
import "./styles.scss";

const SearchBillActivityContent: FC<IProps> = ({ title, content }) => {
  const Content = content;
  return (
    <Fragment>
      <div className="searchBills__content_header">
        <h3>{title}</h3>
      </div>
      <div className="searchBills__content_body">
        <Content />
      </div>
    </Fragment>
  );
};

export default SearchBillActivityContent;
