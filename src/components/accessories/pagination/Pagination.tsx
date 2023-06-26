import React, { FunctionComponent } from "react";
import { IProps } from "./types";
import "./styles.scss";
import {
  Pagination as MaterialPagination,
  PaginationProps,
} from "@material-ui/lab";

const Pagination: FunctionComponent<IProps & PaginationProps> = ({
  ...paginationProps
}) => {
  return (
    <div className={"pagination"}>
      <MaterialPagination {...paginationProps} />
    </div>
  );
};

export default Pagination;
