import { Pagination as MaterialPagination, PaginationProps } from "@mui/lab";
import React, { FunctionComponent } from "react";
import "./styles.scss";
import { IProps } from "./types";

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
