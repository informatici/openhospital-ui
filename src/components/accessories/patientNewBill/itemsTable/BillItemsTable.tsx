import React, { FC } from "react";
import Table from "../../table/Table";
import { header, order } from "./consts";
import { currencyFormat } from "../../../../libraries/formatUtils/currencyFormatting";
import { useTranslation } from "react-i18next";

interface IOwnProps {
  handleEdit: (row: any) => void;
  handleDelete: (row: any) => void;
  rowData: Record<string, any>[];
}

const BillItemsTable: FC<IOwnProps> = ({
  handleEdit,
  handleDelete,
  rowData,
}) => {
  const { t } = useTranslation();
  const label = {
    group: t("bill.type"),
    description: t("bill.description"),
    quantity: t("bill.quantity"),
    amount: t("bill.amount"),
  };

  return (
    <Table
      rowData={rowData}
      tableHeader={header}
      labelData={label}
      columnsOrder={order}
      rowsPerPage={5}
      onDelete={handleDelete}
      isCollapsabile={true}
      onEdit={handleEdit}
    />
  );
};
export default BillItemsTable;
