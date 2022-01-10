import React, { FC } from "react";
import Table from "../../table/Table";
import { header, mockData, order } from "./consts";
import { currencyFormat } from "../../../../libraries/formatUtils/currencyFormatting";
import { useTranslation } from "react-i18next";

interface IOwnProps {
  handleEdit: (row: any) => void;
  handleDelete: (row: any) => void;
}

const BillItemsTable: FC<IOwnProps> = ({ handleEdit, handleDelete }) => {
  const { t } = useTranslation();
  const label = {
    type: t("bill.type"),
    description: t("bill.description"),
    qty: t("bill.quantity"),
    cost: t("bill.amount"),
  };

  const formatDataToDisplay = (data: typeof mockData) => {
    return data.map((item) => {
      return {
        ...item,
        cost: currencyFormat(item.cost),
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
