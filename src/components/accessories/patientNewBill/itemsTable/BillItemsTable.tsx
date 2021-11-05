import React, { FC, useEffect, useRef, useState } from "react";
import "./styles.scss";
import Table from "../../table/Table";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { header, label, mockData, order } from "./consts";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: (row: any) => void;
  handleDelete: (row: any) => void;
}

export type BillItemTransitionState = "IDLE" | "TO_RESET";

const BillItemsTable: FC<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
  handleDelete,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const formatDataToDisplay = (data: typeof mockData) => {
    return data.map((item) => {
      return {
        ...item,
        cost: item.cost.toString().concat("$"),
      };
    });
    //   .sort(dateComparator("desc", "date"));
  };

  return (
    <Table
      rowData={formatDataToDisplay(mockData)}
      tableHeader={header}
      labelData={label}
      columnsOrder={order}
      rowsPerPage={5}
      onDelete={handleDelete}
      isCollapsabile={false}
      onEdit={handleEdit}
    />
  );
};
export default BillItemsTable;
